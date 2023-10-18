import ManageSubscription from '../_PageSections/ManageSubscription';
import { SupabaseSession } from '@/lib/API/Services/supabase/user';
import { GetProfileByUserId } from '@/lib/API/Database/profile/Server/queries';
import SubscriptionRequired from '../_PageSections/SubscriptionRequired';

export default async function Billing() {
  const session = await SupabaseSession();

  const user = session?.data?.session?.user;

  const profile = await GetProfileByUserId(user.id);

  //const subscription = profile?.data?.[0]?.subscription_id;
  //const customer = profile?.data?.[0]?.stripe_customer_id;
  const subscription = '';
  const customer = '';

  return (
    <div>
      {subscription && <ManageSubscription customer={customer} />}
      {!subscription && <SubscriptionRequired />}
    </div>
  );
}
