'use server';

import auth from '../init/lucia';
import { Key, LuciaError, Session, User } from 'lucia';
import { authFormValues } from '@/lib/types/validations';
import { HttpMethodsE } from '@/lib/types/enums';
import * as context from 'next/headers';
import { LuciaAuthError, PrismaDBError } from '@/lib/utils/error';
import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';

export const CreateSession = async (user: User) => {
  const session = await auth.createSession({
    userId: user.userId,
    attributes: {}
  });

  return session;
};

export const Login = async ({ email, password }: authFormValues) => {
  let key: Key;
  try {
    key = await auth.useKey('email', email.toLowerCase(), password);
  } catch (err) {
    if (err instanceof LuciaError) {
      LuciaAuthError(err);
    }
    PrismaDBError(err);
  }

  let session: Session;

  try {
    session = await auth.createSession({
      userId: key.userId,
      attributes: {}
    });
  } catch (err) {
    if (err instanceof LuciaError) {
      LuciaAuthError(err);
    }
    PrismaDBError(err);
  }

  const authRequest = auth.handleRequest(HttpMethodsE.POST, context);
  authRequest.setSession(session);
  redirect(config.redirects.toDashboard);
};

export const Logout = async () => {
  const authRequest = auth.handleRequest(HttpMethodsE.POST, context);

  try {
    const session = await authRequest.validate();
    await auth.invalidateSession(session?.sessionId);
  } catch (err) {
    if (err instanceof LuciaError) {
      LuciaAuthError(err);
    }
    PrismaDBError(err);
    redirect(config.redirects.requireAuth);
  }

  authRequest.setSession(null);
  redirect(config.redirects.requireAuth);
};

export const getSession = async () => {
  const authRequest = auth.handleRequest(HttpMethodsE.GET, context);
  let session: Session;

  try {
    session = await authRequest.validate();
  } catch (err) {
    if (err instanceof LuciaError) {
      LuciaAuthError(err);
    }
    PrismaDBError(err);
    redirect(config.redirects.requireAuth);
  }

  if (!session) redirect(config.redirects.requireAuth);

  return session;
};
