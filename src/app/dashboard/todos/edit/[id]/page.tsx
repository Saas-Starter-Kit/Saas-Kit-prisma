import { GetTodoById } from '@/lib/API/Database/todos/Server/queries';
import TodosEditForm from '../../_PageSections/TodosEditForm';

export default async function EditTodo({ params }) {
  const todo = await GetTodoById(params.id);

  return (
    <div>
      <TodosEditForm todo={todo?.data?.[0]} />
    </div>
  );
}
