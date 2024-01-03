import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const clearAllDB = async () => {
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.verificationToken.deleteMany({});
};
