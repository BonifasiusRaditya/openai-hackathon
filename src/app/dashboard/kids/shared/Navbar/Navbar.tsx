/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter, usePathname } from 'next/navigation';
import cn from 'classnames';

import { FC, useState, useEffect } from 'react';
import { Home, LogOut, User, Menu, X, BookOpen, Stars } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  {
    icon: Home,
    label: 'Dashboard',
    path: '/dashboard/kids',
  },
  {
    icon: BookOpen,
    label: 'Community',
    path: '/dashboard/kids/community',
  },
  {
    icon: User,
    label: 'Profile',
    path: '/dashboard/kids/profile',
  },
  {
    icon: LogOut,
    label: 'Logout',
    path: '/auth/logout',
  },
];

interface NavItemProps {
  icon: FC<{ fill: string; width: number; height: number }>;
  label: string;
  path: string;
  isActive: boolean;
}

const NavItem: FC<NavItemProps> = ({ icon: Icon, label, path, isActive }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(path)} className={cn('cursor-pointer transition-all flex flex-col items-center gap-1 w-20 py-1.5 rounded-md mx-1', isActive ? 'text-primary-yellow bg-yellow-50' : 'text-[#5D5D5D] hover:bg-gray-100 active:bg-gray-200')}>
      <Icon fill={isActive ? '#d9a821' : '#5D5D5D'} width={20} height={20} />
      <span className="text-xs font-semibold">{label}</span>
    </div>
  );
};

const MobileNavItem: FC<NavItemProps> = ({ icon: Icon, label, path, isActive }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(path)} className={cn('cursor-pointer transition-all flex items-center gap-3 py-3 px-4 rounded-md w-full', isActive ? 'text-primary-yellow bg-yellow-50' : 'text-[#5D5D5D] hover:bg-gray-100 active:bg-gray-200')}>
      <Icon fill={isActive ? '#d9a821' : '#5D5D5D'} width={20} height={20} />
      <span className="font-semibold">{label}</span>
    </div>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white px-4 py-3 hidden sm:block border-b border-b-[#F5F5F5] shadow-md z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-5 items-center">
            {/* Logo Section - 1/5 width */}
            <div className="col-span-1 flex items-center">
              <Link href="/" className="flex items-center">
                <img src="/logo-expand.svg" alt="logo" className="h-7 w-auto" />
              </Link>
            </div>

            {/* Navigation Links - 3/5 width, centered */}
            <div className="col-span-3 flex justify-center">
              <div className="flex items-center">
                {navItems.map((item, index) => (
                  <NavItem key={index} icon={item.icon} label={item.label} path={item.path} isActive={pathname === item.path || (item.path !== '/auth/logout' && pathname.startsWith(item.path) && item.path !== '/dashboard/kids') || (item.path === '/dashboard/kids' && pathname === '/dashboard/kids')} />
                ))}
              </div>
            </div>

            {/* Profile/XP Section - 1/5 width */}
            <div className="col-span-1 flex justify-end">
              <div className="flex items-center">
                <div className="flex items-center gap-2 bg-amber-50 py-1 px-2 rounded-lg border border-amber-100">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-bold">
                      <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded-l-md">EXP</span>
                      <span className="bg-amber-300 text-blue-800 px-1.5 py-0.5 rounded-r-md">0/60</span>
                    </div>
                    <Stars size={14} className="text-amber-500" />
                  </div>
                  <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-inner">
                    <User size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="bg-white px-4 py-2 sm:hidden border-b border-b-[#F5F5F5] shadow-md z-30">
        <div className="flex items-center justify-between">
          <Link href="/">
            <img src="/logo-expand.svg" alt="logo" className="h-6 w-auto" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-50 py-0.5 px-2 rounded-lg border border-amber-100">
              <div className="text-xs">
                <span className="bg-blue-600 text-white px-1 py-0.5 rounded-l-md text-xs">EXP</span>
                <span className="bg-amber-300 text-blue-800 px-1 py-0.5 rounded-r-md text-xs">0/60</span>
              </div>
              <Stars size={12} className="text-amber-500" />
            </div>
            <button onClick={toggleMenu} className="p-1.5 rounded-md hover:bg-gray-100" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>



      {isMenuOpen && (
        <div className="absolute inset-x-0 top-[54px] bg-white z-20 sm:hidden border-b border-gray-200 shadow-md">
          <div className="flex flex-col p-4">
            {navItems.map((item, index) => (
              <MobileNavItem key={index} icon={item.icon} label={item.label} path={item.path} isActive={pathname === item.path || (item.path !== '/auth/logout' && pathname.startsWith(item.path) && item.path !== '/dashboard/kids') || (item.path === '/dashboard/kids' && pathname === '/dashboard/kids')} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
