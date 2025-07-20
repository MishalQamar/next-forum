import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { authNavItems, navItems } from '../constants';
import { SidebarItem } from './sidebar-item';

import { CreateButton } from './create-button';
import { Suspense } from 'react';
import { getAuth } from '@/features/auth/actions/get-auth';

export async function AppSidebar() {
  const { user: authUser } = await getAuth();

  return (
    <Sidebar className="h-full w-60">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold text-black py-6">
            Forum
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authUser && <CreateButton />}
              <Suspense fallback={null}>
                {navItems.map((item) => (
                  <SidebarItem key={item.title} item={item} />
                ))}
                {authUser &&
                  authNavItems.map((item) => (
                    <SidebarItem key={item.title} item={item} />
                  ))}
              </Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
