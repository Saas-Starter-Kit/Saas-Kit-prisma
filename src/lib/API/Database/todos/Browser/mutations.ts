import { SupabaseBrowser as supabase } from '@/lib/API/Services/init/supabase/SupabaseBrowser';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const UpdateTodo = async (
  todo_id: string,
  title: string,
  description: string
): Promise<PostgrestSingleResponse<null>> => {
  const res = await supabase.from('todos').update({ title, description }).eq('id', todo_id);
  return res;
};

export const DeleteTodo = async (todo_id: string): Promise<PostgrestSingleResponse<null>> => {
  const res = await supabase.from('todos').delete().eq('id', todo_id);
  return res;
};

export const CreateTodo = async (
  title: string,
  description: string,
  user_id: string,
  author: string
): Promise<PostgrestSingleResponse<null>> => {
  const res = await supabase.from('todos').insert({ title, description, user_id, author });
  return res;
};
