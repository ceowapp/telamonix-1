import React from "react";
import { baseMediaUrl } from '@/constants/data';
import Link from "next/link";
import { cn } from '@/lib/utils';
import type { Page } from '@/payload-types'
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { SectionContainer, SectionText, SectionImage, Button } from '../shared/SectionComponents';
import { HTMLRenderer } from '../shared/HTMLRenderer';

const CONNECT_SECTION_VARIANTS = {
  default: {
    containerBackgroundImage: `${baseMediaUrl}/images/pages/divisions/compressed_divisions-2.png`,
    containerBackgroundBlurImage: `${baseMediaUrl}/images/pages/divisions/low_res_divisions-2.png`,
    containerClassName: "w-full rounded-[40px] px-4 overflow-hidden",
    containerPadding: "py-6 sm:py-8 md:py-10 lg:py-12 px-4 md:px-6 lg:px-8",
    containerContentDirection: "flex flex-col lg:flex-row",
    containerAlignItems: "items-center",
    containerJustifyContent: "justify-between",
    leftPanelWidth: "w-full lg:w-3/5 xl:w-1/2",
    leftPanelAlignItems: "text-center lg:text-left",
    leftPanelTitleClassName: "text-display-large-white mb:0",
    leftPanelSubtitleClassName: "text-display-large-gradient",
    leftPanelDescriptionClassName: "text-body-large-white mt-4 lg:max-w-none lg:mx-0",
    rightPanelClassName: "mt-8 lg:mt-0 w-full mx-auto lg:mx-0 justify-center items-center flex",
    rightPanelImageClassName: "h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] lg:w-[500px] lg:h-[500px]",
    rightPanelImageObjectFit: "cover",
    buttonClassName: "text-white font-semibold text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-8 rounded-full bg-violet-500/80"
  },
  humanRobotics: {
    containerBackgroundImage: `${baseMediaUrl}/images/pages/divisions/compressed_divisions-2.png`,
    containerBackgroundBlurImage: `${baseMediaUrl}/images/pages/divisions/low_res_divisions-2.png`,
    containerClassName: "w-full rounded-[40px] px-4 overflow-hidden",
    leftPanelTitle: "Let's Build",
    leftPanelSubtitle: "Together",
    containerPadding: "py-6 sm:py-8 md:py-10 lg:py-12 px-4 md:px-6 lg:px-8",
    leftPanelDescription: "Collaborate with us to create groundbreaking apps that set new standards in innovation.",
    leftPanelAlignItems: "text-center lg:text-left",
    leftPanelWidth: "w-full lg:w-3/5 xl:w-1/2",
    leftPanelTitleClassName: "text-display-large-white mb:0",
    leftPanelSubtitleClassName: "text-display-large-gradient",
    rightPanelClassName: "mt-0 w-full h-full mx-auto lg:mx-0 top-[65px] sm:top-[65px] md:top-[120px] maxPhoneXs:top-[80px] relative flex justify-end items-end",
    rightPanelImageClassName: "h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] lg:w-[500px] lg:h-[500px]",
    rightPanelImageObjectFit: "contain",
    buttonClassName: "text-white font-semibold text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-8 rounded-full bg-violet-500/80"
  }
};

interface ConnectSectionProps {
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
}: ConnectSectionProps) => {
  const sectionData = (data?.sectionjson && typeof data?.sectionjson === "object" && Object.keys(data?.sectionjson).length > 0) 
      ? data.sectionjson
      : null;
  const variantStyles = {
    ...CONNECT_SECTION_VARIANTS[sectionData?.variant || 'default']
  };
  const mergedData = {
    ...variantStyles,
    ...sectionData
  };
  if (!sectionData) return null;
  return (
    <section className="w-full flex justify-center items-center py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <SectionContainer
        className={variantStyles.containerClassName}
        padding={variantStyles.containerPadding}
        backgroundImage={variantStyles.containerBackgroundImage}
        backgroundBlurImage={variantStyles.containerBackgroundBlurImage}
        direction={variantStyles.containerContentDirection}
        alignItems={variantStyles.containerAlignItems}
        justifyContent={variantStyles.containerJustifyContent}
      >
        <SectionText
          title={mergedData.leftPanelTitle}
          subtitle={mergedData.leftPanelSubtitle}
          description={mergedData.leftPanelDescription}
          width={variantStyles.leftPanelWidth}
          align={variantStyles.leftPanelAlignItems}
          padding="p-4"
          titleClassName={variantStyles.leftPanelTitleClassName}
          subtitleClassName={variantStyles.leftPanelSubtitleClassName}
          descriptionClassName={variantStyles.leftPanelDescriptionClassName}
          buttonClassname="flex justify-start lg:justify-start mt-8"
          button={
            <Link href="/contact" passHref>
              <Button 
                text={mergedData.buttonText}
                variant="magic"
                className={variantStyles.buttonClassName}
              />
            </Link>
          }
        />
        <SectionImage
          src={mergedData.rightPanelImage}
          alt="Dashboard visualization"
          className={variantStyles.rightPanelClassName}
          position="center"
          height={variantStyles.rightPanelHeight}
          objectFit={variantStyles.rightPanelImageObjectFit}
          priority={true}
          imageClassName={variantStyles.rightPanelImageClassName}
        />
      </SectionContainer>
    </section>
  );
});

const ConnectSection: React.FC<ConnectSectionProps> = ({ 
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

export default React.memo(ConnectSection);