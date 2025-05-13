import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CompanyLogoProps {
  imageUrl: string;
  language: 'en' | 'vi' | 'zh';
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ imageUrl, language = 'en' }) => {
  return (
    <div className="flex-shrink-0">
      <Link href={`/${language}`} className="flex items-center">
        <Image 
          src={imageUrl} 
          alt="Naiscorp Logo" 
          width={200} 
          height={48} 
          className="h-8 w-auto xs:h-[20px] sm:h-10 md:h-11 lg:h-12 object-contain"
          sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px"
          priority={true}
        />
      </Link>
    </div>
  );
};

export default React.memo(CompanyLogo);