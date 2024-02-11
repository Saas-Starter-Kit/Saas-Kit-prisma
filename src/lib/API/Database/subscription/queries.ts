import { PrismaDBError } from '@/lib/utils/error';
import prisma from '../../Services/init/prisma';
import { Subscription } from '@prisma/client';
import { cache } from 'react';

interface SubscriptionReqProps {
  id: string;
}

export const GetSubscriptionById = cache(
  async ({ id }: SubscriptionReqProps): Promise<Subscription> => {
    try {
      const subscription = await prisma.subscription.findFirst({
        where: {
          id
        }
      });

      return subscription;
    } catch (err) {
      PrismaDBError(err);
    }
  }
);
