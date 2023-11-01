import Stripe from 'stripe';
import { UseFormSetError } from 'react-hook-form';
import { EmailFormValues } from '../types/validations';

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

export const AuthFormError = (err: Error, setError: UseFormSetError<EmailFormValues>) => {
  if (err instanceof Error && err.message === `AUTH_DUPLICATE_KEY_ID`) {
    setError('email', {
      type: '"root.serverError',
      message: 'User Already Exists, Please Login'
    });

    throw err;
  }

  if (err instanceof Error && err.message === `AUTH_INVALID_USER_ID`) {
    setError('email', {
      type: '"root.serverError',
      message: 'User not Found'
    });

    throw err;
  }

  if (
    err instanceof Error &&
    (err.message === 'AUTH_INVALID_PASSWORD' || err.message === 'AUTH_INVALID_KEY_ID')
  ) {
    setError('email', {
      type: '"root.serverError',
      message: 'Incorrect email or password'
    });

    throw err;
  }

  setError('email', {
    type: '"root.serverError',
    message: 'Something Went Wrong'
  });

  throw err;
};

export const AuthError = (err: string) => {
  if (err) {
    console.log(err);
    throw err;
  }
};
