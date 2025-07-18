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
import { getAuth } from '@/features/auth/queries/get-auth';
import { Separator } from '@/components/ui/separator';
import { CreateButton } from './create-button';
import { Suspense } from 'react';

// ✅ Suspense wrapper for SidebarItems
function SidebarItemsList() {
  return (
    <Suspense fallback={null}>
      <>
        {navItems.map((item) => (
          <SidebarItem key={item.title} item={item} />
        ))}
      </>
    </Suspense>
  );
}

function AuthSidebarItems() {
  return (
    <Suspense fallback={null}>
      <>
        {authNavItems.map((item) => (
          <SidebarItem key={item.title} item={item} />
        ))}
      </>
    </Suspense>
  );
}

export async function AppSidebar() {
  const { user: authUser } = await getAuth();

  return (
    <Sidebar className="h-full">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold text-black py-6">
            Forum
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authUser && <CreateButton />}

              {/* ✅ Wrapped nav items in Suspense */}
              <SidebarItemsList />

              <Separator />

              {/* ✅ Wrapped auth-only nav items in Suspense */}
              {authUser && <AuthSidebarItems />}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
