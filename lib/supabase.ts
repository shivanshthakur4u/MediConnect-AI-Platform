import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createClient = () => createClientComponentClient();

export const createServerClient = () => createServerComponentClient({ cookies });

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string;
          role: 'patient' | 'doctor' | 'admin';
          phone?: string;
          date_of_birth?: string;
          gender?: 'male' | 'female' | 'other';
          address?: string;
          emergency_contact?: string;
          insurance_info?: string;
          medical_license?: string;
          specialties?: string[];
          experience_years?: number;
          consultation_fee?: number;
          bio?: string;
          languages?: string[];
          verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string;
          role?: 'patient' | 'doctor' | 'admin';
          phone?: string;
          date_of_birth?: string;
          gender?: 'male' | 'female' | 'other';
          address?: string;
          emergency_contact?: string;
          insurance_info?: string;
          medical_license?: string;
          specialties?: string[];
          experience_years?: number;
          consultation_fee?: number;
          bio?: string;
          languages?: string[];
          verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string;
          role?: 'patient' | 'doctor' | 'admin';
          phone?: string;
          date_of_birth?: string;
          gender?: 'male' | 'female' | 'other';
          address?: string;
          emergency_contact?: string;
          insurance_info?: string;
          medical_license?: string;
          specialties?: string[];
          experience_years?: number;
          consultation_fee?: number;
          bio?: string;
          languages?: string[];
          verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      consultations: {
        Row: {
          id: string;
          patient_id: string;
          doctor_id: string;
          appointment_date: string;
          appointment_time: string;
          status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
          type: 'video' | 'chat' | 'phone';
          symptoms: string[];
          ai_analysis?: any;
          doctor_notes?: string;
          prescription?: any[];
          follow_up_date?: string;
          consultation_fee: number;
          payment_status: 'pending' | 'paid' | 'refunded';
          room_id?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          doctor_id: string;
          appointment_date: string;
          appointment_time: string;
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
          type: 'video' | 'chat' | 'phone';
          symptoms: string[];
          ai_analysis?: any;
          doctor_notes?: string;
          prescription?: any[];
          follow_up_date?: string;
          consultation_fee: number;
          payment_status?: 'pending' | 'paid' | 'refunded';
          room_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          doctor_id?: string;
          appointment_date?: string;
          appointment_time?: string;
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
          type?: 'video' | 'chat' | 'phone';
          symptoms?: string[];
          ai_analysis?: any;
          doctor_notes?: string;
          prescription?: any[];
          follow_up_date?: string;
          consultation_fee?: number;
          payment_status?: 'pending' | 'paid' | 'refunded';
          room_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      medical_records: {
        Row: {
          id: string;
          patient_id: string;
          consultation_id?: string;
          record_type: 'consultation' | 'prescription' | 'lab_result' | 'imaging' | 'other';
          title: string;
          description?: string;
          file_url?: string;
          metadata?: any;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          consultation_id?: string;
          record_type: 'consultation' | 'prescription' | 'lab_result' | 'imaging' | 'other';
          title: string;
          description?: string;
          file_url?: string;
          metadata?: any;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          consultation_id?: string;
          record_type?: 'consultation' | 'prescription' | 'lab_result' | 'imaging' | 'other';
          title?: string;
          description?: string;
          file_url?: string;
          metadata?: any;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      doctor_availability: {
        Row: {
          id: string;
          doctor_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          is_available: boolean;
          break_start?: string;
          break_end?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          doctor_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          is_available?: boolean;
          break_start?: string;
          break_end?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          doctor_id?: string;
          day_of_week?: number;
          start_time?: string;
          end_time?: string;
          is_available?: boolean;
          break_start?: string;
          break_end?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          consultation_id: string;
          sender_id: string;
          message: string;
          message_type: 'text' | 'file' | 'prescription' | 'system';
          file_url?: string;
          metadata?: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          consultation_id: string;
          sender_id: string;
          message: string;
          message_type?: 'text' | 'file' | 'prescription' | 'system';
          file_url?: string;
          metadata?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          consultation_id?: string;
          sender_id?: string;
          message?: string;
          message_type?: 'text' | 'file' | 'prescription' | 'system';
          file_url?: string;
          metadata?: any;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: 'appointment' | 'prescription' | 'system' | 'reminder';
          read: boolean;
          metadata?: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: 'appointment' | 'prescription' | 'system' | 'reminder';
          read?: boolean;
          metadata?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: 'appointment' | 'prescription' | 'system' | 'reminder';
          read?: boolean;
          metadata?: any;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}