import DashboardHeader from './DashboardHeader';
import { getUser } from '@/app/auth/03-dal';
import { Toaster } from '@/components/ui/toaster';

import SideBar from './sidebar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

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
