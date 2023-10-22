'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { todoFormSchema, todoFormValues } from '@/lib/types/validations';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Icons } from '@/components/Icons';
import { UpdateTodo } from '@/lib/API/Database/todos/mutations';
import { toast } from 'react-toastify';
import { TodoT } from '@/lib/types/todos';
import { GetTodoById } from '@/lib/API/Database/todos/queries';

export default function TodosEditForm() {
  const router = useRouter();
  const params = useParams();
  const todo_id = params.id as string;

  const GetTodo = async () => {
    const res = await GetTodoById(todo_id);

    const { title, description } = res?.data?.[0];
    reset({ title, description });
  };

  useEffect(() => {
    GetTodo();
  }, []);

  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const {
    register,
    reset,
    setError,
    formState: { isSubmitting, isSubmitted }
  } = form;

  const onSubmit = async (values: todoFormValues) => {
    const title = values.title;
    const description = values.description;

    const props = { id: todo_id, title, description };
    const { error } = await UpdateTodo(props);

    if (error) {
      setError('title', {
        type: '"root.serverError',
        message: error.message
      });
      return;
    }

    reset({ title: '', description: '' });
    toast.success('Todo Updated');
    router.refresh();
    router.push('/dashboard/todos/my-todos');
  };

  return (
    <div>
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update Todo</CardTitle>
          <CardDescription>Update Todo with a new Title or Description</CardDescription>
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
                      <Input {...register('title')} className="bg-background-light dark:bg-background-dark" {...field} />
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
                      <Textarea className="bg-background-light dark:bg-background-dark" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting || isSubmitted} className="w-full">
                {isSubmitting && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
