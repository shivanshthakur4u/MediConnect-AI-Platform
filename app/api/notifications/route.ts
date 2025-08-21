import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { emailService } from '@/lib/email-service';

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ notifications: data });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, recipientId, templateData } = await req.json();

    // Get recipient details
    const { data: recipient, error: recipientError } = await supabase
      .from('profiles')
      .select('*, users:user_id(*)')
      .eq('user_id', recipientId)
      .single();

    if (recipientError || !recipient) {
      return NextResponse.json({ error: 'Recipient not found' }, { status: 404 });
    }

    let emailSent = false;
    let notificationData: any = {};

    switch (type) {
      case 'appointment_confirmation':
        emailSent = await emailService.sendAppointmentConfirmation(
          recipient.users.email,
          templateData
        );
        notificationData = {
          user_id: recipientId,
          title: 'Appointment Confirmed',
          message: `Your appointment with ${templateData.doctorName} has been confirmed for ${templateData.appointmentDate} at ${templateData.appointmentTime}`,
          type: 'appointment',
          action_url: `/appointments/${templateData.appointmentId}`,
        };
        break;

      case 'appointment_reminder':
        emailSent = await emailService.sendAppointmentReminder(
          recipient.users.email,
          templateData
        );
        notificationData = {
          user_id: recipientId,
          title: 'Appointment Reminder',
          message: `Reminder: You have an appointment with ${templateData.doctorName} tomorrow at ${templateData.appointmentTime}`,
          type: 'reminder',
          action_url: `/appointments/${templateData.appointmentId}`,
        };
        break;

      case 'prescription':
        emailSent = await emailService.sendPrescription(
          recipient.users.email,
          templateData
        );
        notificationData = {
          user_id: recipientId,
          title: 'New Prescription',
          message: `Dr. ${templateData.doctorName} has sent you a new prescription`,
          type: 'result',
          action_url: '/medical-records',
        };
        break;

      default:
        return NextResponse.json({ error: 'Invalid notification type' }, { status: 400 });
    }

    // Create in-app notification
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert(notificationData);

    if (notificationError) {
      console.error('Failed to create notification:', notificationError);
    }

    return NextResponse.json({ 
      success: true, 
      emailSent,
      notificationCreated: !notificationError 
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { notificationId, read } = await req.json();

    const { data, error } = await supabase
      .from('notifications')
      .update({ read })
      .eq('id', notificationId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ notification: data });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
