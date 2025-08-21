'use client';

import { io, Socket } from 'socket.io-client';

export interface VideoCallState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isCallActive: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  participants: string[];
}

export class VideoCallService {
  private socket: Socket | null = null;
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private roomId: string | null = null;
  
  private configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  constructor(private onStateChange: (state: Partial<VideoCallState>) => void) {
    this.initializeSocket();
  }

  private initializeSocket() {
    // In production, this would connect to your WebRTC signaling server
    this.socket = io(process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL || 'ws://localhost:3001');
    
    this.socket.on('user-joined', this.handleUserJoined.bind(this));
    this.socket.on('user-left', this.handleUserLeft.bind(this));
    this.socket.on('offer', this.handleOffer.bind(this));
    this.socket.on('answer', this.handleAnswer.bind(this));
    this.socket.on('ice-candidate', this.handleIceCandidate.bind(this));
  }

  async initializeCall(roomId: string, appointmentId: string): Promise<void> {
    this.roomId = roomId;
    
    try {
      // Get user media
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      this.onStateChange({ 
        localStream: this.localStream,
        isCallActive: true 
      });

      // Create peer connection
      this.peerConnection = new RTCPeerConnection(this.configuration);
      
      // Add local stream tracks
      this.localStream.getTracks().forEach(track => {
        this.peerConnection?.addTrack(track, this.localStream!);
      });

      // Handle remote stream
      this.peerConnection.ontrack = (event) => {
        this.remoteStream = event.streams[0];
        this.onStateChange({ remoteStream: this.remoteStream });
      };

      // Handle ICE candidates
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.socket?.emit('ice-candidate', {
            candidate: event.candidate,
            roomId: this.roomId,
          });
        }
      };

      // Join room
      this.socket?.emit('join-room', { roomId, appointmentId });

    } catch (error) {
      console.error('Error initializing call:', error);
      throw new Error('Failed to initialize video call');
    }
  }

  private async handleUserJoined() {
    if (!this.peerConnection || !this.localStream) return;

    try {
      // Create offer
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      
      this.socket?.emit('offer', {
        offer,
        roomId: this.roomId,
      });
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  }

  private async handleOffer(data: { offer: RTCSessionDescriptionInit }) {
    if (!this.peerConnection) return;

    try {
      await this.peerConnection.setRemoteDescription(data.offer);
      
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      
      this.socket?.emit('answer', {
        answer,
        roomId: this.roomId,
      });
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  }

  private async handleAnswer(data: { answer: RTCSessionDescriptionInit }) {
    if (!this.peerConnection) return;

    try {
      await this.peerConnection.setRemoteDescription(data.answer);
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  }

  private async handleIceCandidate(data: { candidate: RTCIceCandidate }) {
    if (!this.peerConnection) return;

    try {
      await this.peerConnection.addIceCandidate(data.candidate);
    } catch (error) {
      console.error('Error handling ICE candidate:', error);
    }
  }

  private handleUserLeft() {
    this.endCall();
  }

  toggleMute(): void {
    if (!this.localStream) return;

    const audioTrack = this.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      this.onStateChange({ isMuted: !audioTrack.enabled });
    }
  }

  toggleVideo(): void {
    if (!this.localStream) return;

    const videoTrack = this.localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      this.onStateChange({ isVideoOff: !videoTrack.enabled });
    }
  }

  async toggleScreenShare(): Promise<void> {
    if (!this.peerConnection) return;

    try {
      if (!this.onStateChange) return;

      const currentState = { isScreenSharing: false };
      
      if (currentState.isScreenSharing) {
        // Stop screen sharing, switch back to camera
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoTrack = videoStream.getVideoTracks()[0];
        
        const sender = this.peerConnection.getSenders().find(s => 
          s.track && s.track.kind === 'video'
        );
        
        if (sender) {
          await sender.replaceTrack(videoTrack);
        }
        
        this.onStateChange({ isScreenSharing: false });
      } else {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        
        const sender = this.peerConnection.getSenders().find(s => 
          s.track && s.track.kind === 'video'
        );
        
        if (sender) {
          await sender.replaceTrack(screenTrack);
        }
        
        // Handle screen share end
        screenTrack.onended = () => {
          this.toggleScreenShare();
        };
        
        this.onStateChange({ isScreenSharing: true });
      }
    } catch (error) {
      console.error('Error toggling screen share:', error);
    }
  }

  endCall(): void {
    // Stop local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    // Close peer connection
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    // Leave room
    if (this.roomId) {
      this.socket?.emit('leave-room', { roomId: this.roomId });
      this.roomId = null;
    }

    this.onStateChange({
      localStream: null,
      remoteStream: null,
      isCallActive: false,
      isMuted: false,
      isVideoOff: false,
      isScreenSharing: false,
    });
  }

  disconnect(): void {
    this.endCall();
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

// Hook for using video call service
export function useVideoCall() {
  const [state, setState] = useState<VideoCallState>({
    localStream: null,
    remoteStream: null,
    isCallActive: false,
    isMuted: false,
    isVideoOff: false,
    isScreenSharing: false,
    participants: [],
  });

  const [videoService, setVideoService] = useState<VideoCallService | null>(null);

  useEffect(() => {
    const service = new VideoCallService((newState) => {
      setState(prevState => ({ ...prevState, ...newState }));
    });
    setVideoService(service);

    return () => {
      service.disconnect();
    };
  }, []);

  const initializeCall = async (roomId: string, appointmentId: string) => {
    if (videoService) {
      await videoService.initializeCall(roomId, appointmentId);
    }
  };

  const toggleMute = () => videoService?.toggleMute();
  const toggleVideo = () => videoService?.toggleVideo();
  const toggleScreenShare = () => videoService?.toggleScreenShare();
  const endCall = () => videoService?.endCall();

  return {
    state,
    initializeCall,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
    endCall,
  };
}

// React imports for the hook
import { useState, useEffect } from 'react';
