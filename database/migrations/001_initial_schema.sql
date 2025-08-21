-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table
CREATE TABLE profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  date_of_birth DATE,
  role TEXT DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Doctors table
CREATE TABLE doctors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  medical_license TEXT NOT NULL,
  specialty TEXT NOT NULL,
  sub_specialty TEXT,
  years_of_experience INTEGER NOT NULL,
  current_hospital TEXT NOT NULL,
  medical_school TEXT NOT NULL,
  graduation_year INTEGER NOT NULL,
  certifications TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  consultation_fee DECIMAL(10,2) NOT NULL,
  biography TEXT NOT NULL,
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  total_reviews INTEGER DEFAULT 0,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  availability_hours TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Appointments table
CREATE TABLE appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(user_id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration INTEGER DEFAULT 30, -- in minutes
  type TEXT NOT NULL CHECK (type IN ('video', 'phone', 'chat')),
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'no_show')),
  consultation_fee DECIMAL(10,2) NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_intent_id TEXT,
  symptoms TEXT[] DEFAULT '{}',
  ai_preliminary_diagnosis TEXT,
  doctor_notes TEXT,
  prescription JSONB,
  follow_up_required BOOLEAN DEFAULT FALSE,
  follow_up_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Medical records table
CREATE TABLE medical_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(user_id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  record_type TEXT NOT NULL CHECK (record_type IN ('consultation', 'prescription', 'lab_result', 'imaging', 'vaccination', 'other')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  file_urls TEXT[] DEFAULT '{}',
  diagnosis TEXT,
  medications JSONB,
  lab_results JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AI consultations table
CREATE TABLE ai_consultations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  symptoms TEXT[] NOT NULL,
  conversation_history JSONB DEFAULT '[]',
  preliminary_diagnosis TEXT,
  confidence_score DECIMAL(5,2) CHECK (confidence_score >= 0 AND confidence_score <= 100),
  recommendations TEXT[] DEFAULT '{}',
  urgency_level TEXT DEFAULT 'low' CHECK (urgency_level IN ('low', 'medium', 'high', 'emergency')),
  referred_to_doctor BOOLEAN DEFAULT FALSE,
  doctor_id UUID REFERENCES doctors(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Notifications table
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('appointment', 'payment', 'result', 'reminder', 'system')),
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Reviews table
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(user_id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(appointment_id)
);

-- Doctor availability table
CREATE TABLE doctor_availability (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  doctor_id UUID REFERENCES doctors(user_id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX idx_medical_records_type ON medical_records(record_type);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_doctors_verification ON doctors(verification_status);
CREATE INDEX idx_doctors_rating ON doctors(rating);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_availability ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Doctors policies
CREATE POLICY "Anyone can view verified doctors" ON doctors FOR SELECT USING (verification_status = 'verified');
CREATE POLICY "Doctors can update own profile" ON doctors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Doctors can insert own profile" ON doctors FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Appointments policies
CREATE POLICY "Users can view own appointments" ON appointments FOR SELECT USING (
  auth.uid() = patient_id OR auth.uid() = doctor_id
);
CREATE POLICY "Patients can create appointments" ON appointments FOR INSERT WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "Users can update own appointments" ON appointments FOR UPDATE USING (
  auth.uid() = patient_id OR auth.uid() = doctor_id
);

-- Medical records policies
CREATE POLICY "Patients can view own records" ON medical_records FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "Doctors can view records for their patients" ON medical_records FOR SELECT USING (
  auth.uid() = doctor_id OR 
  auth.uid() IN (
    SELECT doctor_id FROM appointments WHERE patient_id = medical_records.patient_id
  )
);
CREATE POLICY "Doctors can create records" ON medical_records FOR INSERT WITH CHECK (
  auth.uid() = doctor_id OR auth.uid() = patient_id
);

-- AI consultations policies
CREATE POLICY "Users can view own AI consultations" ON ai_consultations FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "Users can create own AI consultations" ON ai_consultations FOR INSERT WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "Users can update own AI consultations" ON ai_consultations FOR UPDATE USING (auth.uid() = patient_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Patients can create reviews for their appointments" ON reviews FOR INSERT WITH CHECK (
  auth.uid() = patient_id AND
  EXISTS (
    SELECT 1 FROM appointments 
    WHERE id = reviews.appointment_id 
    AND patient_id = auth.uid() 
    AND status = 'completed'
  )
);

-- Doctor availability policies
CREATE POLICY "Anyone can view doctor availability" ON doctor_availability FOR SELECT USING (true);
CREATE POLICY "Doctors can manage own availability" ON doctor_availability FOR ALL USING (auth.uid() = doctor_id);

-- Functions
CREATE OR REPLACE FUNCTION update_doctor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE doctors 
  SET 
    rating = (
      SELECT AVG(rating::DECIMAL) 
      FROM reviews 
      WHERE doctor_id = NEW.doctor_id
    ),
    total_reviews = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE doctor_id = NEW.doctor_id
    )
  WHERE user_id = NEW.doctor_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update doctor rating when review is added
CREATE TRIGGER update_doctor_rating_trigger
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_doctor_rating();

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', COALESCE(NEW.raw_user_meta_data->>'role', 'patient'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
