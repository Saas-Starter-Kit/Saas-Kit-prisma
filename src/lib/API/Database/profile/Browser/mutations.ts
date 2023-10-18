'client-only';
import { SupabaseBrowser as supabase } from '@/lib/API/Services/init/supabase/SupabaseBrowser';
import { PostgrestError } from '@supabase/supabase-js';

export const SupabaseProfileUpdate = async (
  id: string,
  display_name: string
): Promise<PostgrestError> => {
  const { error } = await supabase.from('profiles').upsert({ id, display_name });

  return error;
};
