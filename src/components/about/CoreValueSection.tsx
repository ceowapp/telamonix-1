import React from 'react';
import Card from '../shared/CardComponent';
import type { Page } from '@/payload-types'
import { aboutValueItems, aboutValueHeading } from '@/constants/data';
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface CoreValueSectionProps {
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
}: CoreValueSectionProps) => {
  const values = React.useMemo(() => {
    return data?.sectionjson && Array.isArray(data.sectionjson) && data.sectionjson.length > 0 
      ? data.sectionjson 
      : aboutValueItems;
  }, [data?.sectionjson]);
  return (
    <section className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="mx-auto">
        <div className="flex items-center justify-center mb-4 sm:mb-8 px-4 sm:px-6">
          <div className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
            <div className="text-center">
              <h2 className="text-display-regular-gradient-1 mb-2 sm:mb-4">
                {data?.title || aboutValueHeading.title}
              </h2>
              <p className="text-body-regular-black-1">
                {data?.description || aboutValueHeading.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {values.map((value) => (
            <div 
              key={`core-${Math.random()}`} 
              className="w-full flex py-2 justify-center items-center sm:justify-start sm:items-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
            >
              <Card
                title={value.title}
                description={value.description}
                image={value.imageSrc}
                insetStyle={{
                  height: '240px',
                  width: '100%',
                  background: "linear-gradient(180deg, #F7F7F7 0%, #CBCBCB 100%)",
                  borderRadius: '24px'
                }}
                imageWidth={240}
                imageHeight={240}
                layoutClassName="p-0 sm:p-0"
                contentClassName="relative max-h-fit top-[250px]"
                imageClassName="absolute w-full h-[240px] flex justify-end items-end"
                imageClasses="relative top-[30px] right-[-30px]"
                titleClassName="mb-2 text-title-regular-black-2"
                descriptionClassName="mb-2 text-body-regular-black line-clamp-4"
                layoutClassName="h-[360px] p-0 sm:p-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const CoreValueSection: React.FC<CoreValueSectionProps> = ({ 
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

export default React.memo(CoreValueSection);