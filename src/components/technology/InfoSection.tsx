import React from 'react';
import Image from "next/image";
import type { Page } from '@/payload-types'
import { technologyInfo } from '@/constants/data';
import { InfoSubsection, SectionWrapper, Button } from '../shared/InfoComponents';
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface InfoSectionProps {
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
}: InfoSectionProps) => {
  const info = React.useMemo(
    () => (Array.isArray(data?.sectionjson) ? data.sectionjson : technologyInfo),
    [data?.sectionjson]
  );
  return (
    <SectionWrapper 
      className={`relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 top-6 sm:top-8 md:top-10 xl:top-14 w-full flex flex-col justify-center items-center`}
      childrenClassName="w-full"
    >
      {info.map((section, index) => (
        <InfoSubsection
          key={index}
          items={section.items}
        />
      ))}
    </SectionWrapper>
   );
});

const InfoSection: React.FC<InfoSectionProps> = ({ 
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

export default React.memo(InfoSection);

