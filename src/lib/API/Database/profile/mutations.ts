'use server';

import { SupabaseServerClient as supabase } from '@/lib/API/Services/init/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

interface ProfileUpdatePropsI {
  id: string;
  display_name: string;
}

export const SupabaseProfileUpdate = async ({
  id,
  display_name
}: ProfileUpdatePropsI): Promise<PostgrestSingleResponse<null>> => {
  const res = await supabase().from('profiles').upsert({ id, display_name });

  return res;
};
