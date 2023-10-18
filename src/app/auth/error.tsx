'use client';
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import config from '@/lib/config/api';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.log('Error', error);

  return (
    <div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{config.errorMessageGeneral}</CardTitle>
            <CardDescription>Click Below to Try Again</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => reset()} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
