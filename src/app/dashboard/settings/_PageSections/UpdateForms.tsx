'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/Form';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/Icons';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  DisplayNameFormValues,
  DisplayNameFormSchema,
  EmailFormSchema,
  EmailFormValues
} from '@/lib/types/validations';

import { UpdateStripeCustomerEmail } from '@/lib/API/Services/stripe/customer';
import { useRouter } from 'next/navigation';

import { UpdateUserName, UpdateUserEmail } from '@/lib/API/Database/user/mutations';
interface UpdateDisplayNamePropsI {
  display_name: string;
}

export const UpdateDisplayName = ({ display_name }: UpdateDisplayNamePropsI) => {
  const router = useRouter();

  const form = useForm<DisplayNameFormValues>({
    resolver: zodResolver(DisplayNameFormSchema),
    defaultValues: {
      display_name
    }
  });

  const {
    setError,
    register,
    formState: { isSubmitting }
  } = form;

  const handleSubmit = async (data: DisplayNameFormValues) => {
    const display_name = data.display_name;

    const props = { display_name };

    try {
      await UpdateUserName(props);
    } catch (err) {
      setError('display_name', {
        type: '"root.serverError',
        message: 'Something went wrong'
      });
      throw err;
    }

    router.refresh();
    toast.success('Update Completed');
  };

  return (
    <div className="mt-4 mb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormMessage className="py-2" />
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    {...register('display_name')}
                    className="bg-background-light dark:bg-background-dark"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} className="mt-4">
            {isSubmitting && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

interface UpdateEmailPropsI {
  email: string;
  customer: string;
}

export const UpdateEmail = ({ email, customer }: UpdateEmailPropsI) => {
  const router = useRouter();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email
    }
  });

  const {
    setError,
    register,
    formState: { isSubmitting }
  } = form;

  const handleSubmit = async (data: EmailFormValues) => {
    const email = data.email;
    const props = { email };

    try {
      await UpdateUserEmail(props);
    } catch (err) {
      setError('email', {
        type: '"root.serverError',
        message: 'Something went wrong'
      });
      throw err;
    }

    try {
      const props = { customer, email };
      await UpdateStripeCustomerEmail(props);
    } catch (e) {
      toast.error('Stripe Update Failed, please contact support');
      throw e;
    }

    router.refresh();
    toast.success('Update Email Sent, confirm email to complete Update');
  };

  return (
    <div className="mt-4 mb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...register('email')}
                    className="bg-background-light dark:bg-background-dark"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is the email associated with your account</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} className="mt-4">
            {isSubmitting && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Update Email
          </Button>
        </form>
      </Form>
    </div>
  );
};
