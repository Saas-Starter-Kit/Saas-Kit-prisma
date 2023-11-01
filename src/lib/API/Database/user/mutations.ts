'use server';
import * as context from 'next/headers';

import { AuthError, PrismaDBError } from '@/lib/utils/error';
import {
  DisplayNameFormValues,
  EmailFormValues,
  UpdatePasswordFormValues
} from '@/lib/types/validations';
import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';
import { GetUser } from './queries';
import prisma, { Prisma } from '../../Services/init/prisma';

interface UpdateUserSubPropsT {
  stripe_customer_id: string;
  subscription_id: string;
}

export const UpdateUserSubscription = async ({
  stripe_customer_id,
  subscription_id
}: UpdateUserSubPropsT) => {
  const user = await GetUser();
  const id = user?.id;

  const data: Prisma.UserUpdateInput = {
    stripe_customer_id,
    subscription: { connect: { id: subscription_id } }
  };

  try {
    await prisma.user.update({
      where: {
        id
      },
      data
    });
  } catch (err) {
    if (err instanceof Error) {
      AuthError(err);
    }
    PrismaDBError(err);
  }
};

export const UpdateUserName = async ({ display_name }: DisplayNameFormValues) => {
  const user = await GetUser();
  const id = user?.id;
  const data: Prisma.UserUpdateInput = { display_name };

  try {
    await prisma.user.update({
      where: {
        id
      },
      data
    });
  } catch (err) {
    if (err instanceof Error) {
      AuthError(err);
    }
    PrismaDBError(err);
  }
};

export const UpdateUserEmail = async ({ email }: EmailFormValues) => {
  const user = await GetUser();
  const id = user?.id;
  const data: Prisma.UserUpdateInput = { email };

  try {
    await prisma.user.update({
      where: {
        id
      },
      data
    });
  } catch (err) {
    if (err instanceof Error) {
      AuthError(err);
    }
    PrismaDBError(err);
  }
};
