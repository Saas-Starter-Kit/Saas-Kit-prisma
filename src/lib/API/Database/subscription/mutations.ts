'use server';

import prisma, { Prisma } from '../../Services/init/prisma';
import { GetUser } from '@/lib/API/Database/user/queries';
import { PrismaDBError } from '@/lib/utils/error';
import { Subscription } from '@prisma/client';

export const CreateSubscription = async ({
  id,
  price_id,
  status,
  created_at,
  period_starts_at,
  period_ends_at
}: Subscription) => {
  const user = await GetUser();
  const user_id = user?.id;

  const data: Prisma.SubscriptionCreateInput = {
    id,
    price_id,
    status,
    created_at,
    period_starts_at,
    period_ends_at,
    user: { connect: { id: user_id } }
  };

  try {
    await prisma.subscription.create({ data });
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
}: Partial<Subscription>) => {
  const data: Prisma.SubscriptionUpdateInput = {
    price_id,
    status,
    created_at,
    period_starts_at,
    period_ends_at
  };

  try {
    const res = await prisma.subscription.update({
      where: {
        id
      },
      data
    });
    console.log(res);
  } catch (err) {
    PrismaDBError(err);
  }
};
