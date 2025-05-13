import React from "react";
import Card from "../shared/CardComponent";
import { cn } from "@/lib/utils";
import type { Page } from '@/payload-types'
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface OfferSectionProps {
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
}: OfferSectionProps) => {
  const title = data?.title || "";
  const sectionData = React.useMemo(
    () => (data?.sectionjson && typeof data.sectionjson === 'object' ? data.sectionjson : null),
    [data?.sectionjson]
  );
  const items = React.useMemo(
    () => (Array.isArray(sectionData?.items) ? sectionData?.items : []),
    [sectionData?.items]
  );
  const className = sectionData?.className || "";
  const cardDescriptionClassName = sectionData?.cardDescriptionClassName;
  const gridLayout = sectionData?.gridLayout || "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
  if (!sectionData || !items?.length) return null;
  return (
    <section className={cn("w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20", className)}>
      <div className="w-full mx-auto text-center">
        {title && (
          <div className="w-full max-w-3xl mx-auto mb-2 sm:mb-4 md:mb-6 lg:mb-8 text-center px-4">
            <h2 className="text-display-regular-gradient-1 text-center leading-[1.2]">
              {title}
            </h2>
          </div>
        )}
        <div className="w-full py-8 py-6">
          {items?.length > 0 && (
            <div className={gridLayout}>
              {items.map((item, index) => (
                <Card
                  key={`offer-${index}-${Math.random()}`}
                  variant={sectionData?.variant || "vertical"}
                  className={cn(
                    sectionData?.cardClassName || "",
                    "hover:opacity-90 transition-opacity"
                  )}
                  layoutClassName={sectionData?.cardLayoutClassName || ""}
                  imageClasses={sectionData?.imageClasses || ""}
                  imageClassName={sectionData?.imageClassName || ""}
                  description={item.description || ""}
                  descriptionClassName={cn("text-body-large", cardDescriptionClassName)}
                  image={item.imageSrc || ""}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

const OfferSection: React.FC<OfferSectionProps> = ({ 
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

export default React.memo(OfferSection);