'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Home, LogIn, LogOut, LogOutIcon, Menu, X, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HomeNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Scroll animation setup
  const { scrollY } = useScroll();
  const paddingY = useTransform(scrollY, [0, 100], [24, 10]); // Reduced from [40, 12] to [24, 10]
  const logoHeight = useTransform(scrollY, [0, 100], [8, 7]); // Controls logo size from h-8 to h-7
  const boxShadow = useTransform(scrollY, [0, 100], ['0 0 0 rgba(0,0,0,0)', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)']);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching user:', error);
          setUser(null);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [supabase.auth]);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (isMenuOpen && navbarRef.current && menuRef.current && !navbarRef.current.contains(event.target as Node) && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    // Add event listener for touch events as well for mobile devices
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const navItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/dashboard',
    },
  ];

  // Add conditional login/logout button
  if (!isLoading) {
    if (user) {
      // User is logged in, show logout button
      navItems.push({
        icon: LogOut,
        label: 'Logout',
        path: '/auth/logout',
      });
    } else {
      // User is logged out, show login button
      navItems.push({
        icon: LogIn,
        label: 'Login',
        path: '/auth/login',
      });
    }
  }

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className="bg-white px-4 sm:px-8 md:px-16 lg:px-32 hidden sm:block fixed w-full top-0 border-b-[#F5F5F5] z-20"
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
          boxShadow,
        }}
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.img src="/logo-expand.svg" alt="logo" style={{ height: useTransform(logoHeight, (h) => `${h * 0.25}rem`) }} className="w-auto" />
          </Link>
          <div className="flex items-center gap-4 pr-10">
            {!isLoading && user ? (
              <>
                <button onClick={() => router.push('/dashboard')} className="bg-primary-yellow border cursor-pointer text-white px-6 font-bold h-10 rounded-lg flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  DASHBOARD
                </button>
                <button onClick={() => router.push('/auth/logout')} className="bg-white border cursor-pointer border-gray-300 text-gray-700 px-6 font-bold h-10 rounded-lg">
                  <LogOutIcon className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => router.push('/auth/login')} className="bg-primary-yellow border cursor-pointer text-white px-6 font-bold h-10 rounded-lg flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  TRY DEMO
                </button>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        ref={navbarRef}
        className="bg-white sm:hidden fixed w-full top-0 border-b border-b-[#F5F5F5] z-30"
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
          paddingLeft: 16, // px-4
          paddingRight: 16, // px-4
          boxShadow,
        }}
      >
        <div className="flex items-center relative justify-between">
          <Link href="/">
            <motion.img src="/logo-expand.svg" alt="logo" style={{ height: useTransform(logoHeight, (h) => `${h * 0.175}rem`) }} className="w-auto" />
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-gray-100" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div ref={menuRef} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute inset-x-0 top-full bg-white z-20 sm:hidden border-b border-gray-200 shadow-md">
              <div className="flex flex-col p-4 gap-2">
                {!isLoading && user ? (
                  <>
                    <button onClick={() => router.push('/dashboard')} className="bg-primary-yellow w-full cursor-pointer text-white py-2.5 px-4 font-bold rounded-md flex items-center justify-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                    <button onClick={() => router.push('/auth/logout')} className="bg-white border w-full cursor-pointer border-gray-300 text-gray-700 py-2.5 px-4 font-bold rounded-md flex items-center justify-center gap-2">
                      <LogOutIcon className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => router.push('/auth/login')} className="bg-primary-yellow border w-full cursor-pointer text-white py-2.5 px-4 font-bold rounded-md flex items-center justify-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Try Demo
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  );
}
