import { SupabaseServerClient as supabase } from '@/lib/API/Services/init/supabase/SupabaseServer';
import { SubscriptionT } from '@/lib/types/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { SupabaseDBError } from '@/lib/utils/error';

export const GetSubscriptionById = async (
  id: string
): Promise<PostgrestSingleResponse<SubscriptionT[]>> => {
  const res: PostgrestSingleResponse<SubscriptionT[]> = await supabase()
    .from('subscriptions')
    .select()
    .eq('id', id);

  if (res.error) SupabaseDBError(res.error);

  return res;
};
