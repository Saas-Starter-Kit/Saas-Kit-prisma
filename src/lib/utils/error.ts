import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { AxiosError } from 'axios';
import Stripe from 'stripe';

export const handleError = (error: any) => {
  //general or custom error handler
  throw error;
};

export const StripeError = (err: Stripe.errors.StripeError) => {
  if (err) {
    console.log(err);
    throw err;
  }
};

export const SupabaseAuthError = (err: AuthError) => {
  if (err) {
    console.log(err);
    throw err;
  }
};

export const SupabaseDBError = (err: PostgrestError) => {
  if (err) {
    console.log(err);
    throw err;
  }
};

export const AxiosHandleError = (err: AxiosError) => {
  if (err) {
    console.log(err);
    throw err;
  }
};
