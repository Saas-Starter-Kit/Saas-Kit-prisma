export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          display_name: string | null
          id: string
          stripe_customer_id: string | null
          subscription_id: string | null
        }
        Insert: {
          display_name?: string | null
          id: string
          stripe_customer_id?: string | null
          subscription_id?: string | null
        }
        Update: {
          display_name?: string | null
          id?: string
          stripe_customer_id?: string | null
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_subscription_id_fkey"
            columns: ["subscription_id"]
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          id: string
          period_ends_at: string | null
          period_starts_at: string | null
          price_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          id: string
          period_ends_at?: string | null
          period_starts_at?: string | null
          price_id: string
          status: string
        }
        Update: {
          created_at?: string | null
          id?: string
          period_ends_at?: string | null
          period_starts_at?: string | null
          price_id?: string
          status?: string
        }
        Relationships: []
      }
      todos: {
        Row: {
          author: string | null
          description: string | null
          id: string
          title: string | null
          user_id: string
        }
        Insert: {
          author?: string | null
          description?: string | null
          id?: string
          title?: string | null
          user_id: string
        }
        Update: {
          author?: string | null
          description?: string | null
          id?: string
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
