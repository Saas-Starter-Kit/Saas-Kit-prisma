import { GetSubscriptionById } from '@/lib/API/Database/subscription/queries';
import SubscriptionComp from '../_PageSections/Subscription';

import { redirect } from 'next/navigation';
import config from '@/lib/config/auth';
import { GetUser } from '@/lib/API/Database/user/queries';
import { Subscription } from '@prisma/client';

export default async function SubscriptionPage() {
  const user = await GetUser();

  let subscription: Subscription;
  const subscription_id = user?.subscription_id;

  if (!subscription_id) {
    redirect(config.redirects.toAddSub);
  } else {
    subscription = await GetSubscriptionById({ id: subscription_id });
  }

  return (
    <div>
      <SubscriptionComp subscription={subscription} />
    </div>
  );
}
