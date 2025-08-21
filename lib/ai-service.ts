import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true, // Only for demo - use server-side in production
});

export interface AIAnalysis {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  suggestedSpecialty: string;
  preliminaryDiagnosis: string;
  recommendedActions: string[];
  urgencyScore: number;
  confidence: number;
  followUpQuestions: string[];
}

export interface DoctorMatch {
  doctorId: string;
  matchScore: number;
  reasoning: string;
}

export class AIHealthService {
  private static readonly MEDICAL_SPECIALTIES = [
    'General Practice',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Gastroenterology',
    'Orthopedics',
    'Psychiatry',
    'Pediatrics',
    'Gynecology',
    'Ophthalmology',
    'Endocrinology',
    'Pulmonology',
    'Rheumatology',
    'Urology',
    'Oncology',
  ];

  private static readonly SYMPTOM_ANALYSIS_PROMPT = `
    You are a medical AI assistant designed to analyze symptoms and provide preliminary assessments.
    Your role is to:
    1. Analyze the provided symptoms
    2. Assess risk level (low, medium, high, critical)
    3. Suggest appropriate medical specialty
    4. Provide preliminary diagnosis possibilities
    5. Recommend immediate actions
    6. Generate follow-up questions

    IMPORTANT DISCLAIMERS:
    - This is not a substitute for professional medical advice
    - Always recommend consulting with a healthcare provider
    - For critical symptoms, always recommend immediate medical attention
    - Be conservative in risk assessment - err on the side of caution

    Please respond in JSON format with the following structure:
    {
      "riskLevel": "low|medium|high|critical",
      "suggestedSpecialty": "specialty name",
      "preliminaryDiagnosis": "detailed assessment",
      "recommendedActions": ["action1", "action2", ...],
      "urgencyScore": 1-100,
      "confidence": 1-100,
      "followUpQuestions": ["question1", "question2", ...]
    }
  `;

  static async analyzeSymptoms(
    symptoms: string[],
    additionalInfo: string = '',
    patientAge?: number,
    patientGender?: string,
    medicalHistory?: string[]
  ): Promise<AIAnalysis> {
    try {
      const prompt = `
        ${this.SYMPTOM_ANALYSIS_PROMPT}
        
        Patient Information:
        - Symptoms: ${symptoms.join(', ')}
        - Additional Information: ${additionalInfo}
        - Age: ${patientAge || 'Not provided'}
        - Gender: ${patientGender || 'Not provided'}
        - Medical History: ${medicalHistory?.join(', ') || 'Not provided'}
        
        Please analyze these symptoms and provide a comprehensive assessment.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a medical AI assistant specializing in symptom analysis and preliminary diagnosis.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from AI service');
      }

      // Parse JSON response
      const analysis = JSON.parse(content) as AIAnalysis;
      
      // Validate and sanitize response
      return this.validateAnalysis(analysis);
    } catch (error) {
      console.error('AI Analysis Error:', error);
      // Return fallback analysis
      return this.getFallbackAnalysis(symptoms);
    }
  }

  static async matchDoctors(
    symptoms: string[],
    aiAnalysis: AIAnalysis,
    availableDoctors: any[]
  ): Promise<DoctorMatch[]> {
    try {
      const prompt = `
        Based on the following symptoms and AI analysis, rank the provided doctors by their suitability for this case.
        
        Symptoms: ${symptoms.join(', ')}
        Suggested Specialty: ${aiAnalysis.suggestedSpecialty}
        Risk Level: ${aiAnalysis.riskLevel}
        
        Available Doctors:
        ${availableDoctors.map(doc => `
          ID: ${doc.id}
          Name: ${doc.full_name}
          Specialties: ${doc.specialties?.join(', ') || 'General Practice'}
          Experience: ${doc.experience_years} years
          Languages: ${doc.languages?.join(', ') || 'English'}
        `).join('\n')}
        
        Please respond with a JSON array of doctor matches, ranked by suitability:
        [
          {
            "doctorId": "doctor_id",
            "matchScore": 1-100,
            "reasoning": "explanation for the match"
          }
        ]
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a medical AI assistant specializing in doctor-patient matching.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 800,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from AI service');
      }

      return JSON.parse(content) as DoctorMatch[];
    } catch (error) {
      console.error('Doctor Matching Error:', error);
      // Return fallback matching based on specialty
      return this.getFallbackDoctorMatching(aiAnalysis, availableDoctors);
    }
  }

  static async generateChatResponse(
    message: string,
    context: {
      symptoms?: string[];
      medicalHistory?: string[];
      currentMedications?: string[];
    }
  ): Promise<string> {
    try {
      const prompt = `
        You are a helpful medical AI assistant. Respond to the patient's question or concern.
        
        Context:
        - Current symptoms: ${context.symptoms?.join(', ') || 'None provided'}
        - Medical history: ${context.medicalHistory?.join(', ') || 'None provided'}
        - Current medications: ${context.currentMedications?.join(', ') || 'None provided'}
        
        Patient message: ${message}
        
        Guidelines:
        - Be empathetic and supportive
        - Provide helpful information without diagnosing
        - Always recommend consulting with a healthcare provider for medical concerns
        - Ask clarifying questions when appropriate
        - Keep responses concise but informative
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a compassionate medical AI assistant helping patients with their health concerns.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      return response.choices[0]?.message?.content || 'I apologize, but I\'m having trouble processing your request right now. Please try again or consult with a healthcare provider.';
    } catch (error) {
      console.error('Chat Response Error:', error);
      return 'I apologize, but I\'m having trouble processing your request right now. Please try again or consult with a healthcare provider.';
    }
  }

  static async generatePrescriptionSummary(
    prescription: any[],
    patientInfo: any
  ): Promise<string> {
    try {
      const prompt = `
        Generate a clear, patient-friendly summary of the following prescription:
        
        Patient: ${patientInfo.full_name}
        Age: ${patientInfo.age || 'Not provided'}
        
        Medications:
        ${prescription.map(med => `
          - ${med.medication_name} ${med.dosage}
          - Frequency: ${med.frequency}
          - Duration: ${med.duration}
          - Instructions: ${med.instructions}
        `).join('\n')}
        
        Please provide:
        1. A brief summary of what these medications are for
        2. Important reminders about taking them
        3. Any general precautions
        
        Keep it clear and easy to understand for the patient.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a medical AI assistant helping patients understand their prescriptions.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 400,
      });

      return response.choices[0]?.message?.content || 'Please consult with your healthcare provider about your prescription.';
    } catch (error) {
      console.error('Prescription Summary Error:', error);
      return 'Please consult with your healthcare provider about your prescription.';
    }
  }

  private static validateAnalysis(analysis: AIAnalysis): AIAnalysis {
    // Ensure all required fields are present and valid
    return {
      riskLevel: ['low', 'medium', 'high', 'critical'].includes(analysis.riskLevel) 
        ? analysis.riskLevel 
        : 'medium',
      suggestedSpecialty: this.MEDICAL_SPECIALTIES.includes(analysis.suggestedSpecialty)
        ? analysis.suggestedSpecialty
        : 'General Practice',
      preliminaryDiagnosis: analysis.preliminaryDiagnosis || 'Further evaluation needed',
      recommendedActions: Array.isArray(analysis.recommendedActions) 
        ? analysis.recommendedActions 
        : ['Consult with a healthcare provider'],
      urgencyScore: Math.min(Math.max(analysis.urgencyScore || 50, 1), 100),
      confidence: Math.min(Math.max(analysis.confidence || 70, 1), 100),
      followUpQuestions: Array.isArray(analysis.followUpQuestions)
        ? analysis.followUpQuestions
        : [],
    };
  }

  private static getFallbackAnalysis(symptoms: string[]): AIAnalysis {
    // Simple rule-based fallback
    const criticalSymptoms = ['chest pain', 'difficulty breathing', 'severe headache', 'loss of consciousness'];
    const hasCritical = symptoms.some(s => 
      criticalSymptoms.some(cs => s.toLowerCase().includes(cs.toLowerCase()))
    );

    return {
      riskLevel: hasCritical ? 'critical' : symptoms.length > 3 ? 'medium' : 'low',
      suggestedSpecialty: 'General Practice',
      preliminaryDiagnosis: 'Multiple symptoms reported. Professional medical evaluation recommended.',
      recommendedActions: hasCritical 
        ? ['Seek immediate medical attention', 'Contact emergency services if severe']
        : ['Schedule consultation with healthcare provider', 'Monitor symptoms'],
      urgencyScore: hasCritical ? 90 : symptoms.length * 15,
      confidence: 60,
      followUpQuestions: [
        'How long have you been experiencing these symptoms?',
        'Have you taken any medications for these symptoms?',
        'Do you have any relevant medical history?'
      ],
    };
  }

  private static getFallbackDoctorMatching(
    aiAnalysis: AIAnalysis,
    availableDoctors: any[]
  ): DoctorMatch[] {
    return availableDoctors
      .map(doctor => {
        let score = 50; // Base score
        
        // Match specialty
        if (doctor.specialties?.includes(aiAnalysis.suggestedSpecialty)) {
          score += 30;
        }
        
        // Experience bonus
        if (doctor.experience_years > 10) {
          score += 10;
        } else if (doctor.experience_years > 5) {
          score += 5;
        }
        
        // Verification bonus
        if (doctor.verified) {
          score += 10;
        }
        
        return {
          doctorId: doctor.id,
          matchScore: Math.min(score, 100),
          reasoning: `Matched based on specialty and experience. ${doctor.specialties?.includes(aiAnalysis.suggestedSpecialty) ? 'Specialty match found.' : 'General practice suitable for initial consultation.'}`
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }
}

// Utility functions for medical data processing
export class MedicalDataProcessor {
  static formatSymptoms(symptoms: string[]): string {
    return symptoms
      .map(symptom => symptom.trim().toLowerCase())
      .filter(symptom => symptom.length > 0)
      .join(', ');
  }

  static categorizeSymptoms(symptoms: string[]): {
    category: string;
    symptoms: string[];
  }[] {
    const categories = {
      'Respiratory': ['cough', 'shortness of breath', 'chest pain', 'wheezing'],
      'Gastrointestinal': ['nausea', 'vomiting', 'diarrhea', 'abdominal pain', 'constipation'],
      'Neurological': ['headache', 'dizziness', 'confusion', 'seizure', 'numbness'],
      'Cardiovascular': ['chest pain', 'palpitations', 'swelling', 'fatigue'],
      'Musculoskeletal': ['joint pain', 'muscle aches', 'back pain', 'stiffness'],
      'Dermatological': ['rash', 'itching', 'swelling', 'discoloration'],
      'General': ['fever', 'fatigue', 'weight loss', 'weight gain', 'sleep issues'],
    };

    const categorized: { category: string; symptoms: string[] }[] = [];

    Object.entries(categories).forEach(([category, keywords]) => {
      const matchedSymptoms = symptoms.filter(symptom =>
        keywords.some(keyword => 
          symptom.toLowerCase().includes(keyword.toLowerCase())
        )
      );

      if (matchedSymptoms.length > 0) {
        categorized.push({ category, symptoms: matchedSymptoms });
      }
    });

    // Add uncategorized symptoms
    const categorizedSymptoms = categorized.flatMap(c => c.symptoms);
    const uncategorized = symptoms.filter(s => !categorizedSymptoms.includes(s));
    
    if (uncategorized.length > 0) {
      categorized.push({ category: 'Other', symptoms: uncategorized });
    }

    return categorized;
  }

  static calculateHealthScore(
    consultations: any[],
    medicalHistory: any[],
    currentSymptoms: string[]
  ): {
    score: number;
    factors: string[];
    recommendations: string[];
  } {
    let score = 100;
    const factors: string[] = [];
    const recommendations: string[] = [];

    // Recent consultations impact
    const recentConsultations = consultations.filter(c => {
      const consultationDate = new Date(c.appointment_date);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return consultationDate > threeMonthsAgo;
    });

    if (recentConsultations.length > 3) {
      score -= 15;
      factors.push('Frequent recent consultations');
      recommendations.push('Consider preventive care measures');
    }

    // Current symptoms impact
    if (currentSymptoms.length > 0) {
      score -= currentSymptoms.length * 5;
      factors.push(`${currentSymptoms.length} active symptoms`);
      recommendations.push('Address current symptoms with healthcare provider');
    }

    // Medical history impact
    const chronicConditions = medicalHistory.filter(h => 
      h.record_type === 'consultation' && 
      h.description?.toLowerCase().includes('chronic')
    );

    if (chronicConditions.length > 0) {
      score -= chronicConditions.length * 10;
      factors.push(`${chronicConditions.length} chronic conditions`);
      recommendations.push('Maintain regular follow-ups for chronic conditions');
    }

    // Ensure score is within bounds
    score = Math.max(Math.min(score, 100), 0);

    return {
      score,
      factors,
      recommendations,
    };
  }
}