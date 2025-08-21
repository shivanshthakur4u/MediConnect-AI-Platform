'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  PhoneOff,
  Monitor,
  MessageCircle,
  Settings,
  Users,
  Clock,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoCall } from '@/lib/video-service';
import { useAuth } from '@/app/providers';

export default function VideoConsultationPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const appointmentId = params.appointmentId as string;
  
  const {
    state,
    initializeCall,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
    endCall,
  } = useVideoCall();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: string;
    message: string;
    timestamp: Date;
  }>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  useEffect(() => {
    // Initialize video call when component mounts
    const roomId = `appointment-${appointmentId}`;
    initializeCall(roomId, appointmentId);

    return () => {
      endCall();
    };
  }, [appointmentId]);

  useEffect(() => {
    // Set local video stream
    if (localVideoRef.current && state.localStream) {
      localVideoRef.current.srcObject = state.localStream;
    }
  }, [state.localStream]);

  useEffect(() => {
    // Set remote video stream
    if (remoteVideoRef.current && state.remoteStream) {
      remoteVideoRef.current.srcObject = state.remoteStream;
      setConnectionStatus('connected');
    }
  }, [state.remoteStream]);

  useEffect(() => {
    // Call duration timer
    let interval: NodeJS.Timeout;
    if (state.isCallActive && connectionStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isCallActive, connectionStatus]);

  const handleEndCall = () => {
    endCall();
    setConnectionStatus('disconnected');
    router.push('/dashboard');
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: user?.user_metadata?.full_name || 'You',
        message: newMessage,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' :
                connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="font-medium">
                {connectionStatus === 'connected' ? 'Connected' :
                 connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
              </span>
            </div>
            {connectionStatus === 'connected' && (
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(callDuration)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setShowChat(!showChat)}>
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Main Video Area */}
        <div className="flex-1 relative">
          {/* Remote Video (Main) */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            {state.remoteStream ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <Users className="h-24 w-24 text-gray-600 mx-auto mb-4" />
                <p className="text-xl text-gray-400">Waiting for the other participant...</p>
              </div>
            )}
          </div>

          {/* Local Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-64 h-48 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
            {state.localStream ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Video className="h-12 w-12 text-gray-500" />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-gray-800 bg-opacity-90 rounded-full p-4">
              <Button
                variant={state.isMuted ? "destructive" : "secondary"}
                size="icon"
                className="rounded-full"
                onClick={toggleMute}
              >
                {state.isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>

              <Button
                variant={state.isVideoOff ? "destructive" : "secondary"}
                size="icon"
                className="rounded-full"
                onClick={toggleVideo}
              >
                {state.isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </Button>

              <Button
                variant={state.isScreenSharing ? "default" : "secondary"}
                size="icon"
                className="rounded-full"
                onClick={toggleScreenShare}
              >
                <Monitor className="h-5 w-5" />
              </Button>

              <Button
                variant="destructive"
                size="icon"
                className="rounded-full"
                onClick={handleEndCall}
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Connection Status Overlay */}
          <AnimatePresence>
            {connectionStatus === 'connecting' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-xl">Connecting to video call...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chat Sidebar */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col"
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold">Chat</h3>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{msg.sender}</span>
                      <span className="text-xs text-gray-400">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
                  />
                  <Button size="sm" onClick={handleSendMessage}>
                    Send
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
