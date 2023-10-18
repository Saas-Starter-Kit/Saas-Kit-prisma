import { SupabaseSession } from '@/lib/API/Services/supabase/user';
import TodosCreateForm from '../_PageSections/TodosCreateForm';
import { GetProfileByUserId } from '@/lib/API/Database/profile/Server/queries';

export default async function NewTodo() {
  const session = await SupabaseSession();

  const user = session?.data?.session?.user;

  const profile = await GetProfileByUserId(user?.id);
  const display_name = profile?.data?.[0]?.display_name || '';

  return (
    <div>
      <TodosCreateForm user={user} author={display_name} />
    </div>
  );
}
