'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SupabaseSignIn, SupabaseSignInWithGoogle } from '@/lib/API/Services/supabase/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { authFormSchema, authFormValues } from '@/lib/types/validations';
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

import config from '@/lib/config/auth';

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<authFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const {
    register,
    reset,
    setError,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (values: authFormValues) => {
    const { error } = await SupabaseSignIn(values.email, values.password);

    if (error) {
      reset({ email: values.email, password: '' });
      setError('email', {
        type: '"root.serverError',
        message: error.message
      });
      setError('password', { type: 'root.serverError', message: '' });

      return;
    }

    router.push(config.redirects.callback);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await SupabaseSignInWithGoogle();

    if (error) {
      setError('email', {
        type: '"root.serverError',
        message: error.message
      });
      setError('password', { type: 'root.serverError' });
      return;
    }

    router.push(config.redirects.callback);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="md:w-96">
      <Card>
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
                      <Input {...register('email')} type="text" placeholder="Email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...register('password')}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          {...field}
                        />

                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer">
                          {showPassword ? (
                            <Icons.EyeOffIcon
                              className="h-6 w-6"
                              onClick={togglePasswordVisibility}
                            />
                          ) : (
                            <Icons.EyeIcon className="h-6 w-6" onClick={togglePasswordVisibility} />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <div className="mb-6 text-xs text-indigo-600 hover:text-indigo-500 underline">
                  <Link href="/auth/forgot-password">Forgot your password?</Link>
                </div>
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
            <div className="text-left text-sm text-gray-500">
              <Link
                href="/auth/magic-link"
                className="leading-7 text-indigo-600 hover:text-indigo-500"
              >
                Email me a login link
              </Link>
            </div>
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
