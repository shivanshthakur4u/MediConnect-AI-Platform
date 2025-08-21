'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Video, 
  Clock, 
  Shield, 
  Award, 
  Users, 
  Search,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: '24/7 Available', value: '24/7', icon: Clock },
    { label: 'Verified Doctors', value: '500+', icon: Award },
    { label: 'Patient Satisfaction', value: '98%', icon: Users },
    { label: 'Countries Served', value: '50+', icon: Shield },
  ];

  const features = [
    'AI-powered symptom analysis',
    'Instant doctor matching',
    'Secure video consultations',
    'Digital prescriptions',
    'Medical record management',
    'Insurance integration',
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              <Shield className="h-4 w-4 mr-2" />
              HIPAA Compliant & Secure
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                AI-Powered
                <span className="text-medical-primary block">Healthcare</span>
                <span className="text-2xl lg:text-4xl text-gray-600 block mt-2">
                  24/7 at Your Service
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Get instant AI symptom analysis, connect with verified doctors worldwide, 
                and manage your complete health journey - all in one intelligent platform.
              </p>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Describe your symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Link href="/ai-consultation">
                <Button size="lg" className="h-12 px-6">
                  Analyze Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/ai-consultation">
                <Button size="xl" className="w-full sm:w-auto">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start AI Consultation
                </Button>
              </Link>
              
              <Link href="/doctors">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  <Video className="mr-2 h-5 w-5" />
                  Find Doctors
                </Button>
              </Link>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-medical-primary" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image/Video Placeholder */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                >
                  <Play className="mr-2 h-6 w-6" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Overlay Cards */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">AI Analysis Complete</div>
                    <div className="text-sm text-gray-600">Risk Level: Low</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">Dr. Sarah online</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -left-8 bg-white rounded-lg shadow-lg p-3"
            >
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 -right-8 bg-white rounded-lg shadow-lg p-3"
            >
              <Video className="h-6 w-6 text-green-600" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="relative mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-600">Trusted by healthcare professionals worldwide</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Placeholder for partner logos */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 font-medium">Partner {i}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}