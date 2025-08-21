'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowRight, 
  Smartphone, 
  Download, 
  Star, 
  Shield, 
  Clock,
  CheckCircle,
  Heart,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export function CTA() {
  const features = [
    'AI-powered symptom analysis',
    'Connect with 500+ verified doctors',
    'Secure video consultations',
    'Digital prescriptions',
    '24/7 availability',
    'HIPAA compliant platform'
  ];

  const appFeatures = [
    {
      icon: Heart,
      title: 'Health Tracking',
      description: 'Monitor your health metrics and symptoms over time'
    },
    {
      icon: Zap,
      title: 'Instant Notifications',
      description: 'Get real-time updates about appointments and results'
    },
    {
      icon: Shield,
      title: 'Offline Access',
      description: 'Access your medical records even without internet'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-medical-primary via-blue-700 to-blue-800 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Your Health Journey
            <span className="block text-blue-200">Starts Here</span>
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Join thousands of patients who have already discovered the future of healthcare. 
            Get started with your first AI consultation today.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-2 text-blue-100"
              >
                <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link href="/auth/register">
              <Button size="xl" className="bg-white text-medical-primary hover:bg-gray-100 font-semibold">
                Start Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/ai-consultation">
              <Button 
                variant="outline" 
                size="xl" 
                className="border-white text-white hover:bg-white hover:text-medical-primary font-semibold"
              >
                Try AI Symptom Checker
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-200"
          >
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-300 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-300" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-300" />
              <span>24/7 Available</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile App Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* App Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="h-8 w-8 text-blue-200" />
              <span className="text-blue-200 font-medium">Mobile App</span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Healthcare in Your Pocket
            </h3>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Download our mobile app for iOS and Android to access healthcare 
              anytime, anywhere. Get all the features of our web platform optimized 
              for mobile use.
            </p>

            {/* App Features */}
            <div className="space-y-4 mb-8">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-blue-100 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-200">
                <Download className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </button>
              
              <button className="flex items-center justify-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-200">
                <Download className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* App Preview */}
          <div className="relative">
            <div className="relative mx-auto w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                {/* Phone Screen Content */}
                <div className="h-full bg-gradient-to-br from-blue-50 to-green-50 p-4">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-medical-primary rounded-xl mx-auto mb-2 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900">MediConnect AI</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Heart className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">AI Consultation</div>
                          <div className="text-xs text-gray-600">Available now</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Dr. Sarah Johnson</div>
                          <div className="text-xs text-gray-600">Next: Today 2:30 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-sm rounded-lg p-3"
            >
              <Star className="h-6 w-6 text-yellow-300" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3"
            >
              <Shield className="h-6 w-6 text-green-300" />
            </motion.div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated with Health Tips
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest health insights, platform updates, 
              and exclusive wellness content from our medical experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-blue-200"
              />
              <Button className="bg-white text-medical-primary hover:bg-gray-100 font-semibold">
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-blue-200 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}