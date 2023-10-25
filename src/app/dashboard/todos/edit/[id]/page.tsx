import { GetTodoById } from '@/lib/API/DatabasePrisma/todos/queries';
import TodosEditForm from '../../_PageSections/TodoEditForm';

export default async function EditTodo({ params }) {
  const todo = await GetTodoById(Number(params.id));

  return (
    <div>
      <TodosEditForm todo={todo} />
    </div>
  );
}
