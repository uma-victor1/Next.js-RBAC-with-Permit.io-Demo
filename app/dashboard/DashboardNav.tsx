'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Badge } from '@/components/ui/badge';

export default function DashboardNav() {
  const navLinks = [
    { title: 'Products', href: '/dashboard/products', badge: 0 },
    { title: 'Orders', href: '/dashboard/orders', badge: 3 },
    { title: 'Customers', href: '#', badge: 0 },
    { title: 'Analytics', href: '#', badge: 0 },
  ];
  const pathname = usePathname();

  return (
    <div>
      {navLinks.map((link) => (
        <Link
          prefetch={true}
          className={`${
            pathname === link.href
              ? 'active bg-gray-100 text-gray-900 hover:text-gray-900'
              : ''
          } flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900`}
          href={link.href}
          key={link.title}
        >
          <span>{link.title}</span>
          {link.badge > 0 && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {link.badge}
            </Badge>
          )}
        </Link>
      ))}
    </div>
  );
}
