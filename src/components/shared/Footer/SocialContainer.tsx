import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { socialLinks } from '@/constants/data'

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function SocialContainer() {
  return (
    <div className="flex items-center space-x-4">
      {socialLinks.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex 
            items-center 
            justify-center 
            transition-all
            duration-200
            hover:scale-110
          "
        >
          <Image
            src={social.icon}
            alt={social.name}
            width={32}
            height={32}
          />
        </Link>
      ))}
    </div>
  );
}
