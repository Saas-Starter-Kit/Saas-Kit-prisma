import 'server-only';
import stripe from '@/lib/API/Services/init/stripe';
import config from '@/lib/config/auth';
import { PortalSessionT, CreatePortalSessionPropsT } from '@/lib/types/stripe';
import Stripe from 'stripe';
import { CreateCheckoutSessionPropsT } from '@/lib/types/stripe';
import { StripeError } from '@/lib/utils/error';

export const createCheckoutSession = async ({
  price,
  customer_email,
  user_id,
  origin
}: CreateCheckoutSessionPropsT) => {
  const { redirects } = config;
  const { toBilling, toSubscription } = redirects;

  let session: Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${origin}${toBilling}`,
      cancel_url: `${origin}${toSubscription}`,
      metadata: {
        user_id
      },
      customer_email,
      subscription_data: {
        trial_period_days: 14
      }
    });
  } catch (err) {
    StripeError(err);
  }

  return session;
};

export const createPortalSession = async ({
  customer,
  origin
}: CreatePortalSessionPropsT): Promise<PortalSessionT> => {
  let portalSession: PortalSessionT;

  try {
    portalSession = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${origin}${config.redirects.toSubscription}`
    });
  } catch (err) {
    StripeError(err);
  }

  return portalSession;
};
