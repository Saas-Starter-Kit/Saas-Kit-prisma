import 'server-only';
import Stripe from 'stripe';
import { RetrieveSubscription } from './customer';
import { StripeEvent } from '@/lib/types/stripe';
import { UpdateUserSubscription } from '../../Database/user/mutations';
import { CreateSubscription, UpdateSubscription } from '../../Database/subscription/mutations';

const subscriptionStatusActive = { trailing: 'trailing', active: 'active' };
const subscriptionStatusVoid = {
  past_due: 'past_due',
  canceled: 'canceled',
  unpaid: 'unpaid',
  incomplete_expired: 'incomplete_expired'
};

const WebhookEvents = {
  subscription_updated: 'customer.subscription.updated',
  checkout_session_completed: 'checkout.session.completed'
};

export const WebhookEventHandler = async (event: StripeEvent) => {
  // Handle the event
  switch (event.type) {
    case WebhookEvents.checkout_session_completed:
      const session = event.data.object;

      const subscription: Stripe.Subscription = await RetrieveSubscription(session.subscription);

      const stripe_customer_id = subscription.customer as string;
      const statusSub = subscription.status as string;

      const dataSub = {
        id: subscription.id,
        price_id: subscription.items.data[0].price.id,
        status: statusSub,
        created_at: new Date(Date.now()),
        period_starts_at: new Date(subscription.current_period_start * 1000),
        period_ends_at: new Date(subscription.current_period_end * 1000)
      };

      await CreateSubscription(dataSub);

      const dataUser = {
        stripe_customer_id,
        subscription_id: subscription.id
      };

      await UpdateUserSubscription(dataUser);

      console.log('Stripe Customer Successfully Created');
      break;
    case WebhookEvents.subscription_updated:
      const subscriptionUpdate = event.data.object;
      console.log('Subscription Updated Started');
      console.log(subscriptionUpdate);
      const UpdatedCols = Object.keys(event.data.previous_attributes);
      const validColumns = [
        'price_id',
        'status',
        'created_at',
        'period_starts_at',
        'period_ends_at'
      ];
      const validUpdatedCols = UpdatedCols.filter((element) => validColumns.includes(element));
      let dataUpdate = {};

      validUpdatedCols.forEach((item) => {
        dataUpdate[item] = subscriptionUpdate[item];
      });

      if (UpdatedCols.includes('status')) {
        const validStatus = [
          ...Object.keys(subscriptionStatusActive),
          ...Object.keys(subscriptionStatusVoid)
        ];
        if (validStatus.includes(subscriptionUpdate.status)) {
          dataUpdate['status'] = subscriptionUpdate.status;
        }
      }

      if (Object.keys(dataUpdate).length !== 0) {
        await UpdateSubscription(dataUpdate);
      }

      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
};

/* 

Webhook triggers can be triggered by stripe CLI to similate webhook events. Copy and paste into terminal.

stripe.exe trigger checkout.session.completed --add checkout_session:metadata.user_id={REPLACE WITH A USER ID}

stripe.exe trigger customer.subscription.updated

stripe.exe trigger invoice.paid

ngrok setup can also be used to directly trigger events from the app. See ngrok stripe webhook guide.
*/
