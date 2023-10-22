import { SupabaseUser } from '@/lib/API/Services/supabase/user';
import { GetProfileByUserId } from '@/lib/API/Database/profile/queries';

import { GetSubscriptionById } from '@/lib/API/Database/subcription/queries';
import SubscriptionDisplay from '../_PageSections/Subscription';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { SubscriptionT } from '@/lib/types/supabase';
import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';

export default async function Subscription() {
  const user = await SupabaseUser();

  const profile = await GetProfileByUserId(user?.id);
  const subscription_id = profile?.data?.[0]?.subscription_id;

  if (!subscription_id) redirect(config.redirects.toAddSub);

  let subscription: PostgrestSingleResponse<SubscriptionT[]>;
  if (profile?.data?.[0]?.subscription_id) {
    subscription = await GetSubscriptionById(profile?.data?.[0]?.subscription_id);
  }

  const price_id = subscription?.data[0]?.price_id;
  const status = subscription?.data[0]?.status;
  const period_ends = subscription?.data[0]?.period_ends_at;

  return (
    <div>
      <SubscriptionDisplay price_id={price_id} status={status} period_ends={period_ends} />
    </div>
  );
}
