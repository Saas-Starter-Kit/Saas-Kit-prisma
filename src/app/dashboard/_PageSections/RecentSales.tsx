import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export function RecentSales() {
  return (
    <Card className="bg-background-light dark:bg-background-dark">
      <CardHeader>
        <CardTitle>Recent Sales:</CardTitle>
        <CardDescription>Sales made within the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$1,999.00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Jackson Lee</p>
              <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$39.00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
              <p className="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$299.00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>WK</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">William Kim</p>
              <p className="text-sm text-muted-foreground">will@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$99.00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$39.00</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
