'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Users, FileText, Globe } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: FileText,
      content: [
        'Personal identification information (name, email, phone number)',
        'Medical information and health data',
        'Payment and billing information',
        'Device information and usage data',
        'Communication records and preferences'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Users,
      content: [
        'Providing medical consultations and healthcare services',
        'Processing payments and billing',
        'Improving our AI diagnostic capabilities',
        'Communicating about appointments and health updates',
        'Ensuring platform security and fraud prevention'
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        'End-to-end encryption for all medical communications',
        'HIPAA-compliant data storage and transmission',
        'Regular security audits and vulnerability assessments',
        'Secure data centers with 24/7 monitoring',
        'Multi-factor authentication and access controls'
      ]
    },
    {
      title: 'Your Privacy Rights',
      icon: Shield,
      content: [
        'Access and review your personal information',
        'Request corrections to inaccurate data',
        'Delete your account and associated data',
        'Control marketing communications preferences',
        'Opt-out of non-essential data processing'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-medical-primary via-blue-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl mb-4">Last updated: January 1, 2024</p>
            <p className="text-lg opacity-90">
              Your privacy and the security of your health information is our top priority.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              MediConnect AI is committed to protecting your privacy and maintaining the confidentiality 
              of your personal health information. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our healthcare platform.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={section.title}>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Icon className="h-8 w-8 text-medical-primary mr-3" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-medical-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Important Sections */}
        <div className="space-y-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Globe className="h-8 w-8 text-medical-primary mr-3" />
                International Data Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data in accordance with 
                this Privacy Policy and applicable laws.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Eye className="h-8 w-8 text-medical-primary mr-3" />
                Data Retention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to provide our services, 
                comply with legal obligations, resolve disputes, and enforce our agreements. Medical 
                records are retained in accordance with healthcare regulations and standards.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions About Privacy?</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> privacy@mediconnect-ai.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Healthcare Blvd, Medical District, NY 10001</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
