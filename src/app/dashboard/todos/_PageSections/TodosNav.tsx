'use client';
import Link from 'next/link';
import { NavItem } from '@/lib/types/types';
import { usePathname } from 'next/navigation';

interface TodosNavProps {
  items: NavItem[];
}

export function TodosNav({ items }: TodosNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6 mb-6">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.link}
          className={`text-sm font-medium transition-colors ${
            item.link !== pathname
              ? 'hover:text-primary hover:underline underline-offset-8 decoration-2 decoration-blue-500'
              : 'text-primary underline underline-offset-8 decoration-2 decoration-blue-500'
          }`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
