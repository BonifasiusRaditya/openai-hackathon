/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter, usePathname } from 'next/navigation';
import cn from 'classnames';

import { FC, useState, useEffect } from 'react';
import { Home, LogOut, User, Menu, X, VideoIcon, Stars } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/app/hooks/useUser';
import { useLocalStorage } from '@mantine/hooks';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  {
    icon: Home,
    label: 'Dashboard',
    path: '/dashboard/teens',
  },
  {
    icon: VideoIcon,
    label: 'Community',
    path: '/dashboard/teens/community',
  },
  {
    icon: User,
    label: 'Profile',
    path: '/dashboard/teens/profile',
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

// Mobile NavItem with a horizontal layout
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
  const { user } = useUser();
  const [progress] = useLocalStorage({ key: 'progress', defaultValue: 0 });

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white px-4 py-3 hidden sm:block fixed w-full top-0 border-b border-b-[#F5F5F5] shadow-md z-20">
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
                  <NavItem key={index} icon={item.icon} label={item.label} path={item.path} isActive={pathname === item.path || (item.path !== '/auth/logout' && pathname.startsWith(item.path) && item.path !== '/dashboard/teens') || (item.path === '/dashboard/teens' && pathname === '/dashboard/teens')} />
                ))}
              </div>
            </div>

            {/* Profile/Progress Section - 1/5 width */}
            <div className="col-span-1 flex justify-end">
              <div className="flex items-center">
                <div className="flex items-center gap-2 bg-amber-50 py-1 px-2 rounded-lg border border-amber-100">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-bold">
                      <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded-l-md">EXP</span>
                      <span className="bg-amber-300 text-blue-800 px-1.5 py-0.5 rounded-r-md">{progress}/60</span>
                    </div>
                    <Stars size={14} className="text-amber-500" />
                  </div>
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={user?.user_metadata?.avatar_url || 'https://github.com/shadcn.png'} alt="Avatar" />
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="bg-white px-4 py-2 sm:hidden fixed w-full top-0 border-b border-b-[#F5F5F5] shadow-md z-30">
        <div className="flex items-center justify-between">
          <Link href="/">
            <img src="/logo-expand.svg" alt="logo" className="h-6 w-auto" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-50 py-0.5 px-2 rounded-lg border border-amber-100">
              <div className="text-xs">
                <span className="bg-blue-600 text-white px-1 py-0.5 rounded-l-md text-xs">Menit</span>
                <span className="bg-amber-300 text-blue-800 px-1 py-0.5 rounded-r-md text-xs">{progress}/60</span>
              </div>
              <Stars size={12} className="text-amber-500" />
              <Avatar className="w-5 h-5">
                <AvatarImage src={user?.user_metadata?.avatar_url || 'https://github.com/shadcn.png'} alt="Avatar" />
              </Avatar>
            </div>
            <button onClick={toggleMenu} className="p-1.5 rounded-md hover:bg-gray-100" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-[54px] bg-white z-20 sm:hidden border-b border-gray-200 shadow-md">
          <div className="flex flex-col p-4">
            {navItems.map((item, index) => (
              <MobileNavItem key={index} icon={item.icon} label={item.label} path={item.path} isActive={pathname === item.path || (item.path !== '/auth/logout' && pathname.startsWith(item.path) && item.path !== '/dashboard/teens') || (item.path === '/dashboard/teens' && pathname === '/dashboard/teens')} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
