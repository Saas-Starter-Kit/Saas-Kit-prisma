import { SupabaseUser } from '@/lib/API/Services/supabase/user';
import { GetProfileByUserId } from '@/lib/API/Database/profile/queries';

import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/Card';
import { UpdateDisplayName, UpdateEmail, UpdatePassword } from '../_PageSections/UpdateForms';
import { getUser } from '@/lib/API/Services/auth/user';

export default async function ProfileForm() {
  const user = await getUser();

  const display_name = user?.display_name || '';
  const customer = user?.stripe_customer_id || '';
  const email = user?.email;

  return (
    <div>
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader>
          <CardTitle>Update Account</CardTitle>
          <CardDescription>Update Account display name, email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateDisplayName display_name={display_name} user={user} />
          <UpdateEmail email={email} customer={customer} />
          <UpdatePassword />
        </CardContent>
      </Card>
    </div>
  );
}
