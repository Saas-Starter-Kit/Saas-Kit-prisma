'use client';

import { Card, CardDescription, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DeleteTodo } from '@/lib/API/DatabasePrisma/todos/mutations';
import { Button, buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import config from '@/lib/config/api';
import { Todos } from '@prisma/client';

interface TodoCardProps {
  todo: Todos;
}

interface MyTodosProps {
  todos: Todos[];
}

const TodoCard = ({ todo }: TodoCardProps) => {
  const router = useRouter();

  const { id, title, description } = todo;

  const Delete = async () => {
    const todo_id = Number(id);
    try {
      await DeleteTodo({ id: todo_id });
    } catch (err) {
      toast.error(config.errorMessageGeneral);
      throw err;
    }

    toast.success('Todo Deleted');
    router.refresh();
  };

  return (
    <Card>
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
        <Button onClick={Delete} variant="destructive">
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

const MyTodos = ({ todos }: MyTodosProps) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default MyTodos;
