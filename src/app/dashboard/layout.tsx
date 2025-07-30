import { NavBar } from '@/components/navBar';
import { AppSidebar } from '../_navigation/sidebar/components/app-sidebar';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { CreateDiscussionForm } from '../../features/discussions/components/create-discussion-form';

import { CreatePostForm } from '@/features/posts/components/create-post-form';
import { RedirectToast } from '@/components/redirect-toast';
import { Suspense } from 'react';

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <SidebarProvider>
        <div className="flex flex-col w-screen min-h-screen bg-gray-100 overflow-x-hidden">
          <NavBar />
          {/* Main content with sidebar */}
          <div className="flex flex-1 h-[calc(100vh-64px)] relative">
            {/* Sidebar: hidden on mobile, visible on md+ */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <AppSidebar />
            </div>

            {/* SidebarTrigger always visible, fixed position top-left */}
            <div className="md:hidden">
              <SidebarTrigger />
            </div>

            {/* Main content fills remaining space */}
            <main className="flex-1 p-6 space-y-3 overflow-y-auto">
              {children}
            </main>

            <RedirectToast />
          </div>
        </div>
      </SidebarProvider>

      <CreateDiscussionForm />
      <Suspense fallback={null}>
        <CreatePostForm />
      </Suspense>
    </>
  );
};

export default DashboardLayout;
