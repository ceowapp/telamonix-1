"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { technologyNews } from '@/constants/data';
import type { Page } from '@/payload-types'
import { TechnologySection } from '@/types/page';
import SuspenseWrapper from '@/components/shared/SuspenseWrapper';
import { InfoSectionSkeleton } from '../shared/SkeletonLoader';
import { processInfoData } from '@/utilities/processInfoData';
import { InfoSubsection, SectionWrapper, Button } from '../shared/InfoComponents';
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface ContentSectionProps {
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
}: ContentSectionProps) => {
  const contentArray = React.useMemo(
    () => (Array.isArray(data?.contentArray) ? data.contentArray : []),
    [data?.contentArray]
  );
  const contentFieldsArray = React.useMemo(
    () => contentArray.map(item => item?.contentFields ?? {}), 
    [contentArray]
  );  
  const sectionConfig = data?.sectionjson || {};
  const {
    className = '',
    childrenClassName = '',
    headerChildren,
    withHeader = false,
    withFooter = false,
    showDivider = false,
    showButton = false,
    buttonText = '',
    buttonClassName = '',
    border = false,
  } = sectionConfig;
  const isValidData = !!data && !error;
  const showLoading = loading || !isValidData;
  
  return (
    <SectionWrapper 
      className={cn(
        "relative top-0 mb-12 py-10 sm:py-12 lg:py-16 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col justify-center items-center",
        className
      )}
      childrenClassName={cn(
        "w-full bg-white w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-12 rounded-[40px]",
        childrenClassName
      )}
      headerChildren={headerChildren}
      footerChildren={withFooter ? <div /> : undefined}
      border={border}
      withHeader={withHeader}
      withFooter={withFooter}
    >
      {showLoading ? (
        <InfoSectionSkeleton />
      ) : (
        <SuspenseWrapper fallback={<InfoSectionSkeleton />}>
          {contentFieldsArray.map((item, index) => {
            const contentItem = Array.isArray(item.contentItems)
              ? item.contentItems
              : [];
            const processedContentFields = contentItem.map(processInfoData);
            return (
              <InfoSubsection
                key={index}
                title={item.title || contentArray[index]?.contentFields?.title}
                titleClassName="text-headline-large-gradient"
                items={processedContentFields}
                titlePosition={item.titlePosition}
                showDivider={showDivider}
                showButton={showButton}
                buttonText={buttonText}
                buttonClassName={buttonClassName}
              />
            );
          })}
        </SuspenseWrapper>
      )}
    </SectionWrapper>
  );
});

const ContentSection: React.FC<ContentSectionProps> = ({ 
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

export default React.memo(ContentSection);
