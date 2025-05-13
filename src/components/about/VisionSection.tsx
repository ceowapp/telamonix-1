import React from 'react';
import Image from "next/image";
import type { Page } from '@/payload-types'
import { aboutVisions } from '@/constants/data';
import { InfoSubsection, SectionWrapper, Button } from '../shared/InfoComponents';
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface VisionSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const FallbackComponent = React.memo(({  
  data, 
  projectItems = [], 
  language = 'en',
  loading = false, 
  error = null 
}: VisionSectionProps) => {
  const visions = React.useMemo(() => {
    return data?.sectionjson && Array.isArray(data.sectionjson) && data.sectionjson.length > 0
      ? data.sectionjson
      : aboutVisions;
  }, [data?.sectionjson]);
  return (
    <SectionWrapper 
      className={`relative top-6 sm:top-10 md:top-12 lg:top-14 xl:top-16 w-full flex flex-col justify-center items-center`}
      childrenClassName="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      {visions.map((section, index) => (
        <InfoSubsection
          key={index}
          items={section.items}
          className="my-0 mt-8 mb-0"
        />
      ))}
    </SectionWrapper>
  );
});

const VisionSection: React.FC<VisionSectionProps> = ({ 
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

export default React.memo(VisionSection);