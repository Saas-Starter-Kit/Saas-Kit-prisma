import 'client-only';
import { AuthError } from '@/lib/utils/error';
import { toast } from 'react-toastify';

import { signIn, signOut } from 'next-auth/react';
import configuration from '@/lib/config/api';
import config from '@/lib/config/auth';
import { LoginPropsI } from '@/lib/types/types';

export const Login = async ({ email, provider }: LoginPropsI) => {
  try {
    const signInResult = await signIn(provider, {
      email: email.toLowerCase(),
      redirect: false,
      callbackUrl: config.redirects.toDashboard
    });

    if (signInResult?.error) {
      toast.error(configuration.errorMessageGeneral);
      const error: Error = { name: 'Auth Error', message: signInResult?.error };
      AuthError(error);
    }
  } catch (err) {
    toast.error(configuration.errorMessageGeneral);
    AuthError(err);
  }
};

export const Logout = async () => {
  try {
    await signOut({ callbackUrl: config.redirects.requireAuth });
  } catch (err) {
    toast.error(configuration.errorMessageGeneral);
    AuthError(err);
  }
};
