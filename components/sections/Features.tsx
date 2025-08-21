'use client';

import { 
  Brain, 
  Video, 
  Shield, 
  Clock, 
  FileText, 
  Smartphone,
  Users,
  Award,
  Globe,
  Zap,
  Heart,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Diagnosis',
      description: 'Advanced machine learning algorithms analyze your symptoms and provide preliminary diagnosis with 95% accuracy.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Video,
      title: 'HD Video Consultations',
      description: 'Crystal clear video calls with doctors using WebRTC technology for seamless communication.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'End-to-end encryption and HIPAA compliance ensure your medical data is always secure and private.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access healthcare professionals anytime, anywhere. No more waiting for office hours.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: FileText,
      title: 'Digital Prescriptions',
      description: 'Receive digital prescriptions instantly and track your medication history in one place.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Full-featured mobile app with offline capabilities for healthcare on the go.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
    {
      icon: Users,
      title: 'Specialist Network',
      description: 'Connect with over 500 verified specialists across 30+ medical specialties worldwide.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'All doctors are verified, licensed, and undergo continuous quality monitoring.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Available in 50+ countries with multi-language support and local healthcare integration.',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Revolutionary Healthcare
            <span className="text-medical-primary block">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of healthcare with our cutting-edge platform that combines 
            artificial intelligence, telemedicine, and comprehensive health management.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.bgColor} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-medical-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-medical-primary to-blue-700 rounded-2xl p-8 lg:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2">
                  <Zap className="h-8 w-8 text-yellow-300" />
                  <Heart className="h-8 w-8 text-red-300 heartbeat" />
                  <Lock className="h-8 w-8 text-green-300" />
                </div>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Healthcare Experience?
              </h3>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of patients who have already discovered the future of healthcare.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-medical-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                  Start Free Consultation
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-medical-primary transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}