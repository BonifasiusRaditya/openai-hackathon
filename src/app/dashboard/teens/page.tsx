'use client';
import PromptBar from './shared/PromptBar/PromptBar';
import VideoList from './shared/Video/VideoList';
import { useRef } from 'react';
import type { VideoListRef } from './shared/Video/VideoList';
import { generateVideo } from '@/app/actions/video';
import { toast } from 'sonner';

export default function Dashboard() {
  const videoListRef = useRef<VideoListRef>(null);

  const handleVideoRequest = async (prompt: string, image?: File) => {
    videoListRef.current?.addTemporaryVideo(prompt);

    try {
      await generateVideo(prompt, image);
    } catch (error) {
      toast.error('Failed to generate video. Please try again.');
      console.error('Error generating video:', error);
    }
  };

  return (
    <>
      <div className="lg:px-0 px-4 pb-20">
        <VideoList ref={videoListRef} />
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 pb-5">
        <div className="w-3xl mx-auto">
          <PromptBar onVideoRequest={handleVideoRequest} />
        </div>
      </div>
    </>
  );
}
