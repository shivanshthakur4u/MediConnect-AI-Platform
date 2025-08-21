import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, FileText, Heart, Pill, Download, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Consultation, MedicalHistory } from '../../types';
import { motion } from 'framer-motion';

interface UserDashboardProps {
  user: any;
  onBookNewConsultation: () => void;
}

export function UserDashboard({ user, onBookNewConsultation }: UserDashboardProps) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'consultations' | 'history' | 'profile'>('overview');

  const mockConsultations: Consultation[] = [
    {
      id: '1',
      patientId: user?.id || '1',
      doctorId: '1',
      appointmentDate: '2024-01-15',
      appointmentTime: '10:00',
      status: 'completed',
      type: 'video',
      symptoms: ['fever', 'cough', 'fatigue'],
      aiPreliminaryDiagnosis: 'Possible upper respiratory infection',
      doctorNotes: 'Patient showing signs of viral upper respiratory tract infection. Prescribed rest and fluids.',
      prescription: [
        {
          id: '1',
          medicationName: 'Acetaminophen',
          dosage: '500mg',
          frequency: 'Every 6 hours',
          duration: '5 days',
          instructions: 'Take with food'
        }
      ],
      consultationFee: 50,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      patientId: user?.id || '1',
      doctorId: '2',
      appointmentDate: '2024-01-20',
      appointmentTime: '14:30',
      status: 'scheduled',
      type: 'video',
      symptoms: ['chest pain', 'shortness of breath'],
      aiPreliminaryDiagnosis: 'Requires immediate cardiovascular evaluation',
      consultationFee: 80,
      createdAt: '2024-01-10T14:30:00Z'
    }
  ];

  const mockMedicalHistory: MedicalHistory[] = [
    {
      id: '1',
      userId: user?.id || '1',
      consultationId: '1',
      diagnosis: 'Upper Respiratory Tract Infection',
      treatment: 'Rest, fluids, acetaminophen for fever',
      medications: ['Acetaminophen 500mg'],
      date: '2024-01-15',
      doctorName: 'Dr. Sarah Johnson'
    }
  ];

  useEffect(() => {
    setConsultations(mockConsultations);
    setMedicalHistory(mockMedicalHistory);
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Upcoming Consultations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {consultations.filter(c => c.status === 'scheduled').length}
          </div>
          <p className="text-sm text-gray-600">Next: Today at 2:30 PM</p>
          <Button size="sm" className="mt-4" onClick={onBookNewConsultation}>
            Book New
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            Medical Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 mb-2">
            {medicalHistory.length}
          </div>
          <p className="text-sm text-gray-600">Total consultations</p>
          <Button variant="outline" size="sm" className="mt-4">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-600" />
            Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600 mb-2">85%</div>
          <p className="text-sm text-gray-600">Based on recent checkups</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-red-600 h-2 rounded-full" style={{width: '85%'}}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConsultations = () => (
    <div className="space-y-4">
      {consultations.map((consultation, index) => (
        <motion.div
          key={consultation.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Consultation #{consultation.id}</h3>
                  <p className="text-sm text-gray-600">Dr. Sarah Johnson - General Practice</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(consultation.status)}`}>
                  {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {consultation.appointmentDate}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  {consultation.appointmentTime}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Fee:</span>
                  <span className="font-medium">${consultation.consultationFee}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {consultation.symptoms.map(symptom => (
                    <span key={symptom} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              {consultation.aiPreliminaryDiagnosis && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">AI Assessment:</h4>
                  <p className="text-sm text-gray-700">{consultation.aiPreliminaryDiagnosis}</p>
                </div>
              )}

              {consultation.doctorNotes && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Doctor's Notes:</h4>
                  <p className="text-sm text-gray-700">{consultation.doctorNotes}</p>
                </div>
              )}

              {consultation.prescription && consultation.prescription.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-1">
                    <Pill className="h-4 w-4" />
                    Prescriptions:
                  </h4>
                  <div className="space-y-2">
                    {consultation.prescription.map(med => (
                      <div key={med.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-medium text-gray-900">{med.medicationName}</div>
                        <div className="text-sm text-gray-600">
                          {med.dosage} - {med.frequency} for {med.duration}
                        </div>
                        <div className="text-sm text-gray-500">{med.instructions}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {consultation.status === 'scheduled' && (
                  <>
                    <Button size="sm">Join Consultation</Button>
                    <Button variant="outline" size="sm">Reschedule</Button>
                  </>
                )}
                {consultation.status === 'completed' && (
                  <>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4 mr-1" />
                      Rate Doctor
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="space-y-4">
      {medicalHistory.map((record, index) => (
        <motion.div
          key={record.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{record.diagnosis}</h3>
                  <p className="text-sm text-gray-600">{record.doctorName}</p>
                </div>
                <span className="text-sm text-gray-500">{record.date}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Treatment:</h4>
                  <p className="text-sm text-gray-700">{record.treatment}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Medications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {record.medications.map((med, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="mt-4">
                <Download className="h-4 w-4 mr-1" />
                Download Record
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderProfile = () => (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{user?.name || 'John Doe'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">{user?.email || 'john@example.com'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <p className="text-gray-900">+1 (555) 123-4567</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <p className="text-gray-900">January 15, 1990</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <p className="text-gray-900">Male</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
            <p className="text-gray-900">O+</p>
          </div>
        </div>
        <Button className="mt-6">Edit Profile</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'John'}!</p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Heart },
            { id: 'consultations', label: 'Consultations', icon: Calendar },
            { id: 'history', label: 'Medical History', icon: FileText },
            { id: 'profile', label: 'Profile', icon: User }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'consultations' && renderConsultations()}
        {activeTab === 'history' && renderMedicalHistory()}
        {activeTab === 'profile' && renderProfile()}
      </div>
    </div>
  );
}