'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icons } from '@/components/Icons';

const AuthConfirm = () => {
  const router = useRouter();

  return (
    <Card className="bg-background-light dark:bg-background-dark">
      <CardHeader>
        <div className="py-4 flex justify-center">
          <Icons.CheckCircle2 color="green" size={48} />
        </div>

        <CardTitle>Request Successfully Submitted</CardTitle>
        <CardDescription>Please check your email to finish authentication</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={() => router.push('/auth/login')}>
          Back to login
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthConfirm;
