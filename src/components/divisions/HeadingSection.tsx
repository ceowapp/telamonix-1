import React from "react";
import { cn } from '@/lib/utils';
import { baseMediaUrl } from '@/constants/data';
import type { Page } from '@/payload-types'
import { SectionContainer, SectionText, SectionImage } from '../shared/SectionComponents';
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

const HEADING_SECTION_VARIANTS = {
  default: {
    containerBackgroundImage: `${baseMediaUrl}/images/pages/divisions/compressed_divisions-1.png`,
    containerBackgroundBlurImage: `${baseMediaUrl}/images/pages/divisions/low_res_divisions-1.png`,
    containerClassName: "w-full flex lg:min-h-[750px] justify-center items-center overflow-hidden",
    containerWidth: "w-full",
    containerPadding: "pb-8 pt-20 sm:pt-24 md:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20",
    containerContentDirection: "flex-col md:flex-row",
    containerAlignItems: "items-center",
    containerJustifyContent: "justify-start",
    leftPanelClassName: "",
    leftPanelWidth: "w-full md:w-3/4 lg:w-1/2",
    leftPanelPadding: "p-0",
    leftPanelAlignItems: "start",
    rightPanelClassName: "z-50 relative mt-8 md:mt-12 lg:mt-16 w-full md:w-4/5 lg:w-3/4",
    rightPanelHeight: "h-[200px] sm:h-[300px] md:h-[400px] xl:h-[500px]",
    rightPanelContentPosition: "center",
    rightPanelImageObjectFit: "contain",
    rightPanelImageClassName: ""
  },
  humanRobotics: {
    containerWidth: "w-full max-w-full mt-0 p-0",
    containerPadding: "pb-8 pt-20 sm:pt-24 md:py-24",
    leftPanelClassName: "sm:mt-0 py-6",
    leftPanelWidth: "w-[90%] xl:w-[60%] ml-4 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-20",
    leftPanelAlignItems: "start",
    leftPanelPadding: "p-0",
    rightPanelClassName: "z-50 relative top-[32px] sm:top-[32px] md:top-[210px] lg:top-[150px] xl:top-[96px] flex justify-end items-end md:w-full h-full p-0",
    rightPanelImageClassName: "w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[604px] xl:h-[604px]",
    rightPanelImageObjectFit: "contain lg:cover"
  },
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
  const sectionData = (data?.sectionjson && typeof data?.sectionjson === "object" && Object.keys(data?.sectionjson).length > 0) 
      ? data.sectionjson
      : null;
  const variantStyles = {
    ...HEADING_SECTION_VARIANTS.default,
    ...HEADING_SECTION_VARIANTS[sectionData?.variant || 'default']
  };
  if(!sectionData) return null;
  return (
    <section className="w-full inset-0">
      <SectionContainer 
        backgroundImage={variantStyles.containerBackgroundImage} 
        backgroundBlurImage={variantStyles.containerBackgroundBlurImage}
        className={variantStyles.containerClassName}
        containerWidth={variantStyles.containerWidth}
        padding={variantStyles.containerPadding}
        direction={variantStyles.containerContentDirection}
        alignItems={variantStyles.containerAlignItems}
        justifyContent={variantStyles.containerJustifyContent}
      >
        <div className="absolute z-10 inset-0 top-[20px] shadow-[0_0_0_20px_rgba(5,9,78,1,0.5)] bg-[#05094E] w-full h-[120%] left-[-50%] blur-[100px] opacity-0.8 rounded-[384px]" />
        <SectionText
          className={variantStyles.leftPanelClassName}
          title={sectionData.leftPanelTitle}
          subtitle={sectionData.leftPanelSubtitle}
          description={sectionData.leftPanelDescription}
          width={variantStyles.leftPanelWidth}
          align={variantStyles.leftPanelAlignItems}
          padding={variantStyles.leftPanelPadding}
          titleClassName={"text-headline-large-gradient z-50 text-start mb-4"}
          subtitleClassName={"z-50 text-display-medium-white text-start !leading-tight mb-6"}
          descriptionClassName={"z-50 text-body-large-white text-start max-w-3xl mx-auto"}
        />
        <SectionImage 
          src={sectionData.rightPanelImage}
          alt="Heading" 
          className={variantStyles.rightPanelClassName}
          position={variantStyles.rightPanelContentPosition}
          height={variantStyles.rightPanelHeight}
          objectFit={variantStyles.rightPanelImageObjectFit}
          priority={true}
          imageClassName={variantStyles.rightPanelImageClassName}
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