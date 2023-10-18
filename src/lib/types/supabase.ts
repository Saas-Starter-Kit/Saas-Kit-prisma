import { Session, User } from '@supabase/supabase-js';
import { AuthError } from '@supabase/supabase-js';

export type ProfileT = {
  display_name?: string | null;
  id: string;
  stripe_customer_id?: string | null;
  subscription_id?: string | null;
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

export type TSupabaseUserSession =
  | {
      user: User;
      session: Session;
    }
  | {
      user: null;
      session: null;
    };

export interface SupabaseAuthErrorProps {
  error: AuthError;
  data: TSupabaseUserSession;
  email: string;
}

export interface SupbaseAuthError {
  isError: boolean;
}
