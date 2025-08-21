'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  MessageCircle, 
  Send, 
  Loader2,
  AlertCircle,
  CheckCircle,
  User,
  Bot,
  Calendar,
  FileText,
  Heart,
  Thermometer,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface SymptomTag {
  id: string;
  name: string;
  selected: boolean;
}

export default function AIConsultationPage() {
  const [currentStep, setCurrentStep] = useState<'symptoms' | 'chat' | 'summary'>('symptoms');
  const [symptoms, setSymptoms] = useState<SymptomTag[]>([
    { id: '1', name: 'Fever', selected: false },
    { id: '2', name: 'Cough', selected: false },
    { id: '3', name: 'Headache', selected: false },
    { id: '4', name: 'Fatigue', selected: false },
    { id: '5', name: 'Nausea', selected: false },
    { id: '6', name: 'Chest Pain', selected: false },
    { id: '7', name: 'Shortness of Breath', selected: false },
    { id: '8', name: 'Dizziness', selected: false },
  ]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => prev.map(symptom => 
      symptom.id === id ? { ...symptom, selected: !symptom.selected } : symptom
    ));
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim()) {
      const newSymptom: SymptomTag = {
        id: Date.now().toString(),
        name: customSymptom.trim(),
        selected: true
      };
      setSymptoms(prev => [...prev, newSymptom]);
      setCustomSymptom('');
    }
  };

  const startConsultation = () => {
    const selectedSymptoms = symptoms.filter(s => s.selected);
    if (selectedSymptoms.length > 0) {
      setCurrentStep('chat');
      const initialMessage: Message = {
        id: '1',
        type: 'ai',
        content: `I understand you're experiencing: ${selectedSymptoms.map(s => s.name).join(', ')}. Let me ask you a few questions to better understand your condition. How long have you been experiencing these symptoms?`,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (userInput: string) => {
    const responses = [
      "Thank you for that information. Can you rate your pain level on a scale of 1-10?",
      "That's helpful. Have you taken any medications for these symptoms?",
      "I see. Have you experienced these symptoms before, or is this the first time?",
      "Based on your symptoms, I'd like to ask about any recent travel or exposure to illness.",
      "Let me provide you with a preliminary analysis based on our conversation."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const completeConsultation = () => {
    setCurrentStep('summary');
    setAnalysis({
      primaryDiagnosis: 'Upper Respiratory Tract Infection',
      confidence: 85,
      recommendations: [
        'Rest and adequate hydration',
        'Over-the-counter pain relievers if needed',
        'Monitor temperature regularly',
        'Seek medical attention if symptoms worsen'
      ],
      urgency: 'Low',
      followUp: 'recommended in 3-5 days if symptoms persist'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-purple-100 rounded-full">
                <Brain className="h-12 w-12 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Health Consultation</h1>
            <p className="text-xl text-gray-600">Get instant symptom analysis powered by advanced AI</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {['symptoms', 'chat', 'summary'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === step 
                    ? 'bg-purple-600 text-white' 
                    : index < ['symptoms', 'chat', 'summary'].indexOf(currentStep)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {index < ['symptoms', 'chat', 'summary'].indexOf(currentStep) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < 2 && (
                  <div className={`w-16 h-1 ${
                    index < ['symptoms', 'chat', 'summary'].indexOf(currentStep)
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms Selection Step */}
        {currentStep === 'symptoms' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-center">What symptoms are you experiencing?</CardTitle>
                <p className="text-center text-gray-600">Select all that apply or add your own</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Common Symptoms */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {symptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        symptom.selected
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {symptom.name}
                    </button>
                  ))}
                </div>

                {/* Add Custom Symptom */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a custom symptom..."
                    value={customSymptom}
                    onChange={(e) => setCustomSymptom(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
                  />
                  <Button onClick={addCustomSymptom} variant="outline">
                    Add
                  </Button>
                </div>

                {/* Continue Button */}
                <div className="text-center">
                  <Button
                    onClick={startConsultation}
                    disabled={!symptoms.some(s => s.selected)}
                    className="bg-purple-600 hover:bg-purple-700"
                    size="lg"
                  >
                    Start AI Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Chat Step */}
        {currentStep === 'chat' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  AI Consultation Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                          message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <div className={`p-2 rounded-full ${
                            message.type === 'user' ? 'bg-purple-600' : 'bg-gray-200'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-gray-600" />
                            )}
                          </div>
                          <div className={`p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            {message.content}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-full bg-gray-200">
                          <Bot className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="p-3 rounded-lg bg-gray-100">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Describe your symptoms in detail..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {messages.length >= 4 && (
                  <div className="mt-4 text-center">
                    <Button onClick={completeConsultation} className="bg-purple-600 hover:bg-purple-700">
                      Get Analysis
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Summary Step */}
        {currentStep === 'summary' && analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  AI Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Diagnosis */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Primary Assessment</h3>
                  <p className="text-blue-800">{analysis.primaryDiagnosis}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-blue-600">Confidence: {analysis.confidence}%</span>
                  </div>
                </div>

                {/* Urgency Level */}
                <div className={`p-4 rounded-lg ${
                  analysis.urgency === 'High' ? 'bg-red-50' :
                  analysis.urgency === 'Medium' ? 'bg-yellow-50' : 'bg-green-50'
                }`}>
                  <div className="flex items-center">
                    <AlertCircle className={`h-5 w-5 mr-2 ${
                      analysis.urgency === 'High' ? 'text-red-600' :
                      analysis.urgency === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`} />
                    <span className={`font-semibold ${
                      analysis.urgency === 'High' ? 'text-red-900' :
                      analysis.urgency === 'Medium' ? 'text-yellow-900' : 'text-green-900'
                    }`}>
                      {analysis.urgency} Urgency
                    </span>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Follow-up */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Follow-up</h3>
                  <p className="text-gray-700">{analysis.followUp}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 bg-medical-primary hover:bg-blue-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Doctor Appointment
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Save to Medical Records
                  </Button>
                </div>

                <div className="text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCurrentStep('symptoms');
                      setMessages([]);
                      setAnalysis(null);
                      setSymptoms(prev => prev.map(s => ({ ...s, selected: false })));
                    }}
                  >
                    Start New Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
