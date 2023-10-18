'use client';

import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/Card';

import { UpdateDisplayName, UpdateEmail, UpdatePassword } from './UpdateForms';

import { User } from '@supabase/supabase-js';

interface UpdateProfileCardProps {
  user: User;
  display_name: string;
  email: string;
  customer: string;
}

const UpdateProfileCard = ({ user, display_name, email, customer }: UpdateProfileCardProps) => {
  return (
    <div>
      <Card>
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
};

export default UpdateProfileCard;
