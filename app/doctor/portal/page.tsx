'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Video,
  Clock,
  Star,
  FileText,
  Settings,
  Bell,
  MessageCircle,
  Award,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: 'video' | 'phone' | 'chat';
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  duration: number;
  fee: number;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  condition: string;
  status: 'active' | 'follow-up' | 'discharged';
}

export default function DoctorPortalPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'patients' | 'earnings' | 'settings'>('overview');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, mounted, router]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: 'Today\'s Appointments',
      value: '8',
      change: '+2 from yesterday',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Patients',
      value: '247',
      change: '+15 this month',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Monthly Earnings',
      value: '$12,450',
      change: '+18% from last month',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Patient Rating',
      value: '4.9',
      change: 'Based on 156 reviews',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  const todayAppointments: Appointment[] = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      time: '09:00 AM',
      type: 'video',
      status: 'upcoming',
      duration: 30,
      fee: 150
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      time: '10:30 AM',
      type: 'video',
      status: 'in-progress',
      duration: 45,
      fee: 200
    },
    {
      id: '3',
      patientName: 'Emily Rodriguez',
      time: '02:00 PM',
      type: 'phone',
      status: 'upcoming',
      duration: 30,
      fee: 120
    },
    {
      id: '4',
      patientName: 'David Wilson',
      time: '03:30 PM',
      type: 'video',
      status: 'upcoming',
      duration: 30,
      fee: 150
    }
  ];

  const recentPatients: Patient[] = [
    {
      id: '1',
      name: 'Alice Cooper',
      age: 34,
      lastVisit: '2024-01-20',
      condition: 'Hypertension',
      status: 'follow-up'
    },
    {
      id: '2',
      name: 'Bob Smith',
      age: 45,
      lastVisit: '2024-01-19',
      condition: 'Type 2 Diabetes',
      status: 'active'
    },
    {
      id: '3',
      name: 'Carol Davis',
      age: 28,
      lastVisit: '2024-01-18',
      condition: 'Anxiety',
      status: 'discharged'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'follow-up': return 'bg-yellow-100 text-yellow-800';
      case 'discharged': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Doctor Portal</h1>
              <p className="text-gray-600">Welcome back, Dr. {user.user_metadata?.full_name || user.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Activity },
              { id: 'appointments', name: 'Appointments', icon: Calendar },
              { id: 'patients', name: 'Patients', icon: Users },
              { id: 'earnings', name: 'Earnings', icon: DollarSign },
              { id: 'settings', name: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-medical-primary text-medical-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.change}</p>
                          </div>
                          <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                            <Icon className={`h-6 w-6 ${stat.color}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Today's Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Today's Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {appointment.type === 'video' ? (
                              <Video className="h-5 w-5 text-blue-600" />
                            ) : (
                              <MessageCircle className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{appointment.patientName}</p>
                            <p className="text-sm text-gray-600">{appointment.time} • {appointment.duration} min</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">${appointment.fee}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Patients */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Recent Patients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPatients.map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{patient.name}</p>
                            <p className="text-sm text-gray-600">Age {patient.age} • {patient.condition}</p>
                            <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                          </div>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-medical-primary hover:bg-blue-700">
                    <Video className="h-4 w-4 mr-2" />
                    Start Video Call
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Write Prescription
                  </Button>
                  <Button variant="outline">
                    <Award className="h-4 w-4 mr-2" />
                    View Certifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tabs would have their content here */}
        {activeTab !== 'overview' && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
            </h3>
            <p className="text-gray-600">This section is under development and will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
