import { PackageIcon } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import DashboardNav from './DashboardNav';
import LogoutButton from './logout-button';

export default function SideBar() {
  return (
    <div className="hidden w-80 border-r lg:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <PackageIcon className="h-6 w-6" />
            <span className="">ShopHub</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <DashboardNav />
          </nav>
        </div>
        <div className="border-t p-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
