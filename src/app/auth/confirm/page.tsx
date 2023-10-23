'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const AuthConfirm = () => {
  const router = useRouter();

  return (
    <Card className="bg-background-light dark:bg-background-dark">
      <CardHeader>
        <CardTitle>Request Submitted</CardTitle>
        <CardDescription>Please check your email</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" onClick={() => router.push('/auth/login')}>
          Back to login
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthConfirm;
