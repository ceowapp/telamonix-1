import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { cn } from '@/lib/utils';

export const NewsCardSkeleton = () => (
  <div className="w-full p-4 rounded-lg shadow-md">
    <Skeleton height={180} className="w-full rounded-lg" />
    <Skeleton height={20} width="80%" className="mt-2" />
    <Skeleton height={15} width="60%" className="mt-1" />
    <Skeleton height={12} width="100%" count={3} className="mt-1" />
  </div>
);

export const NewsContentSkeleton = () => (
  <div className="w-full max-w-3xl mx-auto px-4 space-y-6">
    <Skeleton height={40} width="60%" />
    <Skeleton height={20} width="80%" />
    <Skeleton height={300} className="w-full rounded-lg" />
    <Skeleton height={20} width="50%" />
    <Skeleton height={15} width="70%" />
    <Skeleton height={12} width="100%" count={5} />
  </div>
);

export const GridSectionSkeleton = () => {
  return (
    <section className="w-full px-3 sm:px-4 py-8 sm:py-12 md:py-16 lg:py-24">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, , 7, 8].map((item) => (
            <div
              key={item}
              className="w-full flex justify-center sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
            >
              <div className="relative w-full h-[300px] sm:h-[280px] md:h-[300px] lg:h-[320px] rounded-lg shadow-md overflow-hidden">
                <Skeleton
                  height="65%"
                  width="100%"
                  style={{ borderRadius: '24px' }}
                />
                <div className="absolute top-[20%] -translate-y-1/2 right-[-5%] sm:right-[-8%] md:right-[-10%] lg:right-[-12%]">
                  <Skeleton circle={true} height={100} width={100} />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Skeleton width={150} height={24} />
                  <Skeleton width={200} height={16} className="mt-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const NewsListSkeleton = () => {
  return (
    <div className="w-full px-4 py-6 sm:py-8">
      <h2 className="text-xl font-bold mb-4">
        <Skeleton width={150} height={24} />
      </h2>
      <div className="mb-4">
        <Skeleton height={120} borderRadius="8px" />
      </div>
      <div className="flex flex-col space-y-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton key={item} height={80} borderRadius="8px" />
        ))}
      </div>
    </div>
  );
};

interface NewsGridSkeletonProps {
  numOfItems?: number;
  isFourColumns?: boolean;
}

export const NewsGridSkeleton: React.FC<NewsGridSkeletonProps> = ({ numOfItems = 6, isFourColumns = false }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full",
        { "xl:grid-cols-4": isFourColumns }
      )}
    >
      {Array.from({ length: numOfItems }).map((_, index) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow-md">
          <Skeleton height={150} width="100%" className="rounded-t-lg" />
          <div className="mt-2 space-y-2">
            <Skeleton height={20} width="80%" />
            <Skeleton height={15} width="60%" />
            <Skeleton height={12} width="100%" count={2} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const InfoCardSkeleton = ({ numOfItems = 1, layout = "responsive", breakpoint = "md" }) => {
  const isHorizontal = layout === "horizontal" || layout === "responsive";
  const flexDirection = isHorizontal
    ? `flex-col ${breakpoint}:flex-row justify-between`
    : "flex-col";
  const containerWidthClass = isHorizontal ? "w-full md:w-1/2" : "w-full";
  const gap = "gap-4 sm:gap-6 lg:gap-8";
  return (
    <>
      {[...Array(numOfItems)].map((_, index) => (
        <div key={index} className="mb-12 last:mb-0">
          <div className={`flex ${flexDirection} ${gap}`}>
            <div className={`${containerWidthClass} relative aspect-video`}>
              <Skeleton height="100%" className="absolute inset-0" />
            </div>
            <div className={containerWidthClass}>
              <Skeleton width="70%" height={28} className="mb-2" />
              <Skeleton width="50%" height={24} className="mb-3" />
              <Skeleton count={3} className="mb-1" />
              <Skeleton width="60%" className="mb-4" />
              <div className="mb-4">
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="mb-2">
                    <Skeleton width="40%" height={20} className="mb-1" />
                    <Skeleton width="90%" height={16} />
                  </div>
                ))}
              </div>
              <Skeleton width={120} height={36} className="mt-4" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const InfoSectionSkeleton = () => {
  return (
    <div className="w-full">
      <div className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <Skeleton height={48} width="80%" className="mb-4" />
              <Skeleton height={32} width="60%" className="mb-6" />
              <Skeleton count={4} className="mb-1" />
              <Skeleton width="80%" />
            </div>
            <div className="w-full md:w-1/2 aspect-video relative">
              <Skeleton height="100%" className="absolute inset-0" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-16">
            <Skeleton height={36} width="40%" className="mb-8" />
            <InfoCardSkeleton numOfItems={2} layout="responsive" />
          </div>
          <div>
            <Skeleton height={36} width="50%" className="mb-8" />
            <InfoCardSkeleton numOfItems={2} layout="responsive" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Skeleton as NewsSkeleton };
