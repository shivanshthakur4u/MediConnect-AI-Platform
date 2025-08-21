'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Users, 
  Award, 
  Globe, 
  Shield, 
  Brain,
  Target,
  Lightbulb,
  CheckCircle,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'Verified Doctors', icon: Users },
    { number: '50K+', label: 'Consultations', icon: Heart },
    { number: '30+', label: 'Specialties', icon: Award },
    { number: '95%', label: 'Accuracy Rate', icon: Brain },
  ];

  const team = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Chief Medical Officer',
      bio: 'Harvard Medical School graduate with 20+ years in telemedicine',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Alex Chen',
      role: 'Chief Technology Officer',
      bio: 'Former Google AI researcher specializing in healthcare ML',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Head of Patient Experience',
      bio: 'Healthcare advocate with expertise in patient-centered care',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Dr. James Wilson',
      role: 'AI Ethics Advisor',
      bio: 'Bioethicist ensuring responsible AI implementation in healthcare',
      image: '/api/placeholder/150/150'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Every decision we make prioritizes patient wellbeing and accessibility to quality healthcare.'
    },
    {
      icon: Brain,
      title: 'Innovation Excellence',
      description: 'We leverage cutting-edge AI technology to revolutionize healthcare delivery worldwide.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your health data is protected with military-grade encryption and HIPAA compliance.'
    },
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Breaking down geographical barriers to connect patients with healthcare professionals.'
    }
  ];

  const achievements = [
    'Featured in TechCrunch as "Healthcare Innovation of the Year"',
    'FDA approval for AI diagnostic assistance',
    'Partnership with 200+ healthcare institutions',
    'Winner of the Digital Health Innovation Award 2023',
    'ISO 27001 certified for information security',
    '99.9% platform uptime reliability'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-medical-primary via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold mb-6">About MediConnect AI</h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                We're revolutionizing healthcare accessibility through AI-powered consultations 
                and seamless connections between patients and healthcare professionals worldwide.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/auth/register">
                  <Button size="lg" variant="secondary">
                    Join Our Platform
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-medical-primary/10 rounded-full">
                      <Icon className="h-8 w-8 text-medical-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Target className="h-8 w-8 text-medical-primary mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To democratize healthcare access by combining artificial intelligence with 
                    human expertise, making quality medical consultations available to everyone, 
                    anywhere, at any time. We believe healthcare should be a right, not a privilege.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Lightbulb className="h-8 w-8 text-medical-primary mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To create a world where advanced healthcare is accessible to every person on Earth, 
                    where AI augments human medical expertise to provide faster, more accurate diagnoses, 
                    and where geographical and economic barriers to healthcare are eliminated.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-medical-primary/10 rounded-lg mr-4">
                          <Icon className="h-6 w-6 text-medical-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                      </div>
                      <p className="text-gray-700">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals revolutionizing healthcare</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-medical-primary font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600">Recognition and milestones that drive us forward</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg"
              >
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-900">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-br from-medical-primary via-blue-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience the Future of Healthcare?</h2>
          <p className="text-xl mb-8">
            Join thousands of patients who trust MediConnect AI for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary">
                Get Started Today
              </Button>
            </Link>
            <Link href="/doctors">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                Explore Our Doctors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
