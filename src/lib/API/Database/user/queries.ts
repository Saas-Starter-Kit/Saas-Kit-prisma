import { GetSession } from '@/lib/API/Services/auth/session';

export const GetUser = async () => {
  const session = await GetSession();
  return session?.user;
};

export const 