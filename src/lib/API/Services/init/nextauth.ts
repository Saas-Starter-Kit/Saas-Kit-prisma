import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import config from '@/lib/config/auth';

import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: config.redirects.requireAuth
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  callbacks: {
    //async session({ token, session }) {
    //  if (token) {
    //    //session.user.id = token.id;
    //    session.user.email = token.email;
    //  }
    //  return session;
    //},
    //async signIn({ user, account, email }) {
    //  const userExists = await prisma.findOne({
    //    email: user.email
    //  });
    //  if (userExists) {
    //    return true; //if the email exists in the User collection, email them a magic login link
    //  } else {
    //    return false; // redirect to register.
    //  }
    //},
    //async jwt({ token, user }) {
    //  const dbUser = await prisma.user.findFirst({
    //    where: {
    //      email: token.email
    //    }
    //  });
    //  if (!dbUser) {
    //    if (user) {
    //      token.id = user?.id;
    //    }
    //    return token;
    //  }
    //  return {
    //    id: dbUser.id,
    //    email: dbUser.email
    //  };
    //}
  }
};
