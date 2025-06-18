"use client"

import React, { forwardRef, useRef, useEffect } from "react";
import Image from 'next/image';
import { motion } from 'framer-motion';

const MenuLink = forwardRef(({ type, href, imageSrc, title, description, beta }, ref) => {
  const isMainLink = type === "main";
  return (
    <motion.a
      ref={ref}
      href={href}
      className="text-white items-center py-4 px-4 no-underline inline-flex max-w-full hover:bg-purple-800 rounded-lg transition-all duration-300 ease-in-out"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isMainLink && (
        <div className="h-16 w-16 border border-white border-opacity-20 bg-purple-700 rounded-lg flex justify-center items-center shadow-lg">
          <Image
            className="max-w-full align-middle"
            src={imageSrc}
            loading="lazy"
            width={35}
            height={35}
            alt={title}
          />
        </div>
      )}

      <div className={`ml-4 flex-grow ${isMainLink ? "col-span-2" : ""}`}>
        <div className="flex items-center gap-2 text-sm font-semibold">
          {title}
          {beta && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">BETA</span>
          )}
        </div>
        {isMainLink && (
          <p className="opacity-80 mt-1 text-xs">{description}</p>
        )}
      </div>
    </motion.a>
  );
});

MenuLink.displayName = 'MenuLink';

export const ResourceMenu = forwardRef<HTMLDivElement>((props, ref) => {
  const linkRefs = useRef([]);

  useEffect(() => {
    if (props.active) {
      linkRefs.current[0]?.focus();
    }
  }, [props.active]);

  function onKeyPress(event) {
    const currentIndex = linkRefs.current.indexOf(document.activeElement);
    if (event.key === 'ArrowDown') {
      const newFocused = linkRefs.current[currentIndex + 1] || linkRefs.current[0];
      newFocused.focus();
    } else if (event.key === 'ArrowUp') {
      const newFocused = linkRefs.current[currentIndex - 1] || linkRefs.current[linkRefs.current.length - 1];
      newFocused.focus();
    }
  }

   const capabilities = [
    [
      {
        title: "About",
        items: [
          {
            href: "/en/about",
            imageSrc: "/images/global/navbar/business.svg",
            title: "Who We Are",
            description: "Learn more about our mission, values, and journey.",
            beta: false,
            type: "main"
          },
          {
            href: "/en/careers",
            imageSrc: "/images/global/navbar/career.svg",
            title: "Work With Us",
            description: "Join our team and help build the future of technology.",
            beta: false,
            type: "main"
          }
        ]
      },
      {
        title: "Assistance",
        items: [
          {
            href: "/en/contact",
            imageSrc: "/images/global/navbar/support.svg",
            title: "Contact & Help",
            description: "Start a project, ask questions, or request a consultation.",
            beta: false,
            type: "main"
          }
        ]
      }
    ],
    [
      {
        title: "Innovation",
        items: [
          {
            href: "/en/technology",
            imageSrc: "/images/global/navbar/technology-1.svg",
            title: "Tech Stack",
            description: "Discover the tools and technologies powering our solutions.",
            beta: false,
            type: "main"
          }
        ]
      },
      {
        title: "Offerings",
        items: [
          {
            href: "/en/solutions",
            imageSrc: "/images/global/navbar/solution-1.svg",
            title: "Service Portfolio",
            description: "Comprehensive services from web and mobile to cloud and AI.",
            beta: false,
            type: "main"
          }
        ]
      }
    ]
  ];

  return (
    <nav
      ref={ref}
      className="w-dropdown-list w-full bg-transparent absolute left-1/2 transform -translate-x-1/2 rounded-lg"
      id="w-dropdown-list-0"
      aria-labelledby="w-dropdown-toggle-0"
    >
      <div className="w-full max-w-4xl bg-purple-900 flex justify-between">
        <div className="w-full border-dropdown-border px-6 py-8 flex gap-x-8">
          {capabilities.map((section, index) => (
            <div key={index} className="flex flex-col h-full">
              {section.map((subsection, subIndex) => (
                <React.Fragment key={`${index}-${subIndex}`}>
                  <h1 className="text-start p-4 font-bold text-lg text-white">{subsection.title}</h1>
                  {subsection.items.map((item, itemIndex) => (
                    <React.Fragment key={itemIndex}>
                      <MenuLink
                        ref={el => linkRefs.current.push(el)}
                        type={item.type}
                        href={item.href}
                        imageSrc={item.imageSrc}
                        title={item.title}
                        description={item.description}
                        beta={item.beta}
                      />
                      {itemIndex !== subsection.items.length - 1 && <hr className="my-4 border-b border-gray-700" />}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
              {index !== capabilities.length - 1 && <hr className="my-4 border-b border-gray-700" />}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
});

