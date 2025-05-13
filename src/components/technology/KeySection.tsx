import React from "react";
import { technologyKeyHeading, technologyKeyItems } from '@/constants/data';
import Card from "../shared/CardComponent";
import type { Page } from '@/payload-types'
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface KeySectionProps {
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
}: KeySectionProps) => {
  const keys = React.useMemo(
    () => (Array.isArray(data?.sectionjson) ? data.sectionjson : technologyKeyItems),
    [data?.sectionjson]
  );
  return (
    <section className="relative w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-16 lg:pt-20 lg:pb-12 xl:pt-24 xl:pb-12 2xl:pt-24 2xl:pb-12">
      <h1 className="text-display-regular-gradient-1 mb-12 text-center">        
        {data?.title || technologyKeyHeading.title}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {keys.map((item, index) => (
          <Card
            key={index}
            variant="horizontal"
            className="flex justify-center w-full h-full sm:h-[180px] md:h-[200px] lg:h-[220px] max-w-full overflow-hidden"
            imageWidth={134}
            imageHeight={134}
            imageClassName="items-center justify-center rounded-[16px] bg-technology-card-gradient w-full max-w-full minphonexl:max-w-[193px] h-[193px] object-contain"
            contentClassName="w-full sm:w-[75%] flex flex-col justify-center px-0 sm:px-4"
            title={item.title}
            description={item.description}
            image={item.src}
            titleClassName="text-title-large-black mb-2"
            descriptionClassName="text-body-large-black max-w-md"
            imageContainerClassName="h-full aspect-square flex items-center justify-center w-[32%] sm:w-[25%]"
            layoutClassName="flex h-full phonexl:flex-col phonexl:max-w-md phonexl:justify-center phonexl:items-center flex-row justify-start items-start"
          />
        ))}
      </div>
    </section>
  );
});

const KeySection: React.FC<KeySectionProps> = ({ 
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

export default React.memo(KeySection);


