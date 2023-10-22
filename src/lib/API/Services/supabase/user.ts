'use server';

import { SupabaseServerClient as supabase } from '@/lib/API/Services/init/supabase';
import { SupabaseAuthError } from '@/lib/utils/error';

export const SupabaseSession = async () => {
  const res = await supabase().auth.getSession();
  if (res.error) SupabaseAuthError(res.error);
  return res;
};

export const SupabaseUser = async () => {
  const res = await supabase().auth.getSession();
  if (res.error) SupabaseAuthError(res.error);
  return res?.data?.session?.user;
};
