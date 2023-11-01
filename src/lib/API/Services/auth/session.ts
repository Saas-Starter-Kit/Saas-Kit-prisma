import 'server-only';
import { auth } from './auth';

export const GetSession = async () => {
  const session = await auth();

  return session;
};
