'use client';

import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Working Mother',
      location: 'San Francisco, CA',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: "MediConnect AI saved me hours of waiting at the clinic. The AI diagnosis was spot-on, and I was connected with a specialist within minutes. The video consultation was crystal clear, and I received my prescription instantly.",
      condition: 'Respiratory Issues',
      videoUrl: '#',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      location: 'New York, NY',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: "As a doctor, I'm impressed by the platform's AI accuracy and the seamless integration with my practice. It helps me reach more patients and provide quality care remotely. The diagnostic tools are remarkably sophisticated.",
      condition: 'Healthcare Provider',
      videoUrl: '#',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'College Student',
      location: 'Austin, TX',
      avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: "Being away from home for college, having access to quality healthcare 24/7 gives me peace of mind. The platform is user-friendly, affordable, and the doctors are genuinely caring. Highly recommend!",
      condition: 'General Health',
      videoUrl: '#',
    },
    {
      id: 4,
      name: 'Robert Kumar',
      role: 'Senior Executive',
      location: 'Chicago, IL',
      avatar: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: "The convenience is unmatched. I can consult with specialists during my busy schedule without taking time off work. The AI pre-screening helps doctors understand my condition better before the consultation.",
      condition: 'Chronic Care Management',
      videoUrl: '#',
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Pediatric Nurse',
      location: 'Seattle, WA',
      avatar: 'https://images.pexels.com/photos/5452246/pexels-photo-5452246.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: "I use this platform for my family's healthcare needs. The pediatric consultations are excellent, and my kids feel comfortable talking to doctors through video calls. The medical records feature is incredibly helpful.",
      condition: 'Family Healthcare',
      videoUrl: '#',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Happy Patients' },
    { value: '500+', label: 'Verified Doctors' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Availability' },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
            What Our
            <span className="text-medical-primary"> Patients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from real people who have transformed their healthcare experience 
            with our AI-powered platform.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-medical-primary mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 lg:p-12"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div>
                  <div className="flex items-center mb-6">
                    <Quote className="h-8 w-8 text-medical-primary mr-3" />
                    <div className="flex">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="text-xl lg:text-2xl text-gray-800 leading-relaxed mb-8">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-gray-600">
                        {testimonials[currentTestimonial].role}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonials[currentTestimonial].location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video/Image */}
                <div className="relative">
                  <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                    <img
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                        <Play className="h-6 w-6 text-medical-primary ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Condition Badge */}
                  <div className="absolute -bottom-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2">
                    <div className="text-sm font-medium text-gray-900">
                      {testimonials[currentTestimonial].condition}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial
                      ? 'bg-medical-primary'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentTestimonial(index)}
              className={`relative group ${
                index === currentTestimonial ? 'ring-2 ring-medical-primary' : ''
              } rounded-lg overflow-hidden transition-all duration-200`}
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200"></div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-white text-sm font-medium truncate">
                  {testimonial.name}
                </div>
                <div className="text-white/80 text-xs truncate">
                  {testimonial.role}
                </div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h3>
            <p className="text-gray-600 mb-6">
              Our platform is endorsed by leading medical institutions and healthcare providers worldwide.
            </p>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center opacity-60">
              {['HIPAA Compliant', 'FDA Approved', 'ISO Certified', 'SOC 2 Type II'].map((badge, index) => (
                <div key={index} className="text-center">
                  <div className="h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-gray-600 font-medium text-sm">{badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}