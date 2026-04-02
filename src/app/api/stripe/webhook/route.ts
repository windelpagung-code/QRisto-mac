import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import type Stripe from 'stripe';

// Force dynamic — API route must not be statically pre-rendered
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { default: StripeLib } = await import('stripe');
  const stripe = new StripeLib(process.env.STRIPE_SECRET_KEY!);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature error:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case 'checkout.session.completed': {
      const restaurantId = session.metadata?.restaurantId;
      console.log(`✅ Checkout completed for restaurant ${restaurantId}`);
      // TODO: Update restaurant in Supabase after connecting auth
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`🔄 Subscription updated: ${subscription.status}`);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`❌ Subscription canceled: ${subscription.id}`);
      break;
    }
    case 'invoice.payment_failed': {
      console.log('⚠️ Payment failed');
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
