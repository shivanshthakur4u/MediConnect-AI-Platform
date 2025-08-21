'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  Video,
  Calendar,
  User,
  Award,
  Heart,
  Brain,
  Eye,
  Bone,
  Baby
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: User },
    { id: 'cardiology', name: 'Cardiology', icon: Heart },
    { id: 'neurology', name: 'Neurology', icon: Brain },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: Eye },
    { id: 'orthopedics', name: 'Orthopedics', icon: Bone },
    { id: 'pediatrics', name: 'Pediatrics', icon: Baby },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.9,
      reviews: 156,
      experience: '15 years',
      location: 'New York, NY',
      availability: 'Available today',
      consultationFee: 150,
      image: '/api/placeholder/100/100',
      verified: true,
      nextAvailable: '2:00 PM Today',
      languages: ['English', 'Spanish'],
      education: 'Harvard Medical School',
      hospital: 'Mount Sinai Hospital'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      rating: 4.8,
      reviews: 203,
      experience: '12 years',
      location: 'Los Angeles, CA',
      availability: 'Available tomorrow',
      consultationFee: 180,
      image: '/api/placeholder/100/100',
      verified: true,
      nextAvailable: '9:00 AM Tomorrow',
      languages: ['English', 'Mandarin'],
      education: 'Stanford Medical School',
      hospital: 'UCLA Medical Center'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      rating: 4.9,
      reviews: 89,
      experience: '8 years',
      location: 'Chicago, IL',
      availability: 'Available now',
      consultationFee: 120,
      image: '/api/placeholder/100/100',
      verified: true,
      nextAvailable: 'Now',
      languages: ['English', 'Spanish'],
      education: 'Johns Hopkins Medical School',
      hospital: 'Children\'s Hospital of Chicago'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      rating: 4.7,
      reviews: 134,
      experience: '20 years',
      location: 'Boston, MA',
      availability: 'Available in 3 hours',
      consultationFee: 200,
      image: '/api/placeholder/100/100',
      verified: true,
      nextAvailable: '5:00 PM Today',
      languages: ['English'],
      education: 'Harvard Medical School',
      hospital: 'Massachusetts General Hospital'
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty.toLowerCase() === selectedSpecialty;
    const matchesRating = selectedRating === 'all' || doctor.rating >= parseFloat(selectedRating);
    
    return matchesSearch && matchesSpecialty && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Expert Doctors</h1>
            <p className="text-xl text-gray-600 mb-8">Connect with verified healthcare professionals worldwide</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by doctor name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Specialty Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Specialty</h3>
                  <div className="space-y-2">
                    {specialties.map((specialty) => {
                      const Icon = specialty.icon;
                      return (
                        <button
                          key={specialty.id}
                          onClick={() => setSelectedSpecialty(specialty.id)}
                          className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                            selectedSpecialty === specialty.id
                              ? 'bg-medical-primary text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm">{specialty.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="all">All Ratings</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="all">Any Time</option>
                    <option value="today">Available Today</option>
                    <option value="tomorrow">Available Tomorrow</option>
                    <option value="week">This Week</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Doctors List */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
              </p>
              <select className="p-2 border border-gray-300 rounded-lg">
                <option>Sort by Rating</option>
                <option>Sort by Experience</option>
                <option>Sort by Price</option>
                <option>Sort by Availability</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Doctor Image */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                            <User className="h-12 w-12 text-gray-400" />
                          </div>
                        </div>

                        {/* Doctor Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                                {doctor.verified && (
                                  <Award className="h-5 w-5 text-blue-500" />
                                )}
                              </div>
                              <p className="text-medical-primary font-medium">{doctor.specialty}</p>
                              <p className="text-gray-600">{doctor.hospital}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1 mb-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="font-semibold">{doctor.rating}</span>
                                <span className="text-gray-600">({doctor.reviews})</span>
                              </div>
                              <p className="text-sm text-gray-600">{doctor.experience} experience</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{doctor.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-green-600">{doctor.availability}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Video className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Video consultation available</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Languages: {doctor.languages.join(', ')}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">Consultation fee</p>
                              <p className="text-xl font-bold text-gray-900">${doctor.consultationFee}</p>
                            </div>
                            <div className="flex space-x-3">
                              <Button variant="outline">
                                View Profile
                              </Button>
                              <Button className="bg-medical-primary hover:bg-blue-700">
                                <Calendar className="h-4 w-4 mr-2" />
                                Book Appointment
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
