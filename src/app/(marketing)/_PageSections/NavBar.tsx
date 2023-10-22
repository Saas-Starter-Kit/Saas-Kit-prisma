'use client';
import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/Navigation';

import Link from 'next/link';

import { MobileNav, NavProps } from '@/components/MobileNav';

export const Nav = ({ items }: NavProps) => {
  return (
    <div>
      <NavigationMenu className="hidden md:inline-block">
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item.title}>
              <Link href={item.link} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <MobileNav items={items} />
    </div>
  );
};
