import { LucideIcon } from 'lucide-react';
import { IntervalE } from './enums';
import { AuthError, PostgrestError } from '@supabase/supabase-js';

export type NavItem = {
  title: string;
  link: string;
};

export type NavItemSidebar = {
  title: string;
  link: string;
  icon: LucideIcon;
};

export interface LayoutProps {
  children: React.ReactNode;
}

export interface PlanI {
  name: string;
  interval?: IntervalE;
  price?: string;
  price_id?: string;
  isPopular?: boolean;
}

export interface ProductI {
  name: string;
  description: string;
  features: string[];
  plans: PlanI[];
}

export type ServerError = AuthError | PostgrestError | null;
