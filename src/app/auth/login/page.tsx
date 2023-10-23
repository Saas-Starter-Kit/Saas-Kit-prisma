'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { EmailFormSchema, EmailFormValues } from '@/lib/types/validations';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/ui/Input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

import config from '@/lib/config/auth';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const router = useRouter();
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: ''
    }
  });

  const {
    register,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (values: EmailFormValues) => {
    const signInResult = await signIn('email', {
      email: values.email.toLowerCase(),
      redirect: false,
      callbackUrl: config.redirects.toDashboard
    });

    if (!signInResult?.ok) {
      toast.error('Something went wrong');
    }

    router.push(config.redirects.authConfirm);
  };

  const handleGoogleSignIn = async () => {
    const signInResult = await signIn('google');

    if (!signInResult?.ok) {
      toast.error('Something went wrong');
    }

    router.push(config.redirects.authConfirm);
  };

  return (
    <div className="md:w-96">
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to your Account</CardTitle>
          <CardDescription>Enter your email and password below to login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...register('email')}
                        type="text"
                        placeholder="Email"
                        className="bg-background-light dark:bg-background-dark"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div>
                <Button disabled={isSubmitting} className="w-full">
                  {isSubmitting && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
                  <Icons.Mail className="mr-2 h-4 w-4" />
                  Login with Email
                </Button>
              </div>
            </form>
          </Form>

          <div className="space-y-8 mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
              <Icons.Google />
              <span className="ml-2 font-semibold">Sign in with Google</span>
            </Button>
          </div>
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
