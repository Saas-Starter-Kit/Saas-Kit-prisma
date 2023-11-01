import { auth } from '../../Services/auth/auth';

export const GetUser = async () => {
  const session = await auth();

  return session?.user;
};
