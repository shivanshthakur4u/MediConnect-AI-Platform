import { AIAnalysis } from '../types';

export class AIConsultationService {
  private static symptoms = [
    'fever', 'headache', 'cough', 'sore throat', 'fatigue', 'nausea', 'vomiting',
    'diarrhea', 'chest pain', 'shortness of breath', 'dizziness', 'joint pain',
    'muscle aches', 'skin rash', 'abdominal pain', 'back pain'
  ];

  private static specialties = [
    'General Practice', 'Cardiology', 'Dermatology', 'Neurology', 'Gastroenterology',
    'Orthopedics', 'Psychiatry', 'Pediatrics', 'Gynecology', 'Ophthalmology'
  ];

  static async analyzeSymptoms(symptoms: string[], additionalInfo: string): Promise<AIAnalysis> {
    // Simulate AI analysis with sophisticated logic
    await new Promise(resolve => setTimeout(resolve, 2000));

    const riskFactors = this.calculateRiskFactors(symptoms, additionalInfo);
    const suggestedSpecialty = this.determineSuggestedSpecialty(symptoms);
    const preliminaryDiagnosis = this.generatePreliminaryDiagnosis(symptoms);
    
    return {
      riskLevel: riskFactors.riskLevel,
      suggestedSpecialty,
      preliminaryDiagnosis,
      recommendedActions: riskFactors.actions,
      urgencyScore: riskFactors.urgencyScore
    };
  }

  private static calculateRiskFactors(symptoms: string[], additionalInfo: string) {
    const criticalSymptoms = ['chest pain', 'shortness of breath', 'severe headache'];
    const highRiskSymptoms = ['fever', 'vomiting', 'dizziness'];
    
    const hasCritical = symptoms.some(s => criticalSymptoms.some(cs => s.toLowerCase().includes(cs)));
    const hasHighRisk = symptoms.some(s => highRiskSymptoms.some(hrs => s.toLowerCase().includes(hrs)));
    
    let urgencyScore = symptoms.length * 10;
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    let actions: string[] = ['Monitor symptoms', 'Stay hydrated', 'Rest adequately'];

    if (hasCritical) {
      urgencyScore += 40;
      riskLevel = 'critical';
      actions = ['Seek immediate medical attention', 'Contact emergency services if severe', 'Do not delay consultation'];
    } else if (hasHighRisk) {
      urgencyScore += 25;
      riskLevel = 'high';
      actions = ['Schedule consultation within 24 hours', 'Monitor symptoms closely', 'Avoid strenuous activities'];
    } else if (symptoms.length > 3) {
      urgencyScore += 15;
      riskLevel = 'medium';
      actions = ['Schedule consultation within 2-3 days', 'Track symptom progression', 'Maintain healthy habits'];
    }

    return { riskLevel, urgencyScore: Math.min(urgencyScore, 100), actions };
  }

  private static determineSuggestedSpecialty(symptoms: string[]): string {
    const specialtyKeywords = {
      'Cardiology': ['chest pain', 'heart', 'palpitations', 'shortness of breath'],
      'Dermatology': ['rash', 'skin', 'itching', 'acne'],
      'Neurology': ['headache', 'dizziness', 'seizure', 'numbness'],
      'Gastroenterology': ['nausea', 'vomiting', 'diarrhea', 'abdominal pain'],
      'Orthopedics': ['joint pain', 'back pain', 'muscle aches', 'injury'],
      'Psychiatry': ['anxiety', 'depression', 'sleep', 'stress'],
      'General Practice': []
    };

    for (const [specialty, keywords] of Object.entries(specialtyKeywords)) {
      if (keywords.some(keyword => 
        symptoms.some(symptom => symptom.toLowerCase().includes(keyword))
      )) {
        return specialty;
      }
    }

    return 'General Practice';
  }

  private static generatePreliminaryDiagnosis(symptoms: string[]): string {
    const commonCombinations = [
      { symptoms: ['fever', 'cough', 'sore throat'], diagnosis: 'Possible upper respiratory infection' },
      { symptoms: ['headache', 'fatigue', 'muscle aches'], diagnosis: 'Possible viral syndrome' },
      { symptoms: ['nausea', 'vomiting', 'diarrhea'], diagnosis: 'Possible gastroenteritis' },
      { symptoms: ['chest pain', 'shortness of breath'], diagnosis: 'Requires immediate cardiovascular evaluation' },
      { symptoms: ['joint pain', 'muscle aches'], diagnosis: 'Possible inflammatory or rheumatic condition' }
    ];

    for (const combo of commonCombinations) {
      const matchCount = combo.symptoms.filter(s => 
        symptoms.some(symptom => symptom.toLowerCase().includes(s))
      ).length;
      
      if (matchCount >= 2) {
        return combo.diagnosis;
      }
    }

    return `Symptoms suggest a need for professional medical evaluation. Based on ${symptoms.length} reported symptoms, a comprehensive consultation is recommended.`;
  }

  static async getChatbotResponse(message: string): Promise<string> {
    // Simulate AI chatbot response
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = [
      "I understand your concern. Can you provide more details about when these symptoms started?",
      "Based on what you've described, I'd recommend consulting with a specialist. Would you like me to help you find available doctors?",
      "That sounds concerning. How long have you been experiencing these symptoms?",
      "Thank you for sharing that information. Have you taken any medications or tried any treatments so far?",
      "I'd suggest booking a consultation with one of our doctors for a proper evaluation. Shall I help you schedule an appointment?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}