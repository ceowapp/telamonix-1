import { ReactNode } from 'react';
import { Settings, HelpCircle } from "lucide-react";

export interface IDropdownItem {
  label: string;
  key: string;
  description: string;
  icon: ReactNode;
}

export const DropdownItems: IDropdownItem[] = [
  { label: 'My Settings', href: '/settings', icon: Settings },
];

export const NavbarItemsNoDropdown = [
  { 
    label: 'Technology', 
    href: '/additionals',
    description: "Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.", 
  },
  { 
    label: 'Resource', 
    href: '/additionals',
    description: "Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.", 
  },
  { 
    label: 'Price', 
    href: '/additionals',
    description: "Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.", 
  },
];

export const NavbarItemsDropdown = {
  Solutions: [
    {
      label: "Web Development",
      key: "web_development",
      href: "/en/solutions/app-development",
      description: "Modern, scalable, and responsive web solutions.",
      icon: "globe",
    },
    {
      label: "Mobile Development",
      key: "app_development",
      href: "/en/solutions/app-development",
      description: "High-performance native and cross-platform apps.",
      icon: "deviceMobile",
    },
    {
      label: "AI Solutions",
      key: "ai_solutions",
      href: "/en/solutions/ai-ondemand",
      description: "Automate and optimize with smart algorithms.",
      icon: "cpu",
    },
    {
      label: "Data Analytics",
      key: "data_analytics",
      href: "/en/solutions",
      description: "Make data-driven decisions with confidence.",
      icon: "chartBar",
    },
    {
      label: "Cloud & DevOps",
      key: "cloud_devops",
      href: "/en/solutions/cloud-computing",
      description: "Reliable, scalable, and secure cloud solutions.",
      icon: "cloud",
    },
    {
      label: "Robotics",
      key: "robotics",
      href: "/en/solutions/robotics",
      description: "Advanced robotics control and motion planning.",
      icon: "cog",
    },
  ],
  Developers: [
    {
      label: "Projects",
      key: "projects",
      href: "/en/projects",
      description: "Explore our portfolio of real-world solutions and innovations.",
      icon: "folder",
    },
    {
      label: "Pricing",
      key: "pricing",
      href: "/en/pricing",
      description: "Transparent pricing for tailored web, mobile, and AI solutions.",
      icon: "currencyDollar",
    },
    {
      label: "Company",
      key: "company",
      href: "/en/about",
      description: "Learn more about our mission, values, and journey.",
      icon: "office",
    },
    {
      label: "Technologies",
      key: "technologies",
      href: "/en/technology",
      description: "Discover the tools and technologies powering our solutions.",
      icon: "code",
    },
    {
      label: "Careers",
      key: "careers",
      href: "/en/careers",
      description: "Join our team and help build the future of technology.",
      icon: "users",
    }
  ],
  Resources: [
    {
      label: "About",
      key: "about",
      href: "/en/about",
      description: "Learn more about our mission, values, and journey.",
      icon: "informationCircle",
    },
    {
      label: "Assistance",
      key: "assistance",
      href: "/en/contact",
      description: "Start a project, ask questions, or request a consultation.",
      icon: "support",
    },
    {
      label: "Innovation",
      key: "innovation",
      href: "/en/technology",
      description: "Discover the tools and technologies powering our solutions.",
      icon: "lightBulb",
    },
    {
      label: "Offerings",
      key: "offerings",
      href: "/en/solutions",
      description: "Comprehensive services from web and mobile to cloud and AI.",
      icon: "collection",
    },
    {
      label: "Careers",
      key: "career",
      href: "/en/careers",
      description: "Join our team and help build the future of technology.",
      icon: "briefcase",
    }
  ],
};