import ManageSubscription from '../_PageSections/Billing';
import { SupabaseUser } from '@/lib/API/Services/supabase/user';
import { GetProfileByUserId } from '@/lib/API/Database/profile/queries';
import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';
import { getUser } from '@/lib/API/Services/auth/user';

export default async function Billing() {
  const user = await getUser();
  const subscription = user?.subscription_id;

  if (!subscription) redirect(config.redirects.requireSub);

  return (
    <div>
      <ManageSubscription />
    </div>
  );
}
