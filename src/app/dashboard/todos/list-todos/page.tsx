import { GetAllTodos } from '@/lib/API/Database/todos/Server/queries';
import TodosList from '../_PageSections/TodosList';

export default async function ListTodos() {
  const todos = await GetAllTodos();

  return (
    <div>
      <TodosList todos={todos?.data} />
    </div>
  );
}
