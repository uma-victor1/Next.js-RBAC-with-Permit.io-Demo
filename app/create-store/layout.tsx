import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { checkPermission } from '@/lib/permit';
import { redirect } from 'next/navigation';

async function Layout({ children }: { children: React.ReactNode }) {
  const permitted = await checkPermission('create', 'Store');
  console.log(permitted, 'permitted');

  if (!permitted) {
    redirect('/dashboard/products');
  }

  return (
    <div>
      <div>{children}</div>
      <Toaster />
    </div>
  );
}

export default Layout;
