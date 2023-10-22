import ManageSubscription from '../_PageSections/Billing';
import { SupabaseUser } from '@/lib/API/Services/supabase/user';
import { GetProfileByUserId } from '@/lib/API/Database/profile/queries';
import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';

export default async function Billing() {
  const user = await SupabaseUser();
  const profile = await GetProfileByUserId(user.id);
  const subscription = profile?.data?.[0]?.subscription_id;

  if (!subscription) redirect(config.redirects.requireSub);

  return (
    <div>
      <ManageSubscription />
    </div>
  );
}
