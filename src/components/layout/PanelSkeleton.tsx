import { Skeleton } from "@/components/ui/skeleton";

export function ChatSkeleton() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0D0F15] p-6 space-y-4">
      <div className="flex items-center justify-between pb-2">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="flex-1 space-y-4 py-4">
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="ml-auto h-12 w-1/2" />
        <Skeleton className="h-24 w-2/3" />
      </div>
      <Skeleton className="h-12 w-full rounded-2xl" />
    </div>
  );
}

export function ReasoningSkeleton() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0A0C11] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-28 w-full rounded-2xl" />
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-14 rounded-xl" />
        <Skeleton className="h-14 rounded-xl" />
        <Skeleton className="h-14 rounded-xl" />
      </div>
      <Skeleton className="h-9 w-full rounded-xl" />
      <div className="flex-1 space-y-3 pt-2">
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
    </div>
  );
}
