import UpdateProfileCard from '../_PageSections/UpdateProfileCard';
import { SupabaseSession } from '@/lib/API/Services/supabase/user';
import { GetProfileByUserId } from '@/lib/API/Database/profile/Server/queries';

export default async function ProfileForm() {
  const session = await SupabaseSession();

  const user = session?.data?.session?.user;

  const profile = await GetProfileByUserId(user?.id);

  const display_name = profile?.data?.[0]?.display_name || '';
  const customer = profile?.data?.[0]?.stripe_customer_id || '';

  return (
    <div>
      <UpdateProfileCard
        user={user}
        email={user.email}
        customer={customer}
        display_name={display_name}
      />
    </div>
  );
}
