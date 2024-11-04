import React from 'react';
import { Toaster } from '@/components/ui/toaster';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      <Toaster />
    </div>
  );
}

export default Layout;
