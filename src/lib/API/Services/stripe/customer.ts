import stripe from '@/lib/API/Services/init/stripe';
import Stripe from 'stripe';
import { CustomerPropsT } from '@/lib/types/stripe';
import { StripeError } from '@/lib/utils/error';

export const RetrieveSubscription = async (
  subscription_id: string
): Promise<Stripe.Subscription> => {
  let subscription: Stripe.Subscription;

  try {
    subscription = await stripe.subscriptions.retrieve(subscription_id as string);
  } catch (err) {
    StripeError(err);
  }

  return subscription;
};

export const UpdateStripeCustomerEmail = async ({
  customer,
  email
}: CustomerPropsT): Promise<Stripe.Customer> => {
  let customerRes: Stripe.Customer;

  try {
    customerRes = await stripe.customers.update(customer, {
      email
    });
  } catch (err) {
    StripeError(err);
  }

  return customerRes;
};
