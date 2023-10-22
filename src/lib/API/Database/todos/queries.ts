'use server';

import { SupabaseServerClient as supabase } from '@/lib/API/Services/init/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { TodosT } from '@/lib/types/supabase';
import { SupabaseDBError } from '@/lib/utils/error';
import { SupabaseUser } from '@/lib/API/Services/supabase/user';

export const GetTodosByUserId = async (): Promise<PostgrestSingleResponse<TodosT[]>> => {
  const user = await SupabaseUser();
  const user_id = user.id;

  const res: PostgrestSingleResponse<TodosT[]> = await supabase()
    .from('todos')
    .select()
    .eq('user_id', user_id);

  if (res.error) SupabaseDBError(res.error);
  return res;
};

export const GetTodoById = async (todo_id: string): Promise<PostgrestSingleResponse<TodosT[]>> => {
  const res: PostgrestSingleResponse<TodosT[]> = await supabase()
    .from('todos')
    .select()
    .eq('id', todo_id);

  if (res.error) SupabaseDBError(res.error);
  return res;
};

export const GetAllTodos = async (): Promise<PostgrestSingleResponse<TodosT[]>> => {
  const res: PostgrestSingleResponse<TodosT[]> = await supabase().from('todos').select();
  if (res.error) SupabaseDBError(res.error);

  return res;
};
