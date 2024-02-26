'use client';

import { useState } from 'react';
import configuration from '@/lib/config/dashboard';
import { useRouter } from 'next/navigation';

import { Switch } from '@/components/ui/Switch';
import { ProductI } from '@/lib/types/types';
import { IntervalE } from '@/lib/types/enums';
import { createCheckoutSession } from '@/lib/API/Services/stripe/session';
import PriceCard from '../_PageSections/PriceCard';

const AddSubscription = () => {
  const [timeInterval, setTimeInterval] = useState(IntervalE.MONTHLY);

  const { products } = configuration;

  const basic: ProductI = products[0];
  const premium: ProductI = products[1];

  const router = useRouter();

  const handleSubscription = async (price_id: string) => {
    const price = price_id;

    const redirectUrl = await createCheckoutSession({ price });

    router.push(redirectUrl.url);
  };

  const changeTimeInterval = () => {
    const intervalSwitch =
      timeInterval === IntervalE.MONTHLY ? IntervalE.YEARLY : IntervalE.MONTHLY;
    setTimeInterval(intervalSwitch);
  };

  return (
    <div className=" flex flex-col">
      <h4 className="text-xl font-bold">Add Subscription</h4>
      <p className="text-sm font-medium text-muted-foreground mt-2 mb-4">
        Add a Subscription by choosing a plan below
      </p>

      <div className="flex my-8">
        <div className="text-sm font-bold mr-2">Monthly</div>
        <Switch onClick={changeTimeInterval} />
        <div className="text-sm font-bold ml-3">Yearly</div>
      </div>

      <div className="grid grid-cols-1 space-x-0 lg:space-x-4 lg:grid-cols-2 ">
        <PriceCard
          product={basic}
          handleSubscription={handleSubscription}
          timeInterval={timeInterval}
        />
        <PriceCard
          product={premium}
          handleSubscription={handleSubscription}
          timeInterval={timeInterval}
        />
      </div>
    </div>
  );
};

export default AddSubscription;
