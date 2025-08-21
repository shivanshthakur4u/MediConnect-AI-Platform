import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createServerComponentClient({ cookies });

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      try {
        // Create appointment record
        const { error: appointmentError } = await supabase
          .from('appointments')
          .insert({
            patient_id: paymentIntent.metadata.patientId,
            doctor_id: paymentIntent.metadata.doctorId,
            appointment_date: paymentIntent.metadata.appointmentDate,
            appointment_time: paymentIntent.metadata.appointmentTime,
            type: paymentIntent.metadata.type as 'video' | 'phone' | 'chat',
            consultation_fee: paymentIntent.amount / 100,
            payment_status: 'paid',
            payment_intent_id: paymentIntent.id,
            status: 'scheduled',
          });

        if (appointmentError) {
          console.error('Failed to create appointment:', appointmentError);
        }

        // Send confirmation notifications
        await Promise.all([
          // Patient notification
          supabase.from('notifications').insert({
            user_id: paymentIntent.metadata.patientId,
            title: 'Appointment Confirmed',
            message: `Your appointment has been confirmed for ${paymentIntent.metadata.appointmentDate} at ${paymentIntent.metadata.appointmentTime}`,
            type: 'appointment',
          }),
          // Doctor notification
          supabase.from('notifications').insert({
            user_id: paymentIntent.metadata.doctorId,
            title: 'New Appointment',
            message: `You have a new appointment scheduled for ${paymentIntent.metadata.appointmentDate} at ${paymentIntent.metadata.appointmentTime}`,
            type: 'appointment',
          }),
        ]);

        console.log('Payment succeeded and appointment created');
      } catch (error) {
        console.error('Error processing successful payment:', error);
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      
      // Send failure notification
      await supabase.from('notifications').insert({
        user_id: failedPayment.metadata.patientId,
        title: 'Payment Failed',
        message: 'Your payment could not be processed. Please try again.',
        type: 'payment',
      });

      console.log('Payment failed');
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
