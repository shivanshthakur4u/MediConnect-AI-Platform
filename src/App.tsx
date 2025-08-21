import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/features/Hero';
import { AIConsultation } from './components/features/AIConsultation';
import { DoctorDirectory } from './components/features/DoctorDirectory';
import { UserDashboard } from './components/features/UserDashboard';
import { BookingModal } from './components/features/BookingModal';
import { Doctor } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';

type View = 'home' | 'ai-consultation' | 'doctors' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [user, setUser] = useState<any>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');

  // Mock authentication
  const handleLogin = () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    setUser(mockUser);
    toast.success('Welcome back, John!');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
    toast.success('Logged out successfully');
  };

  const handleStartConsultation = () => {
    setCurrentView('ai-consultation');
  };

  const handleFindDoctors = () => {
    setCurrentView('doctors');
  };

  const handleBookDoctor = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setCurrentView('doctors');
  };

  const handleBookConsultation = (doctor: Doctor) => {
    if (!user) {
      toast.error('Please login to book a consultation');
      handleLogin(); // Auto-login for demo
      return;
    }
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = () => {
    toast.success('Consultation booked successfully!');
    setCurrentView('dashboard');
  };

  const renderView = () => {
    switch (currentView) {
      case 'ai-consultation':
        return (
          <motion.div
            key="ai-consultation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AIConsultation onBookDoctor={handleBookDoctor} />
          </motion.div>
        );
      case 'doctors':
        return (
          <motion.div
            key="doctors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DoctorDirectory 
              onBookConsultation={handleBookConsultation}
              selectedSpecialty={selectedSpecialty}
            />
          </motion.div>
        );
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <UserDashboard 
              user={user}
              onBookNewConsultation={handleFindDoctors}
            />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero 
              onStartConsultation={handleStartConsultation}
              onFindDoctors={handleFindDoctors}
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      {/* Navigation */}
      {user && (
        <nav className="bg-white border-b border-gray-200 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex space-x-8 py-3">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('ai-consultation')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === 'ai-consultation'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                AI Consultation
              </button>
              <button
                onClick={() => setCurrentView('doctors')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === 'doctors'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Find Doctors
              </button>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
            </div>
          </div>
        </nav>
      )}

      <main>
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedDoctor(null);
          }}
          onBookingComplete={handleBookingComplete}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;