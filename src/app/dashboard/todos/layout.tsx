import { Separator } from '@/components/ui/Separator';
import { TodosNav } from './_PageSections/TodosNav';
import TodosHeader from './_PageSections/TodosHeader';
import configuration from '@/lib/config/dashboard';
import { LayoutProps } from '@/lib/types/types';

export default function Layout({ children }: LayoutProps) {
  const {
    subroutes: { todos }
  } = configuration;

  return (
    <div className="lg:max-w-lg">
      <div>
        <TodosHeader />
        <Separator className="my-6" />
        <TodosNav items={todos} />

        <div>{children}</div>
      </div>
    </div>
  );
}
