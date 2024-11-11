import { Button } from '@/components/ui/button';
import { PackageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import React from 'react';
import { getUser } from '../auth/03-dal';

export default async function DashboardHeader() {
  const user = await getUser();
  if (!user) {
    throw new Error('user not found');
  }
  return (
    <header className="flex h-14 items-center border-b px-4 md:gap-4">
      <Link
        prefetch={true}
        className="flex items-center rounded-md bg-gray-100 px-2 py-2 lg:hidden"
        href="#"
      >
        <PackageIcon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <h1 className="hidden text-lg font-semibold md:block">Dashboard</h1>
      <div className="ml-auto flex items-center gap-4">
        <form>
          <div className="relative">
            <Input
              className="bg-gray-100/60 md:w-[200px]"
              placeholder="Search orders..."
              type="search"
            />
          </div>
        </form>
        {user.email}
        <Button className="rounded-full" size="icon" variant="ghost">
          <Image
            alt="Avatar"
            className="rounded-full"
            height="32"
            src="/placeholder.svg"
            style={{
              aspectRatio: '32/32',
              objectFit: 'cover',
            }}
            width="32"
          />
          <span className="sr-only">View profile</span>
        </Button>
      </div>
    </header>
  );
}
