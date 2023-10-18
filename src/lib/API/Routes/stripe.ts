'client only';

/* Funtions used on the client to make api requests to route handlers*/

import axios from 'axios';
import Stripe from 'stripe';
import {
  CheckoutSessionReqPropsT,
  CreatePortalSessionPropsT,
  PortalSessionT,
  CustomerPropsT
} from '@/lib/types/stripe';
import { AxiosHandleError } from '@/lib/utils/error';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import config from '@/lib/config/api';

export const CreateStripeCheckoutSession = async (price: string, id: string, email: string) => {
  let res: AxiosResponse<Stripe.Checkout.Session, any>;

  try {
    res = await axios.post('/api/stripe/create-checkout-session', {
      price,
      user_id: id,
      customer_email: email
    } as CheckoutSessionReqPropsT);
  } catch (err) {
    toast.error(config.errorMessageGeneral);
    AxiosHandleError(err);
  }

  return res;
};

export const CreateStripePortalSession = async (customer: string) => {
  let res: AxiosResponse<PortalSessionT, any>;

  try {
    res = await axios.post('/api/stripe/create-portal-session', {
      customer: 'dddd'
    } as CreatePortalSessionPropsT);
  } catch (err) {
    toast.error(config.errorMessageGeneral);
    AxiosHandleError(err);
  }

  return res;
};

export const UpdateStripeCustomer = async (customer: string, email: string) => {
  let res: AxiosResponse<Stripe.Customer, any>;

  try {
    res = await axios.post('/api/stripe/customer', {
      customer,
      email
    } as CustomerPropsT);
  } catch (err) {
    toast.error(config.errorMessageGeneral);
    AxiosHandleError(err);
  }

  return res;
};
