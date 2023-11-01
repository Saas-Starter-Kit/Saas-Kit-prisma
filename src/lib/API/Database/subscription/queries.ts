import { PrismaDBError } from '@/lib/utils/error';
import prisma from '../../Services/init/prisma';
import { Subscription } from '@prisma/client';

interface SubscriptionReqProps {
  id: string;
}

export const GetSubscriptionById = async ({ id }: SubscriptionReqProps): Promise<Subscription> => {
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
};
