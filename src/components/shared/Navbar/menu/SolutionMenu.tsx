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

export const SolutionMenu = forwardRef<HTMLDivElement>((props, ref) => {
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
        title: "Web & Mobile",
        items: [
          {
            href: "/en/solutions/app-development",
            imageSrc: "/images/global/navbar/web.svg",
            title: "Web Development",
            description: "Modern, scalable, and responsive web solutions",
            beta: false,
            type: "main"
          },
          {
            href: "/en/solutions/app-development",
            imageSrc: "/images/global/navbar/mobile.svg",
            title: "Mobile Development",
            description: "High-performance native and cross-platform apps",
            beta: false,
            type: "main"
          }
        ]
      },
      {
        title: "Cloud & DevOps",
        items: [
          {
            href: "/en/solutions/cloud-computing",
            imageSrc: "/images/global/navbar/cloud.svg",
            title: "Cloud Infrastructure",
            description: "Reliable, scalable, and secure cloud solutions",
            beta: false,
            type: "main"
          },
          {
            href: "/en/solutions/cloud-computing",
            imageSrc: "/images/global/navbar/devops.svg",
            title: "DevOps & CI/CD",
            description: "Streamlined development and deployment pipelines",
            beta: false,
            type: "main"
          }
        ]
      },
      {
        title: "Cybersecurity",
        items: [
          {
            href: "/en/solutions",
            imageSrc: "/images/global/navbar/security.svg",
            title: "Threat Protection",
            description: "Comprehensive protection from cyber threats",
            beta: false,
            type: "main"
          },
          {
            href: "/en/solutions",
            imageSrc: "/images/global/navbar/compliance.svg",
            title: "Compliance & Governance",
            description: "Ensure regulatory compliance and data security",
            beta: false,
            type: "main"
          }
        ]
      }
    ],
    [
      {
        title: "Data & AI",
        items: [
          {
            href: "/en/solutions/ai-ondemand",
            imageSrc: "/images/global/navbar/analytics.svg",
            title: "Business Intelligence",
            description: "Make data-driven decisions with confidence",
            beta: false,
            type: "main"
          },
          {
            href: "/en/solutions",
            imageSrc: "/images/global/navbar/ai.svg",
            title: "AI & Machine Learning",
            description: "Automate and optimize with smart algorithms",
            beta: false,
            type: "main"
          }
        ]
      },
      {
        title: "Robotics",
        items: [
          {
            href: "/en/solutions/robotics",
            imageSrc: "/images/global/navbar/robotics.svg",
            title: "Control Systems",
            description: "Advanced robotics control and motion planning",
            beta: false,
            type: "main"
          },
          {
            href: "/en/solutions/robotics",
            imageSrc: "/images/global/navbar/hardware.svg",
            title: "Hardware Integration",
            description: "Seamless integration of sensors and components",
            beta: false,
            type: "main"
          }
        ]
      },
      {
        title: "Support Services",
        items: [
          {
            href: "/en/solutions",
            imageSrc: "/images/global/navbar/infra.svg",
            title: "Infrastructure Planning",
            description: "Cloud setup, migration, and recovery planning",
            beta: false,
            type: "main"
          },
          {
            href: "/en/solutions",
            imageSrc: "/images/global/navbar/audit.svg",
            title: "Security Assessment",
            description: "Identify and fix vulnerabilities effectively",
            beta: false,
            type: "main"
          }
        ]
      }
    ]
  ];

  const additionalLinks = [
    {
      href: "/en/solutions/ai-ondemand",
      title: "Data & AI Services",
      type: "sub"
    },
    {
      href: "/en/solutions/robotics",
      title: "Robotics Development",
      type: "sub"
    },
    {
      href: "/en/solutions/cloud-computing",
      title: "Cloud & Infrastructure",
      type: "sub"
    },
    {
      href: "/en/solutions",
      title: "Cybersecurity Solutions",
      type: "sub"
    }
  ];


  return (
    <nav
      ref={ref}
      className="w-dropdown-list w-full h-fit bg-transparent absolute left-1/2 transform -translate-x-1/2 z-[99999]"
      id="w-dropdown-list-0"
      aria-labelledby="w-dropdown-toggle-0"
    >
      <div className="w-full border-opacity-10 bg-purple-900 rounded-lg flex justify-between">
        <div className="w-4/5 border-r border-solid border-dropdown-border px-6 py-8 flex gap-x-8">
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
        <div className="w-1/5 px-6 py-8">
          <div className="px-6 py-8">
            <h1 className="text-start p-4 font-bold text-lg text-white">Additional Links</h1>
            {additionalLinks.map((link, index) => (
              <MenuLink
                key={index}
                ref={el => linkRefs.current.push(el)}
                type={link.type}
                href={link.href}
                title={link.title}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
});


