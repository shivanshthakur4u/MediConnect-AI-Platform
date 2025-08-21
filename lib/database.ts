import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          date_of_birth: string | null;
          role: 'patient' | 'doctor' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          role?: 'patient' | 'doctor' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          role?: 'patient' | 'doctor' | 'admin';
          updated_at?: string;
        };
      };
      doctors: {
        Row: {
          id: string;
          user_id: string;
          medical_license: string;
          specialty: string;
          sub_specialty: string | null;
          years_of_experience: number;
          current_hospital: string;
          medical_school: string;
          graduation_year: number;
          certifications: string[];
          languages: string[];
          consultation_fee: number;
          biography: string;
          rating: number | null;
          total_reviews: number;
          verification_status: 'pending' | 'verified' | 'rejected';
          availability_hours: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          medical_license: string;
          specialty: string;
          sub_specialty?: string | null;
          years_of_experience: number;
          current_hospital: string;
          medical_school: string;
          graduation_year: number;
          certifications: string[];
          languages: string[];
          consultation_fee: number;
          biography: string;
          rating?: number | null;
          total_reviews?: number;
          verification_status?: 'pending' | 'verified' | 'rejected';
          availability_hours?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          medical_license?: string;
          specialty?: string;
          sub_specialty?: string | null;
          years_of_experience?: number;
          current_hospital?: string;
          medical_school?: string;
          graduation_year?: number;
          certifications?: string[];
          languages?: string[];
          consultation_fee?: number;
          biography?: string;
          rating?: number | null;
          total_reviews?: number;
          verification_status?: 'pending' | 'verified' | 'rejected';
          availability_hours?: string | null;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          patient_id: string;
          doctor_id: string;
          appointment_date: string;
          appointment_time: string;
          duration: number;
          type: 'video' | 'phone' | 'chat';
          status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
          consultation_fee: number;
          payment_status: 'pending' | 'paid' | 'refunded';
          payment_intent_id: string | null;
          symptoms: string[];
          ai_preliminary_diagnosis: string | null;
          doctor_notes: string | null;
          prescription: any | null;
          follow_up_required: boolean;
          follow_up_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          doctor_id: string;
          appointment_date: string;
          appointment_time: string;
          duration?: number;
          type: 'video' | 'phone' | 'chat';
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
          consultation_fee: number;
          payment_status?: 'pending' | 'paid' | 'refunded';
          payment_intent_id?: string | null;
          symptoms?: string[];
          ai_preliminary_diagnosis?: string | null;
          doctor_notes?: string | null;
          prescription?: any | null;
          follow_up_required?: boolean;
          follow_up_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          doctor_id?: string;
          appointment_date?: string;
          appointment_time?: string;
          duration?: number;
          type?: 'video' | 'phone' | 'chat';
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
          consultation_fee?: number;
          payment_status?: 'pending' | 'paid' | 'refunded';
          payment_intent_id?: string | null;
          symptoms?: string[];
          ai_preliminary_diagnosis?: string | null;
          doctor_notes?: string | null;
          prescription?: any | null;
          follow_up_required?: boolean;
          follow_up_date?: string | null;
          updated_at?: string;
        };
      };
      medical_records: {
        Row: {
          id: string;
          patient_id: string;
          doctor_id: string | null;
          appointment_id: string | null;
          record_type: 'consultation' | 'prescription' | 'lab_result' | 'imaging' | 'vaccination' | 'other';
          title: string;
          description: string;
          file_urls: string[];
          diagnosis: string | null;
          medications: any[] | null;
          lab_results: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          doctor_id?: string | null;
          appointment_id?: string | null;
          record_type: 'consultation' | 'prescription' | 'lab_result' | 'imaging' | 'vaccination' | 'other';
          title: string;
          description: string;
          file_urls?: string[];
          diagnosis?: string | null;
          medications?: any[] | null;
          lab_results?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          doctor_id?: string | null;
          appointment_id?: string | null;
          record_type?: 'consultation' | 'prescription' | 'lab_result' | 'imaging' | 'vaccination' | 'other';
          title?: string;
          description?: string;
          file_urls?: string[];
          diagnosis?: string | null;
          medications?: any[] | null;
          lab_results?: any | null;
          updated_at?: string;
        };
      };
      ai_consultations: {
        Row: {
          id: string;
          patient_id: string;
          symptoms: string[];
          conversation_history: any[];
          preliminary_diagnosis: string | null;
          confidence_score: number | null;
          recommendations: string[];
          urgency_level: 'low' | 'medium' | 'high' | 'emergency';
          referred_to_doctor: boolean;
          doctor_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          symptoms: string[];
          conversation_history?: any[];
          preliminary_diagnosis?: string | null;
          confidence_score?: number | null;
          recommendations?: string[];
          urgency_level?: 'low' | 'medium' | 'high' | 'emergency';
          referred_to_doctor?: boolean;
          doctor_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          symptoms?: string[];
          conversation_history?: any[];
          preliminary_diagnosis?: string | null;
          confidence_score?: number | null;
          recommendations?: string[];
          urgency_level?: 'low' | 'medium' | 'high' | 'emergency';
          referred_to_doctor?: boolean;
          doctor_id?: string | null;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: 'appointment' | 'payment' | 'result' | 'reminder' | 'system';
          read: boolean;
          action_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: 'appointment' | 'payment' | 'result' | 'reminder' | 'system';
          read?: boolean;
          action_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: 'appointment' | 'payment' | 'result' | 'reminder' | 'system';
          read?: boolean;
          action_url?: string | null;
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

export const supabase = createClientComponentClient<Database>();

// Helper functions
export const createProfile = async (profileData: Database['public']['Tables']['profiles']['Insert']) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData)
    .select()
    .single();
  
  return { data, error };
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  return { data, error };
};

export const updateProfile = async (userId: string, updates: Database['public']['Tables']['profiles']['Update']) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .select()
    .single();
  
  return { data, error };
};

export const getDoctors = async (filters?: { specialty?: string; rating?: number; limit?: number }) => {
  let query = supabase
    .from('doctors')
    .select(`
      *,
      profiles:user_id (
        full_name,
        avatar_url
      )
    `)
    .eq('verification_status', 'verified');

  if (filters?.specialty) {
    query = query.eq('specialty', filters.specialty);
  }

  if (filters?.rating) {
    query = query.gte('rating', filters.rating);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getAppointments = async (userId: string, role: 'patient' | 'doctor') => {
  const column = role === 'patient' ? 'patient_id' : 'doctor_id';
  
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      patient:patient_id (
        profiles:user_id (
          full_name,
          avatar_url
        )
      ),
      doctor:doctor_id (
        profiles:user_id (
          full_name,
          avatar_url
        ),
        specialty
      )
    `)
    .eq(column, userId)
    .order('appointment_date', { ascending: true });

  return { data, error };
};

export const createAppointment = async (appointmentData: Database['public']['Tables']['appointments']['Insert']) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointmentData)
    .select()
    .single();
  
  return { data, error };
};

export const getMedicalRecords = async (patientId: string) => {
  const { data, error } = await supabase
    .from('medical_records')
    .select(`
      *,
      doctor:doctor_id (
        profiles:user_id (
          full_name
        ),
        specialty
      )
    `)
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const createMedicalRecord = async (recordData: Database['public']['Tables']['medical_records']['Insert']) => {
  const { data, error } = await supabase
    .from('medical_records')
    .insert(recordData)
    .select()
    .single();
  
  return { data, error };
};

export const createAIConsultation = async (consultationData: Database['public']['Tables']['ai_consultations']['Insert']) => {
  const { data, error } = await supabase
    .from('ai_consultations')
    .insert(consultationData)
    .select()
    .single();
  
  return { data, error };
};

export const getNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const markNotificationAsRead = async (notificationId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);

  return { data, error };
};