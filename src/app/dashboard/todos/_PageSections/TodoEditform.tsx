'use client';

import { useRouter } from 'next/navigation';
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
import { Todo } from '@prisma/client';
import config from '@/lib/config/api';
import configuration from '@/lib/config/auth';

interface EditFormProps {
  todo: Todo;
}

export default function TodosEditForm({ todo }: EditFormProps) {
  const router = useRouter();
  const { title, description, id } = todo;

  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title,
      description
    }
  });

  const {
    register,
    reset,
    formState: { isSubmitting, isSubmitted }
  } = form;

  const onSubmit = async (values: todoFormValues) => {
    const title = values.title;
    const description = values.description;
    const todo_id = Number(id);

    const props = { id: todo_id, title, description };

    try {
      await UpdateTodo(props);
    } catch (err) {
      toast.error(config.errorMessageGeneral);
      throw err;
    }

    reset({ title: '', description: '' });
    toast.success('Todo Updated');
    router.refresh();
    router.push(configuration.redirects.toMyTodos);
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
                      <Input
                        {...register('title')}
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
