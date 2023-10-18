import { SupabaseSession } from '@/lib/API/Services/supabase/user';
import { GetTodoByUserId } from '@/lib/API/Database/todos/Server/queries';
import MyTodos from '../_PageSections/MyTodos';

export default async function ListTodos() {
  const session = await SupabaseSession();

  const user = session?.data?.session?.user;

  const user_id = user?.id;
  const profile = await GetTodoByUserId(user_id);

  return (
    <div>
      <MyTodos todos={profile?.data} />
    </div>
  );
}
