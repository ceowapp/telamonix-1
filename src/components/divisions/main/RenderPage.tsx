"use client";

import React, { Fragment } from "react";
import type { Page } from '@/payload-types'
import HeadingSection from "./HeadingSection";
import BodySection from "./BodySection";

const pageComponents: Record<string, React.ComponentType<any>> = {
  heading: HeadingSection,
  body: BodySection,
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


