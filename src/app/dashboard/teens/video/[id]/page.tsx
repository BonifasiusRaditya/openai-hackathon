'use client';
import { useState, useRef, useEffect } from 'react';
import { getVideoById, getUserVideos } from '@/app/actions/video';
import { VideoDataType } from '@/types/video-types';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Chat from './components/chat';

export default function VideoPage() {
  const params = useParams();
  const [imageData, setImageData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState<VideoDataType | null>(null);
  const [recommendedVideos, setRecommendedVideos] = useState<VideoDataType[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [currentTimestamp, setCurrentTimestamp] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const redirect = useRouter();

  const router = useRouter();

  // Format time to MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Fetch video data on component mount
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const videoId = params.id as string;
        const response = await getVideoById(videoId);

        if (response.success && response.video) {
          setVideoData(response.video);
        } else {
          setError(response.error || 'Failed to load video');
          toast.error('Failed to load video');
          redirect.push('/dashboard');
        }
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('An error occurred while loading the video');
        toast.error('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [params.id, redirect]);

  // Fetch recommended videos
  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        setLoadingRecommendations(true);
        const response = await getUserVideos();

        if (response.success && response.videos) {
          // Filter out current video and get only ready videos
          const filteredVideos = response.videos.filter((video) => video.id !== Number(params.id) && video.is_ready).slice(0, 3); // Get only 3 videos

          setRecommendedVideos(filteredVideos);
        }
      } catch (err) {
        console.error('Error fetching recommended videos:', err);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    if (!loading && videoData) {
      fetchRecommendedVideos();
    }
  }, [loading, videoData, params.id]);

  // Capture current frame from video when paused
  const captureFrame = () => {
    if (!videoRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current frame to the canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImageData(dataUrl);

        // Also save current timestamp for reference
        setCurrentTimestamp(formatTime(video.currentTime));
      }
    } catch (err) {
      console.error('Error capturing frame:', err);
    }
  };

  // Add pause event listener
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePause = () => {
        setIsPlaying(false);
        captureFrame();
      };

      const handlePlay = () => {
        setIsPlaying(true);
      };

      // Add error handling for video
      const handleVideoError = (e: Event) => {
        setError('Video error: ' + (e as ErrorEvent).message);
        console.error('Video error:', e);
      };

      video.addEventListener('pause', handlePause);
      video.addEventListener('play', handlePlay);
      video.addEventListener('error', handleVideoError);

      return () => {
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('error', handleVideoError);
      };
    }
  }, [captureFrame]);

  // Render loading skeleton
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8 gap-8 grid grid-cols-1 lg:grid-cols-5 px-4 md:px-8">
        <div className="lg:col-span-3">
          <Skeleton className="w-full aspect-video rounded-xl min-h-[300px]" />
          <div className="mt-6">
            <Skeleton className="w-2/3 h-8 mb-3 min-w-[300px]" />
            <Skeleton className="w-full h-24 min-h-[96px]" />
          </div>
          <div className="mt-8">
            <Skeleton className="w-48 h-7 mb-4 min-w-[192px]" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-36 w-full rounded-xl min-h-[144px]" />
              <Skeleton className="h-36 w-full rounded-xl min-h-[144px]" />
              <Skeleton className="h-36 w-full rounded-xl min-h-[144px]" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 mt-8 lg:mt-0">
          <Skeleton className="w-full h-[70vh] rounded-xl min-h-[500px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 lg:pb-12">
      {/* Back button with enhanced styling */}
      <div className="flex items-center gap-2 mb-6 cursor-pointer hover:text-blue-600 transition-colors w-fit" onClick={() => router.push('/dashboard/teens')}>
        <Button variant="outline" size="icon" className="shadow-sm hover:bg-blue-50 hover:text-blue-600 border-blue-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <span className="font-medium">Back to Dashboard</span>
      </div>

      {/* Main content with enhanced styling */}
      <div className="w-full gap-8 grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {videoData && (
            <>
              <div className="relative rounded-xl overflow-hidden border-2 border-blue-100 shadow-lg bg-gradient-to-b from-blue-50 to-white">
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-yellow-100 opacity-40 z-0"></div>
                <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-blue-100 opacity-40 z-0"></div>

                <div className="relative z-10">
                  <video ref={videoRef} src={videoData.video_url} className="w-full aspect-video rounded-xl" controls crossOrigin="anonymous" onPause={captureFrame} />

                  {/* Enhanced pause hint */}
                  <div className="absolute top-4 right-4 text-xs bg-black/70 text-white px-3 py-2 rounded-md shadow-md backdrop-blur-sm flex items-center gap-1.5">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">{isPlaying ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white ml-0.5" />}</div>
                    <span>Pause video to analyze with AI</span>
                  </div>
                </div>
              </div>

              {/* Video details with enhanced styling */}
              <div className="mt-6 bg-white p-6 rounded-xl border-2 border-blue-100 shadow-md">
                <h2 className="text-2xl font-bold text-blue-800">{videoData.title}</h2>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1 rounded-full text-xs font-medium">{videoData.subject}</span>
                  <span className="bg-amber-100 text-amber-600 border border-amber-200 px-3 py-1 rounded-full text-xs font-medium">{new Date(videoData.created_at).toLocaleDateString()}</span>
                </div>

                <div className="mt-4 text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="font-medium text-sm text-blue-700 mb-1">Video Prompt:</div>
                  <p className="text-gray-600">{videoData.prompt}</p>
                </div>
              </div>

              {/* Recommended videos section with enhanced styling */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-500 w-7 h-7 flex items-center justify-center rounded-full mr-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </span>
                  Recommended Videos
                </h3>

                {loadingRecommendations ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-40 w-full rounded-lg" />
                  </div>
                ) : recommendedVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendedVideos.map((video) => (
                      <div
                        key={video.id}
                        className="bg-white rounded-xl overflow-hidden border-2 border-gray-100 shadow-md hover:shadow-lg transition-all transform hover:scale-102 cursor-pointer flex flex-col"
                        onClick={() => {
                          router.push(`/dashboard/teens/video/${video.id}`);
                        }}
                      >
                        <div className="relative pb-[56.25%]">
                          {' '}
                          {/* 16:9 aspect ratio */}
                          <Image className="absolute inset-0 object-cover w-full h-full rounded-t-lg" src={video.thumbnail_url || ''} alt={video.title} width={300} height={169} />
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-sm line-clamp-1">{video.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{video.subject}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-xl border-2 border-blue-100 shadow-md text-center">
                    <div className="text-amber-400 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">No related videos found</p>
                    <p className="text-gray-500 text-sm mt-1">Check back later for more recommendations</p>
                  </div>
                )}
              </div>
            </>
          )}

          {error && (
            <div className="mt-4 p-5 bg-red-50 text-red-700 rounded-xl border border-red-200 shadow">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span className="font-bold">Error</span>
              </div>
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Chat section with enhanced styling */}
        <div className="lg:col-span-2 bg-white rounded-xl border-2 border-blue-100 shadow-lg overflow-hidden mt-6 lg:mt-0 h-2/3">
          <Chat imageData={imageData} timestamp={currentTimestamp} />
        </div>
      </div>
    </div>
  );
}
