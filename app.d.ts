/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('lucia').Auth;
  type DatabaseUserAttributes = {
    email: string;
    stripe_customer_id: string;
    display_name: string;
    subscription_id: string;
  };
  type DatabaseSessionAttributes = {};
}
