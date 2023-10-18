import stripe from '@/lib/API/Services/init/stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { WebhookEventHandler } from '@/lib/API/Services/stripe/webhook';
import type { NextRequest } from 'next/server';
import { StripeEvent } from '@/lib/types/stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = headers().get('Stripe-Signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) return;
  const event: StripeEvent = stripe.webhooks.constructEvent(body, sig, webhookSecret);

  try {
    await WebhookEventHandler(event);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
