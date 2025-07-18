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

// Menu items.""

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
              {navItems.map((item) => (
                <SidebarItem key={item.title} item={item} />
              ))}
              <Separator />
              {authUser &&
                authNavItems.map((item) => (
                  <SidebarItem key={item.title} item={item} />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
