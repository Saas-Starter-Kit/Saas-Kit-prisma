'server only';
import { SupabaseServerClient as supabase } from '@/lib/API/Services/init/supabase/SupabaseServer';
import { SupabaseAuthError } from '@/lib/utils/error';

export const SupabaseSession = async () => {
  const session = await supabase().auth.getSession();
  if (session.error) SupabaseAuthError(session.error);
  return session;
};
