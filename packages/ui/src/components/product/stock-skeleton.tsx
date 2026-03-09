import { Skeleton } from "../skeleton";

export function ProductStockSkeleton() {
  return (
    <>
      <div className="mt-4">
        <Skeleton className="h-[20px] w-[150px]" />
      </div>
      <hr className="my-6" />
      <div className="flex flex-col gap-6">
        <Skeleton className="h-[36px] w-[200px]" />
        <Skeleton className="h-[36px] w-[100px]" />
      </div>
    </>
  );
}
