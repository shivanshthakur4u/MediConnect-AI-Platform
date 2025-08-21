'use client';

import { 
  MessageSquare, 
  Brain, 
  UserCheck, 
  Video, 
  FileText, 
  ArrowRight,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: MessageSquare,
      title: 'Describe Symptoms',
      description: 'Tell our AI about your symptoms using natural language or our guided questionnaire.',
      details: [
        'Natural language processing',
        'Guided symptom checker',
        'Medical history integration',
        'Photo/video uploads'
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      step: '02',
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes your symptoms and provides preliminary diagnosis with risk assessment.',
      details: [
        'Machine learning diagnosis',
        'Risk level assessment',
        'Specialty recommendations',
        'Urgency scoring'
      ],
      color: 'from-purple-500 to-purple-600',
    },
    {
      step: '03',
      icon: UserCheck,
      title: 'Doctor Matching',
      description: 'Get matched with the most suitable verified doctor based on your condition and preferences.',
      details: [
        'Intelligent matching algorithm',
        'Specialty-based selection',
        'Availability optimization',
        'Language preferences'
      ],
      color: 'from-green-500 to-green-600',
    },
    {
      step: '04',
      icon: Video,
      title: 'Consultation',
      description: 'Connect with your doctor via secure video call, chat, or phone consultation.',
      details: [
        'HD video consultations',
        'Secure messaging',
        'File sharing capability',
        'Real-time collaboration'
      ],
      color: 'from-orange-500 to-orange-600',
    },
    {
      step: '05',
      icon: FileText,
      title: 'Treatment Plan',
      description: 'Receive your diagnosis, treatment plan, and digital prescription instantly.',
      details: [
        'Digital prescriptions',
        'Treatment recommendations',
        'Follow-up scheduling',
        'Medical record updates'
      ],
      color: 'from-teal-500 to-teal-600',
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Average consultation time: 15 minutes vs 2+ hours at traditional clinics',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'HIPAA compliant with end-to-end encryption for all communications',
    },
    {
      icon: CheckCircle,
      title: 'Quality Care',
      description: '98% patient satisfaction rate with board-certified physicians',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
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
            How It
            <span className="text-medical-primary"> Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get quality healthcare in 5 simple steps. Our streamlined process ensures 
            you receive the care you need quickly and efficiently.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-5xl">
            <div className="h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 via-orange-200 to-teal-200"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                  {/* Step Number */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${step.color} text-white rounded-xl font-bold text-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-xl mb-4 group-hover:bg-gray-100 transition-colors duration-300">
                    <step.icon className="h-8 w-8 text-gray-700" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-2 z-10">
                    <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h3>
            <p className="text-lg text-gray-600">
              Experience the benefits of modern healthcare technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-medical-primary/10 rounded-xl mb-4">
                  <benefit.icon className="h-8 w-8 text-medical-primary" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of patients who trust our platform for their healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-medical-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                Start Your Consultation
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}