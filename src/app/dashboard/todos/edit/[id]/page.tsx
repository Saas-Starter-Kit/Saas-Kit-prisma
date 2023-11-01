import { GetTodoById } from '@/lib/API/Database/todos/queries';
import TodosEditForm from '@/app/dashboard/todos/_PageSections/TodoEditform';

export default async function EditTodo({ params }) {
  const todo = await GetTodoById(Number(params.id));

  return (
    <div>
      <TodosEditForm todo={todo} />
    </div>
  );
}
