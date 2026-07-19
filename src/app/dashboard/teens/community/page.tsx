'use client';

import { VideoIcon, ArrowLeft } from 'lucide-react';
import VideoList from '../shared/Video/VideoList';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Enhanced Header with gradient and decorative elements */}
      <div className="mb-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-center items-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400 rounded-full opacity-10 transform -translate-x-12 translate-y-12"></div>

        <div className="flex items-center relative z-10">
          <div className="bg-blue-500 p-3 rounded-full mr-4 shadow-inner">
            <VideoIcon size={35} className="text-white" />
          </div>
          <h2 className="text-white text-4xl font-bold">Community Library</h2>
        </div>
      </div>

      <VideoList isCommunity />

      {/* Back to Dashboard Button */}
      <div className="mt-4 flex justify-center mb-10">
        <Link href="/dashboard/teens" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pl-4 pr-5 py-3 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 border border-blue-400 shadow-md">
          <ArrowLeft size={20} />
          <p className="font-bold">Kembali ke Dashboard</p>
        </Link>
      </div>
    </div>
  );
}
