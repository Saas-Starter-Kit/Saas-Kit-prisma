import ManageSubscription from '../_PageSections/Billing';
import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';
import { GetUser } from '@/lib/API/Database/user/queries';

export default async function Billing() {
  const user = await GetUser();
  const subscription = user?.subscription_id;

  if (!subscription) redirect(config.redirects.requireSub);

  return (
    <div>
      <ManageSubscription />
    </div>
  );
}
