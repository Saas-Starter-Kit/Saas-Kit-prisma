'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { TodoT } from '@/lib/types/todos';
import { GetAllTodos } from '@/lib/API/Database/todos/queries';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import config from '@/lib/config/api';

const TodoCard = ({ title, description, author }: TodoT) => {
  return (
    <Card className="my-4 bg-background-light dark:bg-background-dark">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>By: {author ? author : 'anonymous'}</div>
      </CardContent>
    </Card>
  );
};

const TodosList = () => {
  const { data, error } = useSWR(config.swrKeys.getAllTodos, GetAllTodos);
  if (error) toast.error('Something Went Wrong, please try again');

  return (
    <div>
      {data?.data?.map((todo) => (
        <TodoCard
          key={todo.title}
          title={todo.title}
          author={todo.author}
          description={todo.description}
        />
      ))}
    </div>
  );
};

export default TodosList;
