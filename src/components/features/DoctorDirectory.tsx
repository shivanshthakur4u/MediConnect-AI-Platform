import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Clock, Video, MessageCircle, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Doctor } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface DoctorDirectoryProps {
  onBookConsultation: (doctor: Doctor) => void;
  selectedSpecialty?: string;
}

export function DoctorDirectory({ onBookConsultation, selectedSpecialty }: DoctorDirectoryProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty_, setSelectedSpecialty_] = useState(selectedSpecialty || '');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee'>('rating');

  const specialties = [
    'All Specialties',
    'General Practice',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Gynecology',
    'Ophthalmology',
    'Gastroenterology'
  ];

  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Practice',
      qualification: 'MD, MBBS',
      experience: 8,
      rating: 4.9,
      totalConsultations: 1250,
      consultationFee: 50,
      languages: ['English', 'Spanish'],
      about: 'Experienced family medicine physician specializing in preventive care and chronic disease management.',
      profileImage: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      availability: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      ]
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      qualification: 'MD, Cardiology',
      experience: 12,
      rating: 4.8,
      totalConsultations: 890,
      consultationFee: 80,
      languages: ['English', 'Mandarin'],
      about: 'Board-certified cardiologist with expertise in heart disease prevention and interventional cardiology.',
      profileImage: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      availability: [
        { day: 'Monday', startTime: '10:00', endTime: '16:00', isAvailable: true },
        { day: 'Thursday', startTime: '10:00', endTime: '16:00', isAvailable: true },
        { day: 'Friday', startTime: '10:00', endTime: '16:00', isAvailable: true },
      ]
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      qualification: 'MD, Dermatology',
      experience: 6,
      rating: 4.7,
      totalConsultations: 650,
      consultationFee: 70,
      languages: ['English', 'Spanish'],
      about: 'Dermatologist specializing in both medical and cosmetic dermatology with a focus on skin cancer prevention.',
      profileImage: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      availability: [
        { day: 'Tuesday', startTime: '11:00', endTime: '18:00', isAvailable: true },
        { day: 'Wednesday', startTime: '11:00', endTime: '18:00', isAvailable: true },
        { day: 'Saturday', startTime: '09:00', endTime: '15:00', isAvailable: true },
      ]
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Neurology',
      qualification: 'MD, PhD Neurology',
      experience: 15,
      rating: 4.9,
      totalConsultations: 1100,
      consultationFee: 90,
      languages: ['English'],
      about: 'Leading neurologist specializing in migraine treatment, epilepsy, and neurodegenerative diseases.',
      profileImage: 'https://images.pexels.com/photos/5452240/pexels-photo-5452240.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      availability: [
        { day: 'Monday', startTime: '08:00', endTime: '15:00', isAvailable: true },
        { day: 'Wednesday', startTime: '08:00', endTime: '15:00', isAvailable: true },
        { day: 'Friday', startTime: '08:00', endTime: '15:00', isAvailable: true },
      ]
    },
    {
      id: '5',
      name: 'Dr. Lisa Thompson',
      specialty: 'Pediatrics',
      qualification: 'MD, Pediatrics',
      experience: 10,
      rating: 4.8,
      totalConsultations: 980,
      consultationFee: 60,
      languages: ['English', 'French'],
      about: 'Dedicated pediatrician with special interest in child development and adolescent medicine.',
      profileImage: 'https://images.pexels.com/photos/5452246/pexels-photo-5452246.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      availability: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      ]
    },
    {
      id: '6',
      name: 'Dr. Robert Kumar',
      specialty: 'Orthopedics',
      qualification: 'MD, MS Orthopedics',
      experience: 14,
      rating: 4.6,
      totalConsultations: 750,
      consultationFee: 75,
      languages: ['English', 'Hindi'],
      about: 'Orthopedic surgeon specializing in joint replacement and sports medicine.',
      profileImage: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: true,
      availability: [
        { day: 'Tuesday', startTime: '10:00', endTime: '16:00', isAvailable: true },
        { day: 'Thursday', startTime: '10:00', endTime: '16:00', isAvailable: true },
        { day: 'Saturday', startTime: '08:00', endTime: '14:00', isAvailable: true },
      ]
    }
  ];

  useEffect(() => {
    setDoctors(mockDoctors);
    setFilteredDoctors(mockDoctors);
  }, []);

  useEffect(() => {
    let filtered = doctors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by specialty
    if (selectedSpecialty_ && selectedSpecialty_ !== 'All Specialties') {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty_);
    }

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'fee':
          return a.consultationFee - b.consultationFee;
        default:
          return 0;
      }
    });

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, selectedSpecialty_, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Find Doctors</h1>
        <p className="text-gray-600 mt-2">Connect with verified healthcare professionals</p>
      </motion.div>

      {/* Search and Filter Controls */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedSpecialty_}
            onChange={(e) => setSelectedSpecialty_(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rating' | 'experience' | 'fee')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rating">Sort by Rating</option>
            <option value="experience">Sort by Experience</option>
            <option value="fee">Sort by Fee</option>
          </select>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={doctor.profileImage} 
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  <p className="text-sm text-gray-600">{doctor.qualification}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-gray-500">({doctor.totalConsultations} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{doctor.experience} years</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Consultation Fee:</span>
                    <span className="font-medium text-green-600">${doctor.consultationFee}</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-600">Languages:</span>
                    <span className="text-gray-900">{doctor.languages.join(', ')}</span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{doctor.about}</p>

                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Clock className="h-4 w-4" />
                    <span>Available today</span>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => onBookConsultation(doctor)}
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Book Video
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onBookConsultation(doctor)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onBookConsultation(doctor)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredDoctors.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No doctors found matching your criteria</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setSelectedSpecialty_('All Specialties');
            }}
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}