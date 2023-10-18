'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const AuthRequired = () => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authentication Required </CardTitle>
        <CardDescription>Please Sign in to view this page.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" onClick={() => router.push('/auth/login')}>
          Click Here to sign in
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthRequired;
