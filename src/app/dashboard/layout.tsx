import { NavBar } from '@/components/navBar';
import { AppSidebar } from '../_navigation/sidebar/components/app-sidebar';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { CreateDiscussionForm } from '../../features/discussions/components/create-discussion-form';

import { Header } from '@/components/header';
import { CreatePostForm } from '@/features/posts/components/create-post-form';
import { RedirectToast } from '@/components/redirect-toast';

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <SidebarProvider>
        {/* make sure the outermost wrapper is truly full-width */}
        <div className="flex flex-col w-screen min-h-screen bg-gray-100 overflow-x-hidden">
          <NavBar />
          <div className="grid grid-cols-[auto_1fr] flex-1 h-[calc(100vh-64px)]">
            <AppSidebar />
            <main className="p-6 space-y-3 overflow-y-auto">
              <SidebarTrigger className="mt-[-1.5rem]" />
              {/*  <Header /> */}
              {children}
            </main>
            <RedirectToast />
          </div>
        </div>
      </SidebarProvider>
      <CreateDiscussionForm />
      <CreatePostForm />
    </>
  );
};

export default DashboardLayout;
