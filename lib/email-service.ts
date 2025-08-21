import nodemailer from 'nodemailer';

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailData {
  to: string;
  from?: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        from: emailData.from || process.env.FROM_EMAIL || 'noreply@mediconnect-ai.com',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text || emailData.html.replace(/<[^>]*>/g, ''),
      });

      console.log('Email sent: %s', info.messageId);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  // Email Templates
  getAppointmentConfirmationTemplate(data: {
    patientName: string;
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
    appointmentType: string;
    joinUrl?: string;
  }): EmailTemplate {
    const subject = 'Appointment Confirmation - MediConnect AI';
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Appointment Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>MediConnect AI</h1>
            <h2>Appointment Confirmed</h2>
          </div>
          
          <div class="content">
            <p>Dear ${data.patientName},</p>
            
            <p>Your appointment has been confirmed. Here are the details:</p>
            
            <div class="appointment-details">
              <h3>Appointment Details</h3>
              <p><strong>Doctor:</strong> ${data.doctorName}</p>
              <p><strong>Date:</strong> ${data.appointmentDate}</p>
              <p><strong>Time:</strong> ${data.appointmentTime}</p>
              <p><strong>Type:</strong> ${data.appointmentType}</p>
            </div>
            
            ${data.joinUrl ? `
              <p>For video consultations, please join using the link below:</p>
              <p style="text-align: center;">
                <a href="${data.joinUrl}" class="button">Join Video Consultation</a>
              </p>
            ` : ''}
            
            <p>Please be ready 5 minutes before your scheduled time. If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
            
            <p>Best regards,<br>The MediConnect AI Team</p>
          </div>
          
          <div class="footer">
            <p>MediConnect AI | 123 Healthcare Blvd, Medical District, NY 10001</p>
            <p>If you have any questions, contact us at support@mediconnect-ai.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Appointment Confirmation - MediConnect AI
      
      Dear ${data.patientName},
      
      Your appointment has been confirmed:
      
      Doctor: ${data.doctorName}
      Date: ${data.appointmentDate}
      Time: ${data.appointmentTime}
      Type: ${data.appointmentType}
      
      ${data.joinUrl ? `Join URL: ${data.joinUrl}` : ''}
      
      Please be ready 5 minutes before your scheduled time.
      
      Best regards,
      The MediConnect AI Team
    `;

    return { subject, html, text };
  }

  getAppointmentReminderTemplate(data: {
    patientName: string;
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
    joinUrl?: string;
  }): EmailTemplate {
    const subject = 'Appointment Reminder - Tomorrow at ' + data.appointmentTime;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Appointment Reminder</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .reminder-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>MediConnect AI</h1>
            <h2>Appointment Reminder</h2>
          </div>
          
          <div class="content">
            <div class="reminder-box">
              <h3>⏰ Reminder: Your appointment is tomorrow!</h3>
            </div>
            
            <p>Dear ${data.patientName},</p>
            
            <p>This is a friendly reminder about your upcoming appointment:</p>
            
            <ul>
              <li><strong>Doctor:</strong> ${data.doctorName}</li>
              <li><strong>Date:</strong> ${data.appointmentDate}</li>
              <li><strong>Time:</strong> ${data.appointmentTime}</li>
            </ul>
            
            ${data.joinUrl ? `
              <p style="text-align: center;">
                <a href="${data.joinUrl}" class="button">Join Video Consultation</a>
              </p>
            ` : ''}
            
            <p>Please prepare any questions or concerns you'd like to discuss with your doctor.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Appointment Reminder - MediConnect AI
      
      Dear ${data.patientName},
      
      Reminder: Your appointment is tomorrow!
      
      Doctor: ${data.doctorName}
      Date: ${data.appointmentDate}
      Time: ${data.appointmentTime}
      
      ${data.joinUrl ? `Join URL: ${data.joinUrl}` : ''}
      
      Please be prepared for your consultation.
    `;

    return { subject, html, text };
  }

  getPrescriptionTemplate(data: {
    patientName: string;
    doctorName: string;
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }>;
  }): EmailTemplate {
    const subject = 'Digital Prescription - MediConnect AI';
    
    const medicationsList = data.medications.map(med => `
      <li>
        <strong>${med.name}</strong><br>
        Dosage: ${med.dosage}<br>
        Frequency: ${med.frequency}<br>
        Duration: ${med.duration}
      </li>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Digital Prescription</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .prescription { background: white; border: 2px solid #2563eb; padding: 20px; margin: 20px 0; }
          .medication { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>MediConnect AI</h1>
            <h2>Digital Prescription</h2>
          </div>
          
          <div class="prescription">
            <h3>Prescription for ${data.patientName}</h3>
            <p><strong>Prescribed by:</strong> ${data.doctorName}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            
            <h4>Medications:</h4>
            <ul class="medication">
              ${medicationsList}
            </ul>
            
            <p><em>Please follow the dosage instructions carefully. Contact your doctor if you experience any side effects.</em></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const medicationsText = data.medications.map(med => 
      `${med.name} - ${med.dosage}, ${med.frequency}, for ${med.duration}`
    ).join('\n');

    const text = `
      Digital Prescription - MediConnect AI
      
      Prescription for ${data.patientName}
      Prescribed by: ${data.doctorName}
      Date: ${new Date().toLocaleDateString()}
      
      Medications:
      ${medicationsText}
      
      Please follow dosage instructions carefully.
    `;

    return { subject, html, text };
  }

  // Send specific email types
  async sendAppointmentConfirmation(to: string, data: Parameters<typeof this.getAppointmentConfirmationTemplate>[0]) {
    const template = this.getAppointmentConfirmationTemplate(data);
    return this.sendEmail({ to, ...template });
  }

  async sendAppointmentReminder(to: string, data: Parameters<typeof this.getAppointmentReminderTemplate>[0]) {
    const template = this.getAppointmentReminderTemplate(data);
    return this.sendEmail({ to, ...template });
  }

  async sendPrescription(to: string, data: Parameters<typeof this.getPrescriptionTemplate>[0]) {
    const template = this.getPrescriptionTemplate(data);
    return this.sendEmail({ to, ...template });
  }
}

export const emailService = new EmailService();
