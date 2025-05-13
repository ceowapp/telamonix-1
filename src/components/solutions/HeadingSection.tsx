import React from "react";
import Image from "next/image";
import { cn } from '@/lib/utils';
import { baseMediaUrl } from '@/constants/data';
import type { Page } from '@/payload-types'
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { SectionContainer, SectionText, SectionImage } from '../shared/SectionComponents';
import { HTMLRenderer } from '../shared/HTMLRenderer';

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
  if (!data || typeof data !== "object" || Object.keys(data).length === 0) return null;
  const { 
    title = '', 
    subtitle = '', 
    description = '', 
    backgroundImage = '' 
  } = data ?? {};
  return (
    <section className="w-full h-fullitems-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex inset-0 pt-[128px]">
      <SectionContainer 
        backgroundImage={`${baseMediaUrl}/images/pages/solutions/compressed_solutions-1.png`}
        backgroundBlurImage={`${baseMediaUrl}/images/pages/solutions/low_res-solutions-1.png`}
        backgroundImageClassName="opacity-90"
        className="w-full h-full h-[320px] rounded-3xl"
        containerWidth="flex h-full"
        padding="p-0 py-10 minphonelg:py-14 md:py-12 px-4 sm:px-8 md:px-12 lg:px-18 xl:px-24"
        direction="flex-col md:flex-row"
        alignItems="items-center"
        justifyContent="justify-center"
      >
        <SectionText
          title={title}
          subtitle={subtitle}
          description={description}
          width="w-full"
          align="center"
          padding="p-0 mx-24"
          className={cn(
            "flex h-full", 
            description ? "justify-between" : "justify-center items-center"
          )}
          titleClassName="text-heading-large-white-1 max-w-[480px]"
          descriptionClassName="text-title-medium-white-1"
        />
      </SectionContainer>
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