'use client';

import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import { usePathname } from 'next/navigation';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const links = [
  { name: 'New Set', href: '/dashboard/vocabulary/set/create', icon: HomeIcon },
  { name: 'All Sets', href: '/dashboard/vocabulary/folder/update', icon: DocumentTextIcon },
  { name: 'New Folder', href: '/dashboard/vocabulary/folder/create', icon: DocumentTextIcon },
  { name: 'All Folders', href: '/dashboard/vocabulary/folder/all', icon: DocumentTextIcon },
  
];


export default function TopNav() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
