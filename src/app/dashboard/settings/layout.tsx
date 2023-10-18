import { Separator } from '@/components/ui/Separator';
import { SettingsNav } from './_PageSections/SettingsNav';
import SettingsHeader from './_PageSections/SettingsHeader';
import configuration from '@/lib/config/dashboard';
import { LayoutProps } from '@/lib/types/types';

export default function SettingsLayout({ children }: LayoutProps) {
  const {
    subroutes: { settings }
  } = configuration;

  return (
    <div className="md:max-w-2xl">
      <SettingsHeader />
      <Separator className="my-6" />
      <SettingsNav items={settings} />
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
}
