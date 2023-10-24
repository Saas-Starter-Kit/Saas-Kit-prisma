import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { AxiosError } from 'axios';
import { LuciaError } from 'lucia';
import Stripe from 'stripe';
import { UseFormSetError } from 'react-hook-form';
import { authFormValues } from '../types/validations';

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

export const AuthFormError = (err: LuciaError, setError: UseFormSetError<authFormValues>) => {
  if (err instanceof LuciaError && err.message === `AUTH_DUPLICATE_KEY_ID`) {
    setError('email', {
      type: '"root.serverError',
      message: 'User Already Exists, Please Login'
    });
    setError('password', { type: 'root.serverError', message: '' });

    throw err;
  }

  if (err instanceof LuciaError && err.message === `AUTH_INVALID_USER_ID`) {
    setError('email', {
      type: '"root.serverError',
      message: 'User not Found'
    });
    setError('password', { type: 'root.serverError', message: '' });

    throw err;
  }

  if (
    err instanceof LuciaError &&
    (err.message === 'AUTH_INVALID_PASSWORD' || err.message === 'AUTH_INVALID_KEY_ID')
  ) {
    setError('email', {
      type: '"root.serverError',
      message: 'Incorrect email or password'
    });
    setError('password', { type: 'root.serverError', message: '' });

    throw err;
  }

  setError('email', {
    type: '"root.serverError',
    message: 'Something Went Wrong'
  });
  setError('password', { type: 'root.serverError', message: '' });
  throw err;
};

export const LuciaAuthError = (err: LuciaError) => {
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
