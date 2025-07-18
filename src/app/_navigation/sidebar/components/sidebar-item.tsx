'use client';
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { NavItem } from '../types';

import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';

type SidebarItemProps = {
  item: NavItem;
};

export const SidebarItem = ({ item }: SidebarItemProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filters = Object.fromEntries(searchParams.entries());
  const isNoFilters = Object.keys(filters).length === 0;
  const isActive =
    (item.filterKey === null &&
      isNoFilters &&
      pathname === item.href) ||
    (!!item.filterKey && filters[item.filterKey] !== undefined);

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <Link
          href={item.href}
          className={clsx(
            'text-lg px-4 py-2 rounded-md ',
            isActive && 'font-bold'
          )}
        >
          {item.title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
