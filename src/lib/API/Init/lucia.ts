//import 'server-only';
import { UserSchema, lucia, Auth, Configuration } from 'lucia';
import { nextjs_future } from 'lucia/middleware';
import { prisma } from '@lucia-auth/adapter-prisma';
import prismaClient from './prisma';

const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV';

const getUserAttributes = (data: UserSchema) => {
  return {
    email: data.email,
    stripe_customer_id: data.stripe_customer_id,
    display_name: data.display_name,
    subscription_id: data.subscription_id
  };
};

const configuration: Configuration = {
  env,
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false
  },
  adapter: prisma(prismaClient, {
    user: 'users',
    session: 'sessions',
    key: 'keys'
  }),
  getUserAttributes
};

const auth: Auth<Configuration> = lucia(configuration);

export default auth;
