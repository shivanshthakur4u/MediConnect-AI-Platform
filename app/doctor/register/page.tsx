'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  FileText, 
  Heart,
  CheckCircle,
  Upload,
  Calendar,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DoctorRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Professional Information
    medicalLicense: '',
    specialty: '',
    subSpecialty: '',
    yearsOfExperience: '',
    currentHospital: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Education & Certifications
    medicalSchool: '',
    graduationYear: '',
    residency: '',
    fellowships: '',
    certifications: '',
    
    // Platform Settings
    consultationFee: '',
    availableHours: '',
    languages: '',
    biography: '',
    
    // Agreements
    termsAccepted: false,
    licenseVerification: false
  });

  const specialties = [
    'Cardiology', 'Dermatology', 'Emergency Medicine', 'Family Medicine',
    'Internal Medicine', 'Neurology', 'Obstetrics & Gynecology', 'Oncology',
    'Ophthalmology', 'Orthopedics', 'Pediatrics', 'Psychiatry',
    'Radiology', 'Surgery', 'Urology', 'Other'
  ];

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Professional', icon: Award },
    { number: 3, title: 'Location', icon: MapPin },
    { number: 4, title: 'Education', icon: FileText },
    { number: 5, title: 'Platform Setup', icon: Heart },
    { number: 6, title: 'Verification', icon: CheckCircle }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="p-3 bg-medical-primary rounded-xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">MediConnect AI</span>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Medical Network</h1>
            <p className="text-xl text-gray-600">Connect with patients worldwide and expand your practice</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    currentStep >= step.number
                      ? 'bg-medical-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-1 mx-4 ${
                      currentStep > step.number ? 'bg-medical-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <span key={step.number} className={`text-sm ${
                currentStep >= step.number ? 'text-medical-primary font-medium' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Professional Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Medical License Number *</label>
                      <Input
                        name="medicalLicense"
                        value={formData.medicalLicense}
                        onChange={handleInputChange}
                        placeholder="Enter license number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                      <Input
                        type="number"
                        name="yearsOfExperience"
                        value={formData.yearsOfExperience}
                        onChange={handleInputChange}
                        placeholder="5"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Specialty *</label>
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      >
                        <option value="">Select specialty</option>
                        {specialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sub-specialty</label>
                      <Input
                        name="subSpecialty"
                        value={formData.subSpecialty}
                        onChange={handleInputChange}
                        placeholder="e.g., Interventional Cardiology"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Hospital/Practice *</label>
                    <Input
                      name="currentHospital"
                      value={formData.currentHospital}
                      onChange={handleInputChange}
                      placeholder="Enter your current workplace"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Location */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State/Province *</label>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State/Province"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code *</label>
                      <Input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="ZIP/Postal Code"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Education */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Medical School *</label>
                      <Input
                        name="medicalSchool"
                        value={formData.medicalSchool}
                        onChange={handleInputChange}
                        placeholder="Name of medical school"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
                      <Input
                        type="number"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleInputChange}
                        placeholder="2010"
                        min="1950"
                        max={new Date().getFullYear()}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Residency *</label>
                    <Input
                      name="residency"
                      value={formData.residency}
                      onChange={handleInputChange}
                      placeholder="Residency program and institution"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fellowships</label>
                    <Input
                      name="fellowships"
                      value={formData.fellowships}
                      onChange={handleInputChange}
                      placeholder="Fellowship programs (if any)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Board Certifications *</label>
                    <textarea
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="List your board certifications"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Platform Setup */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee (USD) *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="number"
                          name="consultationFee"
                          value={formData.consultationFee}
                          onChange={handleInputChange}
                          className="pl-10"
                          placeholder="150"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken *</label>
                      <Input
                        name="languages"
                        value={formData.languages}
                        onChange={handleInputChange}
                        placeholder="English, Spanish, French"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Hours</label>
                    <Input
                      name="availableHours"
                      value={formData.availableHours}
                      onChange={handleInputChange}
                      placeholder="e.g., Mon-Fri 9AM-5PM EST"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Biography *</label>
                    <textarea
                      name="biography"
                      value={formData.biography}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Write a brief professional biography that patients will see..."
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 6: Verification */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Upload className="h-16 w-16 text-medical-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Document Upload</h3>
                    <p className="text-gray-600">Please upload the required documents for verification</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Medical License</p>
                      <p className="text-xs text-gray-500">Upload a clear copy of your medical license</p>
                      <Button variant="outline" className="mt-2">Choose File</Button>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Board Certifications</p>
                      <p className="text-xs text-gray-500">Upload certificates of your board certifications</p>
                      <Button variant="outline" className="mt-2">Choose File</Button>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <User className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Professional Photo</p>
                      <p className="text-xs text-gray-500">Upload a professional headshot</p>
                      <Button variant="outline" className="mt-2">Choose File</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="licenseVerification"
                        checked={formData.licenseVerification}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I authorize MediConnect AI to verify my medical license and credentials with the appropriate medical boards and institutions.
                      </span>
                    </label>
                    
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the{' '}
                        <Link href="/terms" className="text-medical-primary hover:underline">
                          Terms of Service
                        </Link>
                        ,{' '}
                        <Link href="/privacy" className="text-medical-primary hover:underline">
                          Privacy Policy
                        </Link>
                        , and{' '}
                        <Link href="/doctor/terms" className="text-medical-primary hover:underline">
                          Medical Professional Agreement
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 6 ? (
                <Button onClick={nextStep} className="bg-medical-primary hover:bg-blue-700">
                  Next
                </Button>
              ) : (
                <Button className="bg-medical-primary hover:bg-blue-700">
                  Submit Application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
