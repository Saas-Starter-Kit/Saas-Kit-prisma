import PricingDisplay from '../_PageSections/PricingDisplay';
import { SupabaseSession } from '@/lib/API/Services/supabase/user';
import { GetProfileByUserId } from '@/lib/API/Database/profile/Server/queries';

import { GetSubscriptionById } from '@/lib/API/Database/subcription/Server/queries';
import SubscriptionExists from '../_PageSections/SubscriptionExists';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { SubscriptionT } from '@/lib/types/supabase';

export default async function Subscription() {
  const session = await SupabaseSession();
  const user = session?.data?.session?.user;

  const profile = await GetProfileByUserId(user?.id);

  let subscription: PostgrestSingleResponse<SubscriptionT[]>;
  if (profile?.data?.[0]?.subscription_id) {
    //subscription = await GetSubscriptionById(profile?.data?.[0]?.subscription_id);
  }

  const price_id = subscription?.data[0]?.price_id;
  const status = subscription?.data[0]?.status;
  const period_ends = subscription?.data[0]?.period_ends_at;

  return (
    <div>
      {!subscription && <PricingDisplay user={user} />}
      {subscription && (
        <SubscriptionExists price_id={price_id} status={status} period_ends={period_ends} />
      )}
    </div>
  );
}
