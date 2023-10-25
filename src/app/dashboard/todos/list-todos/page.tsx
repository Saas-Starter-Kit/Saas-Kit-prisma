import { GetAllTodos } from '@/lib/API/DatabasePrisma/todos/queries';
import TodosList from '../_PageSections/TodosList';

export default async function ListTodos() {
  const todos = await GetAllTodos();

  return (
    <div>
      <TodosList todos={todos} />
    </div>
  );
}
