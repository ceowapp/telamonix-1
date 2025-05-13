import React from 'react';
import { technologyHighlightItems, technologyHighLightHeading } from '@/constants/data';
import Divider from '../shared/Divider';
import type { Page } from '@/payload-types'
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-3 leading-tight">
      <h1 className="text-display-regular-gradient-1">
        {title}
      </h1>
      {subtitle && (
        <p className="text-body-large-medium-black w-full lg:max-w-[80%]">
          {subtitle}
        </p>
      )}
    </div>
  );
};

interface ListItemProps {
  title: string;
  description: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col space-y-2 p-4 duration-300">
      <h3 className="text-title-large-black">{title}</h3>
      <p className="text-body-large-black">{description}</p>
    </div>
  );
};

interface ListSectionProps {
  items: {
    title: string;
    description: string;
  }[];
}

const ListSection: React.FC<ListSectionProps> = ({ items }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
      {items.map((item, index) => (
        <ListItem
          key={`highlight-${index}-${Math.random()}`}
          title={item.title}
          description={item.description}
        />
      ))}
    </section>
  );
};

interface MainSectionProps {
  heading: string;
  content: string;
}

const MainSection: React.FC<MainSectionProps> = ({ heading, content }) => {
  return (
    <div className="space-y-3 sm:space-y-4 text-center md:text-left mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{heading}</h2>
      <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto md:mx-0">
        {content}
      </p>
    </div>
  );
};

interface HighlightSectionProps {
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
}: ContentSectionProps) => {
  const highlights = React.useMemo(
    () => (Array.isArray(data?.sectionjson) ? data.sectionjson : technologyHighlightItems),
    [data?.sectionjson]
  );
  return (
    <section className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-12">
      <Header
        title={data?.title || technologyHighLightHeading?.title}
        subtitle={data?.description || technologyHighLightHeading?.description}
      />
      <Divider className="my-8" />
      <ListSection items={highlights} />
    </section>
  );
});

const HighlightSection: React.FC<HighlightSectionProps> = ({ 
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

export default React.memo(HighlightSection);