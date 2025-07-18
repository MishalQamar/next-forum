'use client';
import { Button } from '@/components/ui/button';
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

import { useDiscussionStore } from '@/features/discussions/hooks/use-disussion-store';

import { usePostStore } from '@/features/posts/hooks/use-post-store';
import { usePathname } from 'next/navigation';

export const CreateButton = () => {
  const pathname = usePathname();
  console.log('focus me', pathname);
  const showDiscussionForm = useDiscussionStore(
    (state) => state.showDiscussionForm
  );
  const showPostForm = usePostStore((state) => state.showPostForm);
  const visible = usePostStore((state) => state.visible);
  console.log(visible);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Button
          variant="default"
          onClick={
            pathname === '/dashboard'
              ? showDiscussionForm
              : showPostForm
          }
          className="hover:bg-primary/90 hover:text-primary-foreground"
        >
          {pathname === '/dashboard'
            ? 'New Discussion'
            : 'Reply to discussion'}
        </Button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
