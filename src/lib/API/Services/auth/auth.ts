import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import authConfig from './auth.config';
import config from '@/lib/config/auth';

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  pages: {
    signIn: config.redirects.toLogin,
    newUser: config.redirects.toAddSub,
    verifyRequest: config.redirects.authConfirm
  },
  callbacks: {
    async session({ session, user }) {
      if (!user) throw 'User Not Found';

      session.user.id = user.id as string;
      return session;
    }
  }
});
