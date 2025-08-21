import React, { useState } from 'react';
import { Bot, Send, Loader, AlertTriangle, CheckCircle, Clock, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AIConsultationService } from '../../lib/ai-service';
import { AIAnalysis } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface AIConsultationProps {
  onBookDoctor: (specialty: string) => void;
}

export function AIConsultation({ onBookDoctor }: AIConsultationProps) {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'ai'}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isChatMode, setIsChatMode] = useState(false);

  const addSymptom = () => {
    if (currentSymptom.trim() && !symptoms.includes(currentSymptom.trim())) {
      setSymptoms([...symptoms, currentSymptom.trim()]);
      setCurrentSymptom('');
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const analyzeSymptoms = async () => {
    if (symptoms.length === 0) return;
    
    setIsAnalyzing(true);
    try {
      const result = await AIConsultationService.analyzeSymptoms(symptoms, additionalInfo);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sendChatMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = { id: Date.now().toString(), text: currentMessage, sender: 'user' as const };
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');

    try {
      const response = await AIConsultationService.getChatbotResponse(currentMessage);
      const aiMessage = { id: (Date.now() + 1).toString(), text: response, sender: 'ai' as const };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat failed:', error);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Bot className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">AI Health Consultation</h1>
        <p className="text-gray-600 mt-2">Describe your symptoms for instant AI analysis and recommendations</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Symptom Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Symptoms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2">
              <Input
                value={currentSymptom}
                onChange={(e) => setCurrentSymptom(e.target.value)}
                placeholder="Enter a symptom..."
                onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
              />
              <Button onClick={addSymptom}>Add</Button>
            </div>

            {symptoms.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Current Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom) => (
                    <motion.span
                      key={symptom}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {symptom}
                      <button onClick={() => removeSymptom(symptom)} className="ml-1 hover:text-blue-900">
                        ×
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information (Optional)
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Any additional details about your symptoms, duration, severity, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <Button 
              onClick={analyzeSymptoms} 
              disabled={symptoms.length === 0 || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                'Analyze Symptoms'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Analysis Results */}
        <div className="space-y-6">
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>AI Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Risk Level:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(analysis.riskLevel)}`}>
                        {analysis.riskLevel.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Suggested Specialty:</h4>
                      <p className="text-blue-600 font-medium">{analysis.suggestedSpecialty}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Preliminary Assessment:</h4>
                      <p className="text-gray-700">{analysis.preliminaryDiagnosis}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recommended Actions:</h4>
                      <ul className="space-y-1">
                        {analysis.recommendedActions.map((action, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      onClick={() => onBookDoctor(analysis.suggestedSpecialty)}
                      className="w-full"
                    >
                      Book {analysis.suggestedSpecialty} Doctor
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Chat Interface */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Chat with AI Assistant</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsChatMode(!isChatMode)}
                >
                  {isChatMode ? 'Hide Chat' : 'Start Chat'}
                </Button>
              </div>
            </CardHeader>
            {isChatMode && (
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
                    {chatMessages.length === 0 ? (
                      <p className="text-gray-500 text-center">Start a conversation with our AI assistant</p>
                    ) : (
                      chatMessages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs px-3 py-2 rounded-lg ${
                            message.sender === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <div className="flex items-center gap-1 mb-1">
                              {message.sender === 'user' ? (
                                <User className="h-3 w-3" />
                              ) : (
                                <Bot className="h-3 w-3" />
                              )}
                              <span className="text-xs opacity-75">
                                {message.sender === 'user' ? 'You' : 'AI Assistant'}
                              </span>
                            </div>
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Ask about your symptoms..."
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    />
                    <Button onClick={sendChatMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}