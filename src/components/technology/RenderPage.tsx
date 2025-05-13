"use client";

import React, { Fragment } from "react";
import HeadingSection from "./HeadingSection";
import OfferSection from "./OfferSection";
import InfoSection from "./InfoSection";
import ContentSection from "./ContentSection";
import KeySection from "./KeySection";
import HighLightSection from "./HighLightSection";
import type { Page } from '@/payload-types'
import './index.scss';

const pageComponents: Record<string, React.ComponentType<any>> = {
  heading: HeadingSection,
  info: InfoSection,
  key: KeySection,
  offer: OfferSection,
  highlight: HighLightSection,
  content: ContentSection
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
    <>
      {sections.map((section, index) => {
        if (!section?.sectionId) {
          return null;
        }
        const Component = pageComponents[section.sectionId];
        if (!Component) {
          return null;
        }
        return (
          <Fragment key={index}>
            <Component 
              data={section}
              language={language} 
            />
          </Fragment>
        );
      })}
    </>
  );
};


