import Stripe from 'stripe';

export const StripeError = (err: Stripe.errors.StripeError) => {
  if (err) {
    console.log(err);
    throw err;
  }
};

export const PrismaDBError = (err: Error) => {
  if (err) {
    console.log(err);
    throw err;
  }
};

export const AuthError = (err: Error) => {
  if (err) {
    console.log(err);
    throw err;
  }
};

export const StripeWebhookError = (err: Error) => {
  if (err) {
    console.log(err);
    throw err;
  }
};
