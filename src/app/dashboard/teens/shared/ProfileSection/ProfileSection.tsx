'use client';
import { useUser } from '@/app/hooks/useUser';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocalStorage } from '@mantine/hooks';

export default function ProfileSection() {
  const { user, isLoading } = useUser();
  const [progress] = useLocalStorage({ key: 'progress', defaultValue: 0 });
  return (
    <div className="-mx-3 -mt-10 lg:mx-0 lg:mt-8">
      <div className="w-full gap-6 flex flex-col relative px-8 pt-16 lg:pt-10 lg:pb-10 pb-8 lg:rounded-xl rounded-b-3xl lg:h-fit h-fit bg-primary-yellow">
        <BoxLeft />
        <BoxTop />
        <div className="flex justify-between">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={'https://github.com/shadcn.png'} alt="Avatar Image" />
            </Avatar>

            <div className="flex flex-col gap-1 text-white">
              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-50 rounded-full" />
                  <Skeleton className="h-6 w-50 rounded-full" />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold">Halo, {user?.user_metadata.full_name}! 👋</h3>
                  <p className="lg:text-[15px] sm:text-xs">{user?.email}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-full h-2 relative flex items-center justify-between gap-2">
            <div className="rounded-l-full bg-yellow-300 absolute left-0 h-full" style={{ width: `${(progress / 60) * 100}%` }}></div>
            <div className="bg-yellow-700/50 rounded-full w-full h-2"></div>
            <p className="text-white text-sm w-28 text-end font-bold">{progress} / 60 Menit</p>
          </div>
          <p className="text-white text-sm">Progress Hari Ini</p>
        </div>
      </div>
    </div>
  );
}

const BoxLeft = () => {
  return (
    <div
      className="size-[230px] lg:size-[217px] rounded-3xl absolute -left-20 top-6 lg:top-2 lg:-left-24"
      style={{
        transform: 'rotate(-48.471deg)',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.00) 0.01%, rgba(255, 255, 255, 0.03) 48.21%, rgba(255, 255, 255, 0.10) 100%)',
      }}
    />
  );
};

const BoxTop = () => {
  return (
    <div
      className={`absolute rounded-full  size-[103px] lg:size-[204px] left-1/2 -translate-x-1/3 -top-1/4 lg:-top-full`}
      style={{
        transform: `rotate(-67.677deg)`,
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.72) 50%, rgba(255, 255, 255, 0.00) 100%)',
        opacity: '0.15',
      }}
    />
  );
};
