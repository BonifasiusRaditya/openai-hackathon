import { Skeleton } from '@/components/ui/skeleton';

export default function VideoSkeleton() {
  return (
    <div className="bg-white rounded-lg p-1 ">
      <Skeleton className="w-full h-46 rounded-lg mb-2" />
      <div className="px-2 pb-2">
        <Skeleton className="h-4 w-full rounded-full mb-2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/2 rounded-full mb-2" />
          <Skeleton className="h-4 w-1/4 rounded-full mb-2" />
        </div>
      </div>
    </div>
  );
}
