/* Stripe Billing Portal Types */
export type PortalSessionT = {
  id: string;
  object: string;
  configuration: string;
  created: number;
  customer: string;
  flow: null;
  livemode: boolean;
  locale: null;
  on_behalf_of: null;
  return_url: string;
  url: string;
};

export type PortalSessionReqPropsT = {
  customer: string;
};

export type CreatePortalSessionPropsT = {
  customer: string;
  origin: string;
};

/* Stripe Checkout session types */

export type CreateCheckoutSessionPropsT = {
  price: string;
};

export type CheckoutSessionReqPropsT = {
  price: string;
};

// imported Stripe Event from 'stripe' type has outdated keys/values
export type StripeEvent = {
  type: string;
  data: {
    object: {
      id: string;
      metadata: {
        user_id: string;
      };
      subscription: string;
      status: string;
    };
    previous_attributes: object | null;
  };
};

export type CustomerPropsT = {
  customer: string;
  email: string;
};

export type CustomerReqPropsT = {
  customer: string;
  email: string;
};
