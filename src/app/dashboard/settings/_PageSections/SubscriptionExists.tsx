'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import configuration from '@/lib/config/dashboard';
import { PlanI } from '@/lib/types/types';
import config from '@/lib/config/auth';
import { ErrorText } from '@/components/ErrorText';
interface SubscriptionExistsProps {
  price_id: string;
  status: string;
  period_ends: string;
}

const SubscriptionExists = ({ price_id, status, period_ends }: SubscriptionExistsProps) => {
  const { products } = configuration;
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPlan, setPlan] = useState<PlanI>({ name: '' });

  const matchSubscription = () => {
    const match: PlanI = products
      .map((product) => product.plans.find((x: PlanI) => x.price_id === price_id))
      .find((item) => !!item);

    if (!match) {
      setErrorMessage('Subscription Type Not Valid, Please Contact Support');
      return;
    }

    setPlan(match);
  };

  useEffect(() => {
    matchSubscription();
  }, [matchSubscription]);

  const router = useRouter();

  const goToPortal = async () => {
    router.push(config.redirects.toBilling);
  };

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>
            Click button below to go to the billing page to manage your Subscription and Billing
          </CardDescription>
          <ErrorText errorMessage={errorMessage} />
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-xl">
            Current Plan: <span className="font-bold">{currentPlan?.name}</span>
          </h2>
          <div>
            Status: <span className="font-bold">{status}</span>
          </div>
          <div>
            Billing:{' '}
            <span className="font-bold">
              ${currentPlan?.price}/{currentPlan?.interval}
            </span>
          </div>
          <div>
            Billing Period Ends:{' '}
            <span className="font-bold">{new Date(period_ends).toLocaleDateString()}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={goToPortal} className="mt-4">
            Go to Billing
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionExists;
