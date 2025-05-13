"use client";

import React from "react";
import type { Page } from '@/payload-types'
import NewsHeadingSection from "./NewsHeadingSection";
import NewsGridSection from "./NewsGridSection";
import NewsHighLightSection from "./NewsHighLightSection";

const pageComponents: Record<string, React.ComponentType<any>> = {
  heading: NewsHeadingSection,
  grid: NewsGridSection,
  highlight: NewsHighLightSection,
};

interface RenderPageProps {
  language?: string;
  sections: NonNullable<NonNullable<Page["sectionsTab"]>["sections"]>[];
}

export const RenderPage: React.FC<RenderPageProps> = ({ sections, language = "en" }) => {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return null;
  }
  return (
    <div className="bg-lightGrey pt-[80px]">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8">
        <div className="w-full mx-auto">
          <div className="flex flex-col xl:flex-row">
            <div className="w-full xl:w-2/3 lg:pr-6">
              {sections.map((section, index) => {
                if (!section?.sectionId || section.sectionId === "highlight") {
                  return null;
                }
                const Component = pageComponents[section.sectionId];
                return Component ? 
                <Component 
                  key={index} 
                  data={section} 
                  language={language} 
                /> : null;
              })}
            </div>
            <div className="w-full xl:w-1/3 mt-8 lg:mt-0">
              {sections.map((section, index) => {
                if (section.sectionId !== "highlight") {
                  return null;
                }
                const HighLightComponent = pageComponents[section.sectionId];
                return HighLightComponent ? 
                <HighLightComponent 
                  key={index} 
                  data={section} 
                  language={language} 
                /> : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
