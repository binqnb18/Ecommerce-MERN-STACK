// src/components/layout/AppLayout.tsx
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/AppSidebar';

export const AppLayout: FC = () => {
  return (
    <SidebarProvider>
      <div className="app-container">
        <AppSidebar />
        <main className="main-content">
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};