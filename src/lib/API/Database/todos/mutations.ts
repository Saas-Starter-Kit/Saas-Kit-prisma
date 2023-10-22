'use server';

import { SupabaseUser } from '@/lib/API/Services/supabase/user';
import { GetProfileByUserId } from '@/lib/API/Database/profile/queries';
import { SupabaseServerClient as supabase } from '@/lib/API/Services/init/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

interface CreateTodoPropsI {
  title: string;
  description: string;
}

interface UpdateTodoPropsI {
  id: string;
  title: string;
  description: string;
}

export const CreateTodo = async ({
  title,
  description
}: CreateTodoPropsI): Promise<PostgrestSingleResponse<null>> => {
  const user = await SupabaseUser();
  const profile = await GetProfileByUserId(user?.id);
  const user_id = user?.id;
  const author = profile?.data?.[0]?.display_name || '';

  const res = await supabase().from('todos').insert({ title, description, user_id, author });

  return res;
};

export const UpdateTodo = async ({
  id,
  title,
  description
}: UpdateTodoPropsI): Promise<PostgrestSingleResponse<null>> => {
  const res = await supabase().from('todos').update({ title, description }).eq('id', id);
  return res;
};

export const DeleteTodo = async (todo_id: string): Promise<PostgrestSingleResponse<null>> => {
  const res = await supabase().from('todos').delete().eq('id', todo_id);
  revalidatePath('/');
  return res;
};
