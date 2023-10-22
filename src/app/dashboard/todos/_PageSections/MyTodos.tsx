'use client';

import { Card, CardDescription, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DeleteTodo } from '@/lib/API/Database/todos/Browser/mutations';
import { Button, buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { TodoT, TodosListT } from '@/lib/types/todos';

const TodoCard = ({ id, title, description }: TodoT) => {
  const router = useRouter();

  const Delete = async () => {
    const { error } = await DeleteTodo(id);

    if (error) {
      toast.error('Something Went Wrong, please try again');
      return;
    }
    toast.success('Todo Deleted');
    router.refresh();
  };

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
        <Button onClick={Delete} variant="destructive">
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

const MyTodos = ({ todos }: TodosListT) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoCard key={todo.id} id={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
};

export default MyTodos;
