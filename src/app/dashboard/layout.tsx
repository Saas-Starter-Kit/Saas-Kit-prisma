import SideBar from './_PageSections/SideBar';
import Header from './_PageSections/Header';
import { LayoutProps } from '@/lib/types/types';
import { GetUser } from '@/lib/API/Database/user/queries';
import config from '@/lib/config/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: LayoutProps) {
  const user = await GetUser();
  if (!user) redirect(config.redirects.requireAuth);

  const display_name = user?.display_name;
  const email = user?.email;

  const avatar_url = '';

  return (
    <main className="grid md:grid-cols-[auto_1fr]">
      <SideBar />
      <div>
        <Header email={email} display_name={display_name} avatar_url={avatar_url} />
        <div className="m-6">{children}</div>
      </div>
    </main>
  );
}
