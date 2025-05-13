"use client"
import React from 'react';
import Image from "next/image";
import type { Page } from '@/payload-types'
import { aboutCoreValues, baseMediaUrl } from '@/constants/data';
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface HeadingCardProps {
  values: string[];
}

const HeadingCard: React.FC<HeadingCardProps> = ({ values = [] }) => {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[350px] sm:min-h-[400px] lg:min-h-[500px] px-6 sm:px-8 lg:px-10 shadow-[0_4px_64px_0px_#3F74EE40]" style={{ borderBottomRightRadius: '20%' }}>
      <div className="w-full h-full">
        <h2 className="text-heading-bold-black mb-3 sm:mb-4 lg:mb-6">Core Values:</h2>
        <ul className="space-y-1 sm:space-y-2 font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl">
          {values.map((value, index) => (
            <li
              key={`about-${Math.random()}`}
              className="text-heading-bold-gradient"
            >
              {value}
              {index !== values.length - 1 ? ',' : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface HeadingSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const FallbackComponent = React.memo(({  
  data, 
  language = 'en',
  loading = false, 
  error = null 
}: HeadingSectionProps) => {
  const values = React.useMemo(() => {
    return data?.sectionjson && Array.isArray(data.sectionjson) && data.sectionjson.length > 0 
      ? data.sectionjson 
      : aboutCoreValues;
  }, [data?.sectionjson]);
  return (
    <section className="relative">
      <div className="mx-auto h-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-[80px]">
        <div className="absolute inset-0 z-0 opacity-50">
          <Image
            src={`${baseMediaUrl}/images/pages/about/compressed_about-1.png`}
            alt="about-heading-background"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={`${baseMediaUrl}/images/pages/about/low_res_about-1.png`}
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col min-h-[500px] sm:min-h-[600px] md:min-h-[650px] xl:max-h-[750px] justify-between h-full w-full">
          <div className="flex justify-start items-start mt-6 mb:14 sm:my-0"> 
            <div className="w-full max-w-[325px] sm:max-w-[350px] md:max-w-[400px] xl:max-w-[450px]">
              <HeadingCard values={values} />
            </div>
          </div>
          <div className="flex justify-end items-end mt-14 sm:mt-8">
            <div className="relative lg:absolute aspect-square w-[280px] sm:w-[400px] md:w-[450px] lg:w-[500px] h-[280px] sm:h-[400px] md:h-[450px] xl:w-[600px] xl:h-[600px]">
              <Image
                src={`${baseMediaUrl}/images/pages/about/compresseabout-2.png`}
                alt="Futuristic Robot"
                fill
                sizes="(max-width: 640px) 280px, (max-width: 768px) 400px, (max-width: 1024px) 450px, 600px"
                className="object-contain"
                placeholder="blur"
                blurDataURL={`${baseMediaUrl}/images/pages/about/low_res_about-2.png`}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

const HeadingSection: React.FC<HeadingSectionProps> = ({ 
  data,
  language = 'en', 
  loading = false,
  error = null 
}) => {
  if (!checkValidHTML(data?.codeField)) {
    return <FallbackComponent data={data} />;
  }
  return <HTMLRenderer data={data.codeField} />;
};

export default React.memo(HeadingSection);