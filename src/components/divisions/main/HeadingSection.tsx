import React from "react";
import Image from "next/image";
import type { Page } from '@/payload-types'
import { divisionsHeading, baseMediaUrl } from '@/constants/data';
import { SectionContainer, SectionText, SectionImage } from '../../shared/SectionComponents';
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../../shared/HTMLRenderer';

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
  return (
    <section className="w-full inset-0">
      <SectionContainer 
        backgroundImage={`${baseMediaUrl}/images/pages/divisions/compressed_divisions-1.png`}
        backgroundBlurImage={`${baseMediaUrl}/images/pages/divisions/low_res-divisions-1.png`}
        className="w-full md:max-h-[600px] md:min-h-[650px] lg:max-h-[750px] flex justify-center items-center overflow-hidden"
        containerWidth="w-full"
        padding="pb-8 pt-24 md:py-12 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20"
        direction="flex-col md:flex-row"
        alignItems="items-center"
        justifyContent="justify-start"
      >
        <div className="absolute z-10 inset-0 top-[20px] shadow-[0_0_0_20px_rgba(5,9,78,1,0.5)] bg-[#05094E] w-full h-[120%] left-[-50%] blur-[100px] opacity-80 rounded-[384px]" />
        <SectionText
          title={data?.title || divisionsHeading.title}
          subtitle={data?.subtitle || divisionsHeading.subtitle}
          description={data?.description || divisionsHeading.description}
          width="w-full md:w-3/4 lg:w-2/3"
          align="start"
          padding="p-0"
          titleClassName="text-display-medium-gradient-1 z-50 text-start mb-4 sm:mb-8"
          subtitleClassName="text-display-medium-white z-50 text-start !leading-snug"
          descriptionClassName="text-body-large-white z-50 text-start max-w-3xl mx-auto"
        />
        <SectionImage 
          src={`${baseMediaUrl}/images/pages/divisions/main/main-1.png`}
          alt="Dashboard visualization" 
          className="z-50 p-0 relative mt-8 md:mt-12 lg:mt-16 w-full md:w-4/5 lg:w-3/4"
          position="center"
          height="h-[200px] sm:h-[300px] md:h-[400px] xl:h-[500px]"
          objectFit="contain"
          priority={true}
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