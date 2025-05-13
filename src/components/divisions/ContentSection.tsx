"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { roboticsNews } from '@/constants/data';
import type { Page } from '@/payload-types'
import { processInfoData } from '@/utilities/processInfoData';
import SuspenseWrapper from '@/components/shared/SuspenseWrapper';
import { InfoSectionSkeleton, NewsGridSkeleton } from '../shared/SkeletonLoader';
import { InfoSubsection, SectionWrapper, Button } from '../shared/InfoComponents';
import { HTMLRenderer } from '../shared/HTMLRenderer';
import { checkValidHTML } from '@/utilities/checkValidHTML';

interface ContentSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const FallbackComponent: React.FC<ContentSectionProps> = ({ 
  data, 
  language = 'en',
  loading = false, 
  error = null 
}) => {
  const contentArray =
    Array.isArray(data?.contentArray) && data.contentArray.length > 0
      ? data.contentArray
      : [];
  const contentFieldsArray = contentArray.map(item => item?.contentFields || {});
  const sectionConfig = data?.sectionjson || {};
  const {
    className = '',
    childrenClassName = '',
    headerChildren,
    withHeader = false,
    withFooter = false,
    showDivider = true,
    showButton = true,
    buttonText = 'Book now',
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
      footerChildren={withFooter}
      border={border}
      withHeader={withHeader}
      withFooter={withFooter}
    >
      {contentFieldsArray.map((item, index) => {
        const contentItem = Array.isArray(item.contentItems)
          ? item.contentItems
          : [];
        const processedContentFields = contentItem.map(processInfoData);
        return (
          <InfoSubsection
            key={index}
            title={item.title || contentArray[index]?.contentFields?.title}
            titleClassName={cn("text-headline-large-gradient", item.titleClassName)}
            items={processedContentFields}
            titlePosition={item.titlePosition}
            showDivider={showDivider}
            showButton={showButton}
            buttonText={buttonText}
            buttonClassName={cn(
              buttonClassName,
              "hover:opacity-90 transition-opacity"
            )}
          />
        );
      })}
    </SectionWrapper>
  );
};

const ContentSection: React.FC<ContentSectionProps> = ({ 
  data, 
  language = 'en', 
  loading = false, 
  error = null 
}) => {
  if (!checkValidHTML(data?.codeField)) {
    return (
      <FallbackComponent 
        data={data}
        loading={loading}
        error={error}
      />
    );
  }
  return <HTMLRenderer data={data.codeField} />;
};

export default React.memo(ContentSection);