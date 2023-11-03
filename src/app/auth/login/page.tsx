import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card';
import Link from 'next/link';

import AuthForm from '../_PageSections/AuthForm';
import prisma from '@/lib/API/Services/init/prisma';
import { PrismaDBError } from '@/lib/utils/error';

export default async function Login() {
  const GetAllTodos = async () => {
    try {
      const todos = await prisma.todo.findMany({
        take: 10
      });

      return todos;
    } catch (err) {
      PrismaDBError(err);
    }
  };

  await GetAllTodos();

  return (
    <div className="md:w-96">
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to your Account</CardTitle>
          <CardDescription>Enter your email and password below to login</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm submit_text="Login with Email" />
        </CardContent>

        <CardFooter>
          <div className="flex flex-col">
            <div className="text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link href="/auth/signup" className="leading-7 text-indigo-600 hover:text-indigo-500">
                Sign up now.
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
