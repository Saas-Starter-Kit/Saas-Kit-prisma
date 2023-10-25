'use server';
import * as context from 'next/headers';
import auth from '@/lib/API/Init/lucia';
import { CreateSession, getSession } from './session';
import { User, UserSchema } from 'lucia';
import { LuciaError, Session } from 'lucia';
import { LuciaAuthError, PrismaDBError } from '@/lib/utils/error';
import { authFormValues } from '@/lib/types/validations';
import { HttpMethodsE } from '@/lib/types/enums';
import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';

export const SignUp = async ({ email, password }: authFormValues) => {
  let user: User;

  try {
    user = await auth.createUser({
      key: {
        providerId: 'email',
        providerUserId: email.toLowerCase(),
        password
      },
      attributes: {
        email: email.toLowerCase(),
        stripe_customer_id: null,
        subscription_id: null,
        display_name: null
      }
    });
  } catch (err) {
    if (err instanceof LuciaError) {
      LuciaAuthError(err);
    }
    PrismaDBError(err);
  }

  let session: Session;
  try {
    session = await CreateSession(user);
  } catch (err) {
    if (err instanceof LuciaError) {
      LuciaAuthError(err);
    }
    PrismaDBError(err);
  }

  const authRequest = auth.handleRequest(HttpMethodsE.POST, context);
  authRequest.setSession(session);
  redirect(config.redirects.toAddSub);
};

export const getUser = async () => {
  const session = await getSession();
  return session?.user;
};
