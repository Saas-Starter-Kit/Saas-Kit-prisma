'use client';

import { useState } from 'react';
import { Icons } from '@/components/Icons';
import { SideBarNav } from './SidebarNav';
import configuration from '@/lib/config/dashboard';

const Sidebar = () => {
  const [isOpen, setOpen] = useState(true);
  const { routes } = configuration;

  return (
    <div
      className={`${
        !isOpen ? 'w-20' : 'w-48'
      } hidden  md:flex flex-col items-center transition-all duration-300 border-r h-screen sticky top-0 p-2 `}
    >
      <SideBarNav routes={routes} isOpen={isOpen} />
      <div className="mt-auto">
        <Icons.SidebarToggle className="cursor-pointer m-4" onClick={() => setOpen(!isOpen)} />
      </div>
    </div>
  );
};

export default Sidebar;
