import 'server-only';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../../supabase/types';

//https://github.com/vercel/next.js/issues/45371

//import type { Database } from '@/lib/database.types'

export const SupabaseServerClient = () => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
};
