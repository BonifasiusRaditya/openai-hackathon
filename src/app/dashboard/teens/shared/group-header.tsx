import { ChevronRightIcon, VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GroupHeader = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-xl shadow-lg flex justify-between items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400 rounded-full opacity-10 transform -translate-x-12 translate-y-12"></div>

      <div className="flex items-center relative z-10">
        <div className="bg-blue-500 p-2 rounded-full mr-4 shadow-inner">
          <VideoIcon size={28} className="text-white" />
        </div>
        <h2 className="text-white text-xl font-bold">{title}</h2>
      </div>

      <button onClick={() => router.push('/dashboard/teens/community')} className="bg-blue-500 hover:bg-blue-600 text-white pl-4 pr-3 py-2 rounded-full flex items-center gap-1 transition-all transform hover:scale-105 border border-blue-400 shadow-md">
        <p className="font-bold">Lihat Semua</p>
        <ChevronRightIcon size={20} strokeWidth={3} />
      </button>
    </div>
  );
};

export default GroupHeader;
