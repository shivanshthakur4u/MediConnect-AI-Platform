'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Users, AlertTriangle, Scale, Globe } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: FileText,
      content: 'By accessing and using MediConnect AI, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our healthcare platform and all related services.'
    },
    {
      title: 'Medical Disclaimer',
      icon: AlertTriangle,
      content: 'MediConnect AI provides a platform for connecting patients with healthcare professionals. We do not provide medical advice, diagnosis, or treatment. All medical decisions should be made in consultation with qualified healthcare providers. Our AI tools are designed to assist, not replace, professional medical judgment.'
    },
    {
      title: 'User Responsibilities',
      icon: Users,
      content: 'Users must provide accurate information, maintain the confidentiality of their account credentials, use the platform in accordance with applicable laws, and respect the privacy and rights of other users and healthcare providers.'
    },
    {
      title: 'Privacy and Data Protection',
      icon: Shield,
      content: 'We are committed to protecting your privacy and personal health information in accordance with HIPAA and other applicable privacy laws. Please review our Privacy Policy for detailed information about how we collect, use, and protect your data.'
    },
    {
      title: 'Limitation of Liability',
      icon: Scale,
      content: 'MediConnect AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform. Our liability is limited to the maximum extent permitted by law.'
    },
    {
      title: 'International Use',
      icon: Globe,
      content: 'Our services are available globally, but you are responsible for compliance with local laws and regulations in your jurisdiction. Some features may not be available in all countries due to regulatory requirements.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-medical-primary via-blue-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl mb-4">Last updated: January 1, 2024</p>
            <p className="text-lg opacity-90">
              Please read these terms carefully before using our platform.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to MediConnect AI. These Terms of Service ("Terms") govern your use of our 
              healthcare platform and services. By using our platform, you agree to these terms 
              and our Privacy Policy.
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
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Detailed Sections */}
        <div className="space-y-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Payment Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>
                  • Consultation fees are set by individual healthcare providers
                </p>
                <p>
                  • Payment is required before or at the time of consultation
                </p>
                <p>
                  • Refunds are subject to our refund policy and provider agreement
                </p>
                <p>
                  • Platform fees may apply to certain services
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>You may not use our platform to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide false or misleading information</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful or malicious content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We reserve the right to terminate or suspend your account at any time for violation 
                of these terms or for any other reason at our sole discretion. Upon termination, 
                your right to use the platform will cease immediately.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions About These Terms?</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@mediconnect-ai.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Healthcare Blvd, Medical District, NY 10001</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
