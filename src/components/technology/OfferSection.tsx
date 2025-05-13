import React from "react";
import { technologyOffersHeading, technologyOfferItems } from '@/constants/data';
import Card from "../shared/CardComponent";
import type { Page } from '@/payload-types'
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface OfferSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  loading?: boolean;
  error?: string | null;
}

const FallbackComponent = React.memo(({  
  data, 
  language = 'en',
  loading = false, 
  error = null 
}: ContentSectionProps) => {
  const offers = React.useMemo(
    () => (Array.isArray(data?.sectionjson) ? data.sectionjson : technologyOfferItems),
    [data?.sectionjson]
  );
  return (
    <section className="w-full mx-auto pt-12 pb-10 sm:pb-12 md:pb-16 xl:pb-20 2xl:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="bg-white rounded-[40px] px-4 sm:px-6 md:px-8">
        <h1 className="text-display-regular-gradient-1 text-center p-8">
          {data?.title || technologyOffersHeading.title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-8">
          {offers.map((item, index) => (
            <Card
              key={index}
              variant="vertical"
              className="rounded-3xl p-0"
              layoutClassName="flex flex-col items-center justify-center p-4"
              titleClassName="text-title-large-teriary mb-4 text-center"
              descriptionClassName="text-body-large-black text-center max-w-md"
              imageClassName="relative w-[100px] h-[100px] p-0"
              imageClasses="max-w-[100px] max-h-[100px]"
              title={item.title}
              description={item.description}
              image={item.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

const OfferSection: React.FC<OfferSectionProps> = ({ 
  data,
  loading = false,
  error = null 
}) => {
  if (!checkValidHTML(data?.codeField)) {
    return <FallbackComponent data={data} />;
  }
  return <HTMLRenderer data={data.codeField} />;
};

export default React.memo(OfferSection);
