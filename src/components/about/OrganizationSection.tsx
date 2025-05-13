import React from 'react';
import Image from "next/image";
import type { Page } from '@/payload-types'
import { aboutTeamMembers, aboutTeamMembersHeading } from '@/constants/data';
import { checkValidHTML } from '@/utilities/checkValidHTML';
import { HTMLRenderer } from '../shared/HTMLRenderer';

interface MemberProps {
  name: string;
  title: string;
  imageSrc: string;
  backgroundGradient: string; 
}

const MemberCard: React.FC<MemberProps> = ({ name, title, imageSrc, backgroundGradient }) => {
  return (
    <div className="h-[510px] bg-white rounded-[20px] overflow-hidden relative">
      <div
        className="absolute inset-0 w-full"
        style={{ background: backgroundGradient, height: '411px', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}
      >
        <div 
          className="absolute rounded-full"
          style={{
            width: '594px',
            height: '594px',
            top: '146px',
            left: '-297px',
            transform: 'rotate(-90deg)',
            opacity: '50%',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, #FFFFFF 100%)',
            zIndex: 1
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            width: '380px',
            height: '380px',
            top: '48px',
            left: '162px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, #FFFFFF 100%)',
            zIndex: 1
          }}
        />
      </div>
      <div className="w-full flex justify-center relative z-10"> 
        <div className="relative w-[314px] aspect-[3/4] h-[411px]"> 
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-fit"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="p-4 flex flex-col justify-center items-center w-full relative z-10">
        <h3 className="text-headline-large mb-1 text-center">{name}</h3>
        <p className="text-body-large text-center">{title}</p>
      </div>
    </div>
  );
};

interface OrganizationSectionProps {
  data?: NonNullable<NonNullable<Page['sectionsTab']>['sections']>[0];
  language?: 'en' | 'vi' | 'zh';
  loading?: boolean;
  error?: string | null;
}

const FallbackComponent = React.memo(({  
  data, 
  projectItems = [], 
  language = 'en',
  loading = false, 
  error = null 
}: OrganizationSectionProps) => {
  const teamMembers = React.useMemo(() => {
    return data?.sectionjson && Array.isArray(data.sectionjson) && data.sectionjson.length > 0
      ? data.sectionjson
      : aboutTeamMembers;
  }, [data.sectionjson]);
  return (
    <section className="w-full mx-auto pt-10 sm:pt-16 md:pt-24 lg:pt-32 xl:pt-36 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="w-full md:max-w-[85%] lg:max-w-[60%] xl:max-w-[55%] flex-grow">
        <h2 className="text-display-regular-black mb-2 sm:mb-4">
          {data?.title || aboutTeamMembersHeading.title}
        </h2>
        <p className="text-body-regular-black mb-6 sm:mb-16">
          {data?.description || aboutTeamMembersHeading.description}        
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {teamMembers.map((member) => (
          <MemberCard
            key={member.name}
            name={member.name}
            title={member.title}
            imageSrc={member.imageSrc}
            backgroundGradient={member.backgroundGradient}
          />
        ))}
      </div>
    </section>
  );
});

const OrganizationSection: React.FC<OrganizationSectionProps> = ({ 
  data,
  language = 'en',
  loading = false,
  error = null 
}) => {
  if (!checkValidHTML(data.codeField)) {
    return <FallbackComponent data={data} />;
  }
  return <HTMLRenderer data={data.codeField} />;
};

export default React.memo(OrganizationSection);

