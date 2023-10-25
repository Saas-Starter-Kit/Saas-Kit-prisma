import { PrismaDBError } from '@/lib/utils/error';
import prisma from '../../Services/init/prisma';
import { Subscriptions } from '@prisma/client';

interface SubscriptionReqProps {
  id: string;
}

export const GetSubscriptionById = async ({ id }: SubscriptionReqProps): Promise<Subscriptions> => {
  try {
    const subscription = await prisma.subscriptions.findFirst({
      where: {
        id
      }
    });

    return subscription;
  } catch (err) {
    PrismaDBError(err);
  }
};
