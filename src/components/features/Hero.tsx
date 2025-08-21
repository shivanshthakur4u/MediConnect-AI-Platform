import React from 'react';
import { MessageCircle, Video, Clock, Shield, Award, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

interface HeroProps {
  onStartConsultation: () => void;
  onFindDoctors: () => void;
}

export function Hero({ onStartConsultation, onFindDoctors }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              AI-Powered
              <span className="text-blue-600 block">Healthcare</span>
              24/7 at Your Service
            </h1>
            
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Get instant AI symptom analysis, book consultations with verified doctors, 
              and manage your health records - all in one intelligent platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" onClick={onStartConsultation} className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Start AI Consultation
              </Button>
              <Button variant="outline" size="lg" onClick={onFindDoctors} className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Find Doctors
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Clock className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900">Instant Access</h3>
                <p className="text-sm text-gray-600">Connect with doctors anytime, anywhere</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Shield className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900">Secure & Private</h3>
                <p className="text-sm text-gray-600">HIPAA compliant with end-to-end encryption</p>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Award className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900">Certified Doctors</h3>
                <p className="text-sm text-gray-600">All doctors are verified and licensed</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Users className="h-8 w-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900">AI Assistance</h3>
                <p className="text-sm text-gray-600">Smart symptom analysis and recommendations</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}