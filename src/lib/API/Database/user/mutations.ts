'use server';
import { AuthError, PrismaDBError } from '@/lib/utils/error';
import { DisplayNameFormValues, EmailFormValues } from '@/lib/types/validations';
import { GetUser } from './queries';
import prisma, { Prisma } from '../../Services/init/prisma';

interface UpdateUserSubPropsT {
  id: string;
  stripe_customer_id: string;
  subscription_id: string;
}

export const UpdateUserSubscription = async ({
  id,
  stripe_customer_id,
  subscription_id
}: UpdateUserSubPropsT) => {
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
