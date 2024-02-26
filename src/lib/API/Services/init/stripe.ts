import Stripe from 'stripe';

//@ts-expect-error, config not required for stripe init
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
