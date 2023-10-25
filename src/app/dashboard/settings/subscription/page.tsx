import { GetSubscriptionById } from '@/lib/API/DataBasePrisma/subscription/queries';
import Subscription from '../_PageSections/Subscription';

import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';
import { GetUser } from '@/lib/API/Database/user/queries';
import { Subscriptions } from '@prisma/client';

export default async function SubscriptionPage() {
  const user = await GetUser();

  let subscription: Subscriptions;
  const subscription_id = user?.subscription_id;
  if (!subscription_id) {
    redirect(config.redirects.toAddSub);
  } else {
    subscription = await GetSubscriptionById(user?.subscription_id);
  }

  return (
    <div>
      <Subscription subscription={subscription} />
    </div>
  );
}
