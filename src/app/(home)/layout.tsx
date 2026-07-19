import HomeNavbar from '@/components/ui/HomeNavbar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeNavbar />
      <div className="mt-20">{children}</div>
    </>
  );
}
