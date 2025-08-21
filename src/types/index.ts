export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  insuranceInfo?: string;
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  rating: number;
  totalConsultations: number;
  availability: AvailabilitySlot[];
  consultationFee: number;
  languages: string[];
  about: string;
  profileImage: string;
  verified: boolean;
}

export interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'video' | 'chat' | 'phone';
  symptoms: string[];
  aiPreliminaryDiagnosis?: string;
  doctorNotes?: string;
  prescription?: Prescription[];
  followUpDate?: string;
  consultationFee: number;
  createdAt: string;
}

export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface AIAnalysis {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  suggestedSpecialty: string;
  preliminaryDiagnosis: string;
  recommendedActions: string[];
  urgencyScore: number;
}

export interface MedicalHistory {
  id: string;
  userId: string;
  consultationId: string;
  diagnosis: string;
  treatment: string;
  medications: string[];
  date: string;
  doctorName: string;
}