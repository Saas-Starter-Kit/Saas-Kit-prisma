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
    signIn: config.redirects.requireAuth,
    newUser: config.redirects.toAddSub
  },
  callbacks: {
    //async jwt({ token, user }) {
    //  const dbUser = await prisma.user.findFirst({
    //    where: {
    //      email: token.email
    //    }
    //  });

    //  console.log(dbUser);

    //  if (!dbUser) {
    //    if (user) {
    //      token.id = user?.id;
    //      token.display_name = 'ffff';
    //    }
    //    return token;
    //  }

    //  return {
    //    id: dbUser.id,
    //    email: dbUser.email,
    //    stripe_customer_id: dbUser.stripe_customer_id,
    //    display_name: dbUser.display_name,
    //    subscription_id: dbUser.subscription_id
    //  };
    //},
    async session({ token, session, user }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.display_name = token.display_name as string;
      }
      return session;
    }
  }
});
