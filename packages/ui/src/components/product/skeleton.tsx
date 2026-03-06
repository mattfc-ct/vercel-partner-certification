import { Skeleton } from "../skeleton";

export function ProductGridSkeleton({ count }: { count: number }) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: We don't have a proper key
        <li className="flex flex-col gap-4" key={index}>
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-[28px] w-[150px]" />
          <Skeleton className="mt-2 h-[20px] w-[100px]" />
        </li>
      ))}
    </ul>
  );
}
