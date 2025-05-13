import React from "react";
import Image from "next/image";
import type { Page } from '@/payload-types';
import { baseMediaUrl } from "@/constants/data";
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface CareerListSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  loading?: boolean;
  error?: string | null;
  language?: 'en' | 'vi' | 'zh';
}

const FallbackComponent = React.memo(() => {
  return (
    <div className="relative p-4 rounded-[20px] max-h-[300px] w-full aspect-square mb-8 overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src={`${baseMediaUrl}/images/pages/career/career-1.png`}
          alt="Career wave"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>
      <div className="relative flex flex-col justify-end items-start h-full z-10">
        <h1 className="text-display-regular-white !leading-[44px] mb-10 sm:mb-10 md:mb-2">
          Get your<br />
          best job<br />
          at Naiscorp
        </h1>
      </div>
    </div>
  );
});

const CareerBanner: React.FC<CareerListSectionProps> = ({
  data,
  language = 'en',
  loading = false,
  error = null
}) => {
  return checkValidHTML(data?.codeField) ? (
    <HTMLRenderer data={data?.codeField} className="max-h-[300px]" />
  ) : (
    <FallbackComponent />
  );
};

export default React.memo(CareerBanner);
