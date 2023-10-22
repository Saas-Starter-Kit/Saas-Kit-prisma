'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { todoFormSchema, todoFormValues } from '@/lib/types/validations';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icons } from '@/components/Icons';
import { CreateTodo } from '@/lib/API/Database/todos/mutations';
import { toast } from 'react-toastify';
import { User } from '@supabase/supabase-js';

interface TodosCreateFormProps {
  user: User;
  author: string;
}

export default function TodosCreateForm({ user, author }: TodosCreateFormProps) {
  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const {
    reset,
    register,
    setError,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (values: todoFormValues) => {
    const title = values.title;
    const description = values.description;

    const user_id = user?.id;

    const { error } = await CreateTodo(title, description, user_id, author);

    if (error) {
      setError('title', {
        type: '"root.serverError',
        message: error.message
      });
      return;
    }

    reset({ title: '', description: '' });
    toast.success('Todo Submitted');
  };

  return (
    <div>
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">New Todo</CardTitle>
          <CardDescription>Create a Todo with Title and Description</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...register('title')}
                        type="text"
                        className="bg-background-light dark:bg-background-dark"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-background-light dark:bg-background-dark"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} className="w-full">
                {isSubmitting && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
