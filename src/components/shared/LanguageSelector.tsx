"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';
import { useRouter, usePathname } from "next/navigation";
import { translatePathSegment } from '@/utilities/translatePathSegment';
import { languageCodeToName, selectableLanguages, flagMap } from "@/constants/language";

const LanguageSelector = ({ currentLanguage = 'en', isDark = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentLang = currentLanguage || pathname.split('/')[1] || 'en';
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectionChange = useCallback((lang) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const isFirstSegmentLanguage = selectableLanguages.includes(pathSegments[0]);
    let newPathSegments = [];
    if (isFirstSegmentLanguage) {
      newPathSegments = [lang];
      for (let i = 1; i < pathSegments.length; i++) {
        const translatedSegment = translatePathSegment(
          pathSegments[i], 
          pathSegments[0], 
          lang            
        );
        newPathSegments.push(translatedSegment);
      }
    } else {
      newPathSegments = [lang, ...pathSegments];
    }
    router.push(`/${newPathSegments.join('/')}`);
    setIsOpen(false);
  }, [pathname, router]);

  const handleKeyDown = (e, lang) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectionChange(lang);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select language: currently ${languageCodeToName[currentLang]}`}
        className="flex items-center gap-1 px-2 py-2 cursor-pointer select-none"
      >
        <Image
          src={flagMap[currentLang] || "/svgs/compressed_en-flag.svg"}
          alt={`${languageCodeToName[currentLang]} flag`}
          width={24}
          height={17}
          className="rounded-sm"
          priority={true}
        />
        <ChevronDown 
          className={cn(
            "w-5 h-5 font-bold transition-transform", 
            isOpen ? "transform rotate-180" : "",
            isDark ? "text-[#454545]" : "text-white"
          )} 
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <ul 
          className="absolute left-0 mt-2 w-32 sm:w-40 bg-white dark:bg-gray-800 rounded-md shadow-md overflow-hidden z-10 text-sm"
          role="listbox"
          aria-label="Language options"
          tabIndex={-1}
        >
          {selectableLanguages.map((lang) => (
            <li
              key={lang}
              id={`lang-option-${lang}`}
              role="option"
              aria-selected={currentLang === lang}
              tabIndex={0}
              onClick={() => handleSelectionChange(lang)}
              onKeyDown={(e) => handleKeyDown(e, lang)}
              className="flex items-center justify-between px-3 py-1.5 sm:px-4 sm:py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none"
            >
              <div className="flex items-center">
                <Image
                  src={flagMap[lang] || "/svgs/en-flag.svg"}
                  alt={`${languageCodeToName[lang]} flag`}
                  width={24}
                  height={17}
                  quality={75}
                  priority
                  className="mr-2 rounded-sm w-5 h-3.5 sm:w-6 sm:h-4"
                />
                <span className="text-xs sm:text-sm">{languageCodeToName[lang]}</span>
              </div>
              {currentLang === lang && (
                <Check 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" 
                  aria-label="Currently selected language"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(LanguageSelector);