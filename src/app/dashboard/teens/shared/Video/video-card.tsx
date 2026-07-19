'use client';
import type { VideoDataType } from '@/types/video-types';
import { Loader, Trophy } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Progress } from '@mantine/core';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface VideoCardProps {
  videoData: VideoDataType;
}

export default function VideoCard({ videoData }: VideoCardProps) {
  const [status, setStatus] = useState<string>(videoData.message || 'Queued');
  const [progress, setProgress] = useState<number>(typeof videoData.progress === 'number' ? videoData.progress : 0);
  const [, setVideoUrl] = useState<string | null>(videoData.video_url || null);
  const [videoReady, setVideoReady] = useState<boolean>(!!videoData.is_ready);
  const supabaseRef = useRef(createClient());
  const queryClient = useQueryClient();
  const channelRef = useRef<ReturnType<typeof supabaseRef.current.channel> | null>(null);
  const { is_ready, title, video_url, thumbnail_url, subject, created_at, id } = videoData;

  // Format date to "24 Jan, 2025" style
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  // Function to refresh videos list
  const refreshVideos = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['videos'] });
  }, [queryClient]);

  // Check if the progress is at 100% and mark the video as ready if needed
  useEffect(() => {
    if (progress === 100 && !videoReady) {
      // Fetch the latest video data when progress hits 100%
      const fetchVideoData = async () => {
        try {
          const supabase = supabaseRef.current;
          const { data } = await supabase.from('videos').select('*').eq('id', id).single();

          if (data && data.video_url) {
            setVideoUrl(data.video_url);
            setVideoReady(true);
            // Invalidate query to refresh the videos list
            refreshVideos();
          }
        } catch (error) {
          console.error('Error fetching video data:', error);
        }
      };

      fetchVideoData();
    }
  }, [progress, videoReady, id, refreshVideos]);

  // Setup real-time subscription
  useEffect(() => {
    // If the video is already marked as ready in the initial data, return
    if (is_ready) {
      setVideoReady(true);
      setVideoUrl(video_url);
      return;
    }

    const supabase = supabaseRef.current;

    const fetchInitialData = async () => {
      try {
        const { data } = await supabase.from('videos').select('*').eq('id', id).single();

        if (data) {
          console.log(`Video ${id} initial data:`, data);
          setStatus(data.message || 'Processing');
          // Ensure we have a valid number for progress
          const currentProgress = typeof data.progress === 'number' ? data.progress : 0;
          setProgress(currentProgress);

          if (data.video_url) {
            setVideoUrl(data.video_url);
          }

          // Mark as ready if the backend says it's ready or progress is 100
          if (data.is_ready || currentProgress === 100) {
            setVideoReady(true);
          }
        }
      } catch (error) {
        console.error(`Error fetching initial data for video ${id}:`, error);
      }
    };

    fetchInitialData();

    // Subscribe to status changes for this specific video
    console.log(`Setting up realtime subscription for video ${id}`);
    const channel = supabase
      .channel(`video-status-${id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'videos',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          if (payload.new) {
            setStatus(payload.new.message || 'Processing');
            // Ensure progress is a valid number
            const updatedProgress = typeof payload.new.progress === 'number' ? payload.new.progress : 0;
            setProgress(updatedProgress);

            if (payload.new.video_url) {
              setVideoUrl(payload.new.video_url);
            }

            // Mark as ready if the backend says it's ready or progress is 100
            if (payload.new.is_ready || updatedProgress === 100) {
              setVideoReady(true);
              // Refresh videos list when video becomes ready
              refreshVideos();
            }
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    // Cleanup subscription
    return () => {
      console.log(`Cleaning up subscription for video ${id}`);
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [id, is_ready, video_url, refreshVideos]);

  const cardClasses = 'bg-white rounded-xl shadow-sm p-1 border-[1px] flex flex-col hover:shadow-md transition-all duration-200 relative overflow-hidden group';

  const router = useRouter();

  return (
    <div className={`${cardClasses} h-auto min-h-[18rem] md:h-72 cursor-pointer`} onClick={() => router.push(`/dashboard/teens/video/${id}`)}>
      <div className="relative w-full rounded-md overflow-hidden bg-gray-100" style={{ paddingTop: '56.25%' }}>
        {thumbnail_url && <Image src={thumbnail_url} alt={title} className={`w-full h-full object-cover absolute inset-0 rounded-md ${!videoReady ? 'opacity-50' : ''}`} width={500} height={281} />}

        {!videoReady ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Loader className="w-8 h-8 animate-spin text-gray-400" />
            <div className="text-sm text-gray-500 font-medium px-2 text-center">
              {status && status.toLowerCase().includes('python')
                ? 'An Error Occurred'
                : status
                ? status
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')
                : 'Processing...'}
            </div>
            <Progress value={progress} className="w-3/4" color="yellow" size="sm" radius="xl" />
            <div className="text-xs text-gray-400">{progress}%</div>
          </div>
        ) : (
          <>
            <Image src={thumbnail_url || ''} alt={title} className={`w-full h-full object-cover absolute inset-0 rounded-lg ${!videoReady ? 'opacity-50' : ''}`} width={500} height={281} />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-0.5 rounded text-white text-xs">01:25</div>
          </>
        )}
      </div>

      <h3 className="text-lg mt-2 font-semibold truncate px-2">{title}</h3>

      <div className="flex justify-between mt-auto pb-1 px-2">
        <span className="px-3 py-1 bg-yellow-100 text-amber-600 text-xs font-medium rounded-full truncate max-w-[60%] border border-amber-600">{subject}</span>
        <div className="flex items-center gap-2">
          <p className="text-gray-400 text-sm">{formatDate(created_at)}</p>
          <span className="text-blue-500 text-xs font-medium flex items-center gap-1">
            +2 EXP <Trophy size={12} className="" />
          </span>
        </div>
      </div>
    </div>
  );
}
