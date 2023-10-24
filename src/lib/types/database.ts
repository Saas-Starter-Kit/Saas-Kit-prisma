export type UserT = {
  id: string;
  email: string;
  stripe_customer_id: string;
  display_name: string;
  subscription_id: string;
};

export type SessionT = {
  id: string;
  user_id: string;
  idle_expires: number;
  active_expires: number;
};

export type KeyTableT = {
  id: string;
  user_id: string;
  hashed_password: null | string;
};

export type VerificationTokenT = {
  id: string;
  user_id: string;
  expires: number;
};

export type SubscriptionT = {
  created_at: string | Date | null;
  id: string;
  period_ends_at: string | null;
  period_starts_at: string | null;
  price_id: string;
  status: string;
};

export type TodosT = {
  author: string | null;
  description: string | null;
  id: string;
  title: string | null;
  user_id: string;
};
