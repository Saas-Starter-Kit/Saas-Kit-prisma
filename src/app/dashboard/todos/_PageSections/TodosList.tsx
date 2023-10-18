import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { TodosListT, TodoT } from '@/lib/types/todos';

const TodoCard = ({ title, description, author }: TodoT) => {
  return (
    <Card className="my-4">
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

const TodosList = ({ todos }: TodosListT) => {
  return (
    <div>
      {todos.map((todo) => (
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
