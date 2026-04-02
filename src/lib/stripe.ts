import Stripe from 'stripe';

// Server-side Stripe client — instantiate lazily to avoid build-time errors
let _stripe: Stripe | null = null;
export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}
/** @deprecated Use getStripe() instead */
export const stripe = { get instance() { return getStripe(); } } as unknown as Stripe;

export const STRIPE_PRICES = {
  starter: {
    monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID!,
    yearly: process.env.STRIPE_STARTER_YEARLY_PRICE_ID!,
  },
  elite: {
    monthly: process.env.STRIPE_ELITE_MONTHLY_PRICE_ID!,
    yearly: process.env.STRIPE_ELITE_YEARLY_PRICE_ID!,
  },
} as const;

export async function createCheckoutSession({
  customerId,
  priceId,
  restaurantId,
  successUrl,
  cancelUrl,
}: {
  customerId?: string;
  priceId: string;
  restaurantId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { restaurantId },
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    subscription_data: {
      trial_period_days: 14,
      metadata: { restaurantId },
    },
  });
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}
