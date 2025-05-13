import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BaseItem {
  text: string;
  href?: string;
}

interface ContactItem extends BaseItem {
  icon?: string;
  name?: string;
}

interface FooterColumnProps {
  title: string;
  subtitle?: string;
  items: ContactItem[];
  isLink?: boolean;
  isContact?: boolean;
  className?: string;
  itemClassName?: string;
}

const FooterColumn: React.FC<FooterColumnProps> = ({
  title,
  subtitle,
  items,
  isLink = false,
  isContact = false,
  className,
  itemClassName,
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col justify-start items-start w-full",
        "px-0 sm:px-0 lg:px-0",
        className
      )}
    >
      {title && (
        <h3 className="text-body-large-grey mb-3 sm:mb-6">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-body-large-grey mb-6 leading-normal">
          {subtitle.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      )}
      <ul className="space-y-4 sm:space-y-5 w-full">
        {items.map((item, index) => (
          <li
            key={index}
            className={cn(
              "text-body-large-grey transition-colors duration-200",
              isContact && "text-white text-body-regular",
              !isContact && !item.href && "text-title-small-blue cursor-pointer",
              !isContact && item.href && "text-white font-semibold hover:text-gray-300",
              itemClassName
            )}
          >
            {isLink && item.href ? (
              <Link 
                href={item.href} 
                className="text-title-small-white stransition-colors duration-200"
              >
                {item.text}
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt={item.name || 'icon'}
                    width={16}
                    height={16}
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 object-contain"
                  />
                )}
                <span>{item.text}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;


