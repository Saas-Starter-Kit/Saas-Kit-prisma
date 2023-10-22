'use client';

import { Card, CardDescription, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DeleteTodo } from '@/lib/API/Database/todos/mutations';
import { Button, buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { toast } from 'react-toastify';
import { TodoT } from '@/lib/types/todos';
import { GetTodosByUserId } from '@/lib/API/Database/todos/queries';
import useSWR, { useSWRConfig } from 'swr';
import config from '@/lib/config/api';

interface TodoCardProps extends TodoT {
  deleteTodo: (id: string) => Promise<void>;
}

const TodoCard = ({ id, title, description, deleteTodo }: TodoCardProps) => {
  return (
    <Card className="bg-background-light dark:bg-background-dark">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={`/dashboard/todos/edit/${id}`}
          className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'mr-6')}
        >
          Edit
        </Link>
        <Button onClick={() => deleteTodo(id)} variant="destructive">
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default function MyTodos() {
  const { data, error } = useSWR(config.swrKeys.getMyTodos, GetTodosByUserId);
  const { mutate } = useSWRConfig();

  if (error) toast.error('Something Went Wrong, please try again');

  const deleteTodo = async (id: string) => {
    const { error } = await DeleteTodo(id);

    if (error) {
      toast.error('Something Went Wrong, please try again');
      return;
    }
    toast.success('Todo Deleted');

    mutate('GetTodos');
  };

  return (
    <div>
      {data?.data?.map((todo) => (
        <TodoCard
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}
