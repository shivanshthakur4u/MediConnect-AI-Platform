'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  Calendar,
  User,
  Pill,
  Activity,
  Heart,
  Upload,
  Eye,
  Share
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const records = [
    {
      id: '1',
      type: 'consultation',
      title: 'Cardiology Consultation',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-01-20',
      category: 'Consultation',
      summary: 'Regular cardiac checkup with ECG',
      files: ['ecg_report.pdf', 'consultation_notes.pdf']
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Blood Pressure Medication',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-01-20',
      category: 'Prescription',
      summary: 'Lisinopril 10mg daily for hypertension',
      files: ['prescription.pdf']
    },
    {
      id: '3',
      type: 'lab',
      title: 'Complete Blood Panel',
      doctor: 'Lab Corp',
      date: '2024-01-15',
      category: 'Lab Results',
      summary: 'Comprehensive metabolic panel and CBC',
      files: ['blood_panel_results.pdf']
    },
    {
      id: '4',
      type: 'imaging',
      title: 'Chest X-Ray',
      doctor: 'Radiology Associates',
      date: '2024-01-10',
      category: 'Imaging',
      summary: 'Routine chest imaging - normal findings',
      files: ['chest_xray.pdf', 'radiology_report.pdf']
    }
  ];

  const categories = ['all', 'Consultation', 'Prescription', 'Lab Results', 'Imaging', 'Vaccination'];

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'consultation': return User;
      case 'prescription': return Pill;
      case 'lab': return Activity;
      case 'imaging': return Heart;
      default: return FileText;
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || record.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Medical Records</h1>
              <p className="text-xl text-gray-600">Access and manage your complete health history</p>
            </div>
            <Button className="bg-medical-primary hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Record
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search records, doctors, or procedures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredRecords.map((record, index) => {
            const Icon = getRecordIcon(record.type);
            return (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="p-3 bg-medical-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-medical-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              {record.category}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{record.summary}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{record.doctor}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{record.date}</span>
                            </div>
                          </div>
                          {record.files.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                              <div className="flex flex-wrap gap-2">
                                {record.files.map((file, idx) => (
                                  <div key={idx} className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-700">{file}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No records found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
