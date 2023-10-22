'use client';

import { useRouter } from 'next/navigation';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import config from '@/lib/config/auth';

const SubscriptionRequired = () => {
  const router = useRouter();

  const redirectToSubscription = async () => {
    router.push(config.redirects.toSubscription);
  };

  return (
    <div className="mt-6">
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader>
          <CardTitle>No Subscription Found</CardTitle>
          <CardDescription>
            Click below to redirect to the Subscription Page to add a Subscription to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={redirectToSubscription} className="mt-4">
            Go to Subscription
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionRequired;
