'use client';

import { useRouter } from 'next/navigation';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

import { createPortalSession } from '@/lib/API/Services/stripe/session';

const Billing = () => {
  const router = useRouter();

  const handleSubscription = async () => {
    const res = await createPortalSession();

    router.push(res);
  };

  return (
    <div className="mt-6">
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader>
          <CardTitle>Manage Subscription & Billing</CardTitle>
          <CardDescription>
            Click below to Manage Subscription and Billing, You will be redirected to the Stripe
            Customer Portal, where you will be able to update or cancel subsciptions, update payment
            methods and view past invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSubscription} className="mt-4">
            Go to Portal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
