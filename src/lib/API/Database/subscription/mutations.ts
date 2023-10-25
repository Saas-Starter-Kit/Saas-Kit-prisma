'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/DataBase/user/queries';
import { PrismaDBError } from '@/lib/utils/error';
import { Subscriptions } from '@prisma/client';

export const CreateSubscription = async ({
  id,
  price_id,
  status,
  created_at,
  period_starts_at,
  period_ends_at
}: Subscriptions) => {
  const user = await GetUser();
  const user_id = user?.userId;

  const data: Prisma.SubscriptionsCreateInput = {
    id,
    price_id,
    status,
    created_at,
    period_starts_at,
    period_ends_at,
    user: { connect: { id: user_id } }
  };

  try {
    await prisma.subscriptions.create({ data });
  } catch (err) {
    PrismaDBError(err);
  }
};

export const UpdateSubscription = async ({
  id,
  price_id,
  status,
  created_at,
  period_starts_at,
  period_ends_at
}: Partial<Subscriptions>) => {
  const data: Prisma.SubscriptionsUpdateInput = {
    price_id,
    status,
    created_at,
    period_starts_at,
    period_ends_at
  };

  try {
    await prisma.subscriptions.update({
      where: {
        id
      },
      data
    });
  } catch (err) {
    PrismaDBError(err);
  }
};
