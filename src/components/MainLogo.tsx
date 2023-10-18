import siteConfig from '@/lib/config/site';
import Link from 'next/link';
import { Icons } from '@/components/Icons';

export const MainLogoText = () => {
  return (
    <Link href="/" className="items-center space-x-2 md:flex">
      <Icons.Command />
      <span className="font-bold hidden md:inline-block">{siteConfig.alt_name}</span>
    </Link>
  );
};

export const MainLogoIcon = () => {
  return (
    <Link href="/" className="w-4 h-4">
      <Icons.Command />
    </Link>
  );
};
