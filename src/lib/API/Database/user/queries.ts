import { User } from '@prisma/client';
import { GetSession } from '../../Services/auth/session';
import prisma from '../../Services/init/prisma';
import { PrismaDBError } from '@/lib/utils/error';
import { cache } from 'react';

export const GetUser = cache(async (): Promise<User> => {
  const session = await GetSession();
  const id = session?.user?.id;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id
      }
    });
    return user;
  } catch (err) {
    PrismaDBError(err);
  }
});
