import Link from 'next/link';
import { MenuIcon } from '@/components/ui/icons';
import { ChevronDown, LayoutDashboard, ShoppingBag, Store } from 'lucide-react';
import { cookies } from 'next/headers';
import { decrypt } from '../auth/02-stateless-session';
import LogoutButton from '../dashboard/logout-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const links = [
  { href: '#', title: 'Home' },
  { href: '#', title: 'About' },
  { href: '#', title: 'Services' },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="border-b border-gray-100">
        <div className="container mx-auto flex max-w-7xl items-center justify-end p-4 md:justify-between md:px-6">
          <header className="flex h-14 items-center px-4 lg:px-6">
            <Link className="mr-2 flex items-center justify-center" href="/">
              <ShoppingBag className="h-6 w-6" />
              <span className="ml-2 text-lg font-semibold">ShopHub</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              {links.map((link) => (
                <Link
                  prefetch={true}
                  className="text-sm font-medium transition-colors hover:text-gray-900"
                  href={link.href}
                  key={link.title}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </header>
          <div className="hidden items-center space-x-4 md:flex">
            <AuthButton />
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              className="inline-flex h-8 items-center rounded-md border border-gray-200 bg-white px-3 text-sm font-medium"
              href="/login"
            >
              Login
            </Link>
            <button className="inline-flex rounded-md md:hidden" type="button">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto mt-36 flex max-w-7xl justify-center">
        {children}
      </main>
    </div>
  );
}

async function AuthButton() {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  return (
    <div>
      {session?.userId ? (
        <div className="flex items-center space-x-4">
          <LogoutButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open store menu</span>
                <Store className="h-4 w-4" />
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/create-store" className="flex items-center">
                  <Store className="mr-2 h-4 w-4" />
                  <span>Create Store</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/products" className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="hidden items-center space-x-4 md:flex">
          <Link
            className="rounded-md border px-4 py-1.5 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="rounded-md border px-4 py-1.5 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white"
            href="/signup"
          >
            SignUp
          </Link>
        </div>
      )}
    </div>
  );
}
