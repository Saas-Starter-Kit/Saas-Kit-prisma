import { auth } from '../auth/auth';
import { EmailFormValues } from '@/lib/types/validations';
import { HttpMethodsE } from '@/lib/types/enums';
import * as context from 'next/headers';
import { AuthError, PrismaDBError } from '@/lib/utils/error';
import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';

import { signIn, signOut } from 'next-auth/react';

export const Login = async ({ email }: EmailFormValues) => {
  try {
    const signInResult = await signIn('email', {
      email: email.toLowerCase()
    });

    console.log(signInResult);

    //if (!signInResult?.ok) {
    //  return toast({
    //    title: 'Something went wrong.',
    //    description: 'Your sign in request failed. Please try again.',
    //    variant: 'destructive'
    //  });
    //}
  } catch (err) {
    if (err instanceof Error) {
      AuthError(err);
    }
    PrismaDBError(err);
  }

  let session;

  try {
    //session = await auth.createSession({
    //  userId: key.userId,
    //  attributes: {}
    //});
  } catch (err) {
    //if (err instanceof Error) {
    //AuthError(err);
    //}
    PrismaDBError(err);
  }

  //const authRequest = auth.handleRequest(HttpMethodsE.POST, context);
  //authRequest.setSession(session);
  redirect(config.redirects.toDashboard);
};

export const Logout = async () => {
  //const authRequest = auth.handleRequest(HttpMethodsE.POST, context);

  try {
    const signInResult = await signOut();
  } catch (err) {
    //if (err instanceof Error) {
    //  AuthError(err);
    //}
    PrismaDBError(err);
    redirect(config.redirects.requireAuth);
  }

  //authRequest.setSession(null);
  redirect(config.redirects.requireAuth);
};
