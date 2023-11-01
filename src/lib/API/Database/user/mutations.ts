'use server';
import * as context from 'next/headers';

import { AuthError, PrismaDBError } from '@/lib/utils/error';
import {
  DisplayNameFormValues,
  EmailFormValues,
  UpdatePasswordFormValues
} from '@/lib/types/validations';
import { HttpMethodsE } from '@/lib/types/enums';
import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';
import { GetUser } from './queries';

interface UpdateUserSubPropsT {
  stripe_customer_id: string;
  subscription_id: string;
}

export const SignUp = async ({ email }: EmailFormValues) => {
  let user;

  try {
  } catch (err) {
    if (err instanceof Error) {
      AuthError(err);
    }
    PrismaDBError(err);
  }

  let session;
  try {
  } catch (err) {
    if (err instanceof Error) {
      AuthError(err);
    }
    PrismaDBError(err);
  }

  redirect(config.redirects.toAddSub);
};

export const UpdateUserSubscription = async ({
  stripe_customer_id,
  subscription_id
}: UpdateUserSubPropsT) => {
  const user = await GetUser();
  const userId = user?.id;

  try {
  } catch (err) {
    if (err instanceof Error) {
      AuthError(err);
    }
    PrismaDBError(err);
  }
};

export const UpdateUserName = async ({ display_name }: DisplayNameFormValues) => {
  const user = await GetUser();
  const userId = user?.id;

  try {
  } catch (err) {
    if (err instanceof Error) {
      AuthError(err);
    }
    PrismaDBError(err);
  }
};

export const UpdateUserEmail = async ({ email }: EmailFormValues) => {
  const user = await GetUser();
  const userId = user?.id;

  try {
  } catch (err) {
    if (err instanceof Error) {
      AuthError(err);
    }
    PrismaDBError(err);
  }
};
