'use server';
import * as context from 'next/headers';
import auth from '@/lib/API/Services/init/lucia';
import { CreateSession } from '@/lib/API/Services/auth/session';
import { User } from 'lucia';
import { LuciaError, Session } from 'lucia';
import { LuciaAuthError, PrismaDBError } from '@/lib/utils/error';
import {
  DisplayNameFormValues,
  EmailFormValues,
  UpdatePasswordFormValues,
  authFormValues
} from '@/lib/types/validations';
import { HttpMethodsE } from '@/lib/types/enums';
import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';
import { GetUser } from './queries';

interface UpdateUserSubPropsT {
  stripe_customer_id: string;
  subscription_id: string;
}

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

export const UpdateUserSubscription = async ({
  stripe_customer_id,
  subscription_id
}: UpdateUserSubPropsT) => {
  const user: User = await GetUser();
  const userId = user?.userId;

  try {
    await auth.updateUserAttributes(userId, { stripe_customer_id, subscription_id });
  } catch (err) {
    if (err instanceof LuciaError) {
      LuciaAuthError(err);
    }
    PrismaDBError(err);
  }
};

export const UpdateUserName = async ({ display_name }: DisplayNameFormValues) => {
  const user: User = await GetUser();
  const userId = user?.userId;

  try {
    await auth.updateUserAttributes(userId, { display_name });
  } catch (err) {
    if (err instanceof LuciaError) {
      LuciaAuthError(err);
    }
    PrismaDBError(err);
  }
};

export const UpdateUserEmail = async ({ email }: EmailFormValues) => {
  const user: User = await GetUser();
  const userId = user?.userId;

  try {
    await auth.updateUserAttributes(userId, { email });
  } catch (err) {
    if (err instanceof LuciaError) {
      LuciaAuthError(err);
    }
    PrismaDBError(err);
  }
};

export const UpdateUserPassword = async ({ password }: UpdatePasswordFormValues) => {
  const user: User = await GetUser();
  const providerUserId = user?.email;
  const providerId = 'email';
  const newPassword = password;

  try {
    await auth.updateKeyPassword(providerId, providerUserId, newPassword);
  } catch (err) {
    if (err instanceof LuciaError) {
      LuciaAuthError(err);
    }
    PrismaDBError(err);
  }
};
