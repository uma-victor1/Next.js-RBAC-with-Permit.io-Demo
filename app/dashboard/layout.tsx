import DashboardHeader from './DashboardHeader';

import { Toaster } from '@/components/ui/toaster';

import SideBar from './sidebar';
import { checkPermission } from '@/lib/permit';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const permitted = await checkPermission('read', 'Dashboard');
  console.log(permitted, 'permitted');

  if (!permitted) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <div className="flex w-full flex-col">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
