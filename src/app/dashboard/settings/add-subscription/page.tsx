'use client';

import { useEffect, useState } from 'react';
import configuration from '@/lib/config/dashboard';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/Icons';
import { Switch } from '@/components/ui/Switch';
import { createCheckoutSession } from '@/lib/API/Services/stripe/session';
import { ProductI } from '@/lib/types/types';
import { IntervalE } from '@/lib/types/enums';

interface PriceCardProps {
  product: ProductI;
  handleSubscription: (price: string) => Promise<void>;
  timeInterval: IntervalE;
}

const PriceCard = ({ product, handleSubscription, timeInterval }: PriceCardProps) => {
  const [plan, setPlan] = useState({ price: '', price_id: '', isPopular: false });
  const { name, description, features, plans } = product;

  const setProductPlan = () => {
    if (timeInterval === IntervalE.MONTHLY) {
      setPlan({
        price: plans[0].price,
        price_id: plans[0].price_id,
        isPopular: plans[0].isPopular
      });
    } else {
      setPlan({
        price: plans[1].price,
        price_id: plans[1].price_id,
        isPopular: plans[1].isPopular
      });
    }
  };

  useEffect(() => {
    setProductPlan();
  }, [timeInterval]); //eslint-disable-line

  return (
    <Card
      className={`flex flex-col items-center justify-center border mt-4 bg-background-light dark:bg-background-dark ${
        plan.isPopular && 'border-blue-500 relative'
      }`}
    >
      {plan.isPopular && (
        <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-blue-400 to-blue-700 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Popular
        </div>
      )}
      <CardHeader className="flex flex-col items-center">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="flex flex-col items-center mt-2 mb-6">
          <h4 className="text-5xl font-bold">${plan?.price}</h4>
          <div className="text-sm font-medium text-muted-foreground">Billed {timeInterval}</div>
        </div>
        <ul className="flex flex-col space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Icons.Check className="mr-2" size={20} color="green" /> {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full" onClick={() => handleSubscription(plan?.price_id)}>
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
};

const PricingDisplay = () => {
  const [timeInterval, setTimeInterval] = useState(IntervalE.MONTHLY);

  const { products } = configuration;

  const basic: ProductI = products[0];
  const premium: ProductI = products[1];

  const router = useRouter();

  const handleSubscription = async (price: string) => {
    const res = await createCheckoutSession({ price });

    router.push(res.url);
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

export default PricingDisplay;
