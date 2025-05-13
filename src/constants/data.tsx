import { Button } from '@/components/shared/InfoComponents';

export const baseMediaUrl = process.env.APP_ENV === 'production' 
  ? process.env.BASE_MEDIA_URL
  : '';

/***
 * 
 * HOME PAGE
 * 
***/
export const homeHeading = {
  title: 'Compute Future',
  description: 'Creating the best values of technologies in daily lives and fostering disruptive innovations',
  backgroundMediaLink: `${baseMediaUrl}/videos/compressed_hero-background.mp4`,
  backgroundMediaLinkWebm: `${baseMediaUrl}/videos/compressed_hero-background.webm`
}

export const homeMissionHeading = {
  title: 'Sustainability and Innovation',
  subtitle: 'Driving Innovation to Enhance Productivity and Cost Efficiency',
  description: 'At Naiscorp, sustainability is about creating smarter solutions that help our clients reduce operational costs while maximizing productivity. By combining cutting-edge technology with innovative approaches, we deliver systems that are not only efficient but also aligned with long-term economic and technological goals.'
}

export const homeInterHeading = {
  title: "What are we doing ",
};

export const homeServices = [
  { title: 'Production House', imageLink: `${baseMediaUrl}/images/pages/shared/share-1.png`, link: '/divisions/production_house' },
  { title: 'Applied AI Solutions', imageLink: `${baseMediaUrl}/images/pages/shared/share-14.png`, link: '/divisions/fnb' },
  { title: 'Investment & Incubation', imageLink: `${baseMediaUrl}/images/pages/shared/share-4.png`, link: '/divisions/investment_venture' },
  { title: 'Smart Robotics', imageLink: `${baseMediaUrl}/images/pages/shared/share-15.png`, link: '/divisions/robotics' },
  { title: 'Insurtech', imageLink: `${baseMediaUrl}/images/pages/shared/share-2.png`, link: '/divisions/insurtech' },
];

export const homeSolutionsHeading = {
  title: "Summary of ",
  subtitle: "Naiscorp's solutions",
};

export const homeSolutions = [
  "Reliable High-Performance Computing and Distributed Systems",
  "Big Data - Data Lake - Data Warehouse",
  "AI-Powered Recognition and Automation",
  "Digital Maps and Resource Management",
  "Golf Technology Solutions",
  "SOTA Tech applications on demand",
  "Robotics and Smart Hardware",
  "Insurance Technology Solutions",
  "Business Intelligence and Enterprise Solutions",
  "E-Commerce and Consumer Platforms",
  "Industrial level AI On Demand",
];

export const homeOffersHeading = {
  title: "What can we",
  subtitle: "Offer?",
  description: "Providing customers with high quality products, services, and solutions to help transform the world"
};

export const homeOffers = [
  { 
    title: 'Production House', 
    description: 'Building large data organization systems - high performance - distributed - high load - etc. for companies such as Vinfast, Vinhomes',
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-1.png`,
    color: '#FFEECC',
    link: '/divisions/production_house',
    chipGroups: [
      ['SOTA AI Apps', 'Private AI Assistant'],
      ['Data Warehouse', ['BigData', 'DMS']]
    ],
    chipPositions: {
      0: [
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        { start: { x: 0, y: 40 }, end: { x: 160, y: 0 } }
      ],
      1: [
        { start: { x: 0, y: 80 }, end: { x: 0, y: 40 } },
        { start: { x: 0, y: 120 }, end: { x: 120, y: 40 } },
        { start: { x: 0, y: 160 }, end: { x: 240, y: 40 } }
      ]
    }
  },
  { 
    title: 'Robotics', 
    description: 'Building large data organization systems - high performance - distributed - high load - etc. for companies such as Vinfast, Vinhomes',
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-3.png`,
    color: '#FFF0F0',
    link: '/divisions/robotics',
    chipGroups: [
      ['Edge Computing', ['ROS2', 'AI on Edge']],
      ['3D Cognition Perception']
    ],
    chipPositions: {
      0: [
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        { start: { x: 0, y: 40 }, end: { x: 160, y: 0 } }
      ],
      1: [
        { start: { x: 0, y: 80 }, end: { x: 0, y: 40 } }
      ]
    }
  },
  { 
    title: 'Insurtech', 
    description: 'Building large data organization systems - high performance - distributed - high load - etc. for companies such as Vinfast, Vinhomes',
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-2.png`,
    color: '#CCE5FF',
    link: '/divisions/insurtech',
    chipGroups: [
      ['High Performance Core', 'Realtime System'],
      ['Data Analytics', 'Middleware', 'Sale Portal']
    ],
    chipPositions: {
      0: [
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        { start: { x: 0, y: 40 }, end: { x: 140, y: 0 } }
      ],
      1: [
        { start: { x: 0, y: 80 }, end: { x: 0, y: 40 } },
        { start: { x: 0, y: 120 }, end: { x: 180, y: 40 } }
      ]
    }
  },
  { 
    title: 'FnB AI & Automation', 
    description: 'Building large data organization systems - high performance - distributed - high load - etc. for companies such as Vinfast, Vinhomes',
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-2.png`,
    color: '#E0FFE0',
    link: '/divisions/fnb',
    chipGroups: [
      ['Computer Vision', 'AI on Edge'],
      ['Automation System']
    ],
    chipPositions: {
      0: [
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        { start: { x: 0, y: 40 }, end: { x: 180, y: 0 } }
      ],
      1: [
        { start: { x: 0, y: 80 }, end: { x: 0, y: 40 } },
        { start: { x: 0, y: 120 }, end: { x: 120, y: 40 } },
        { start: { x: 0, y: 160 }, end: { x: 240, y: 40 } }
      ]
    }
  },
  { 
    title: 'Investment', 
    description: 'Building large data organization systems - high performance - distributed - high load - etc. for companies such as Vinfast, Vinhomes',
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-4.png`,
    color: '#F0F0FF',
    link: '/divisions/investment_venture',
    chipGroups: [
      ['Investment', 'Incubation', 'Risk']
    ],
    chipPositions: {
      0: [
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        { start: { x: 0, y: 40 }, end: { x: 120, y: 0 } },
        { start: { x: 0, y: 80 }, end: { x: 240, y: 0 } }
      ]
    }
  }
];

export const homeProjectsHeading = {
  title: "Spotlight ",
  subtitle: "Projects",
  description: "We always looking for next millions users products - provide great impact in people's live"
};

export const homeProjects = [
  {
    id: 1,
    title: "Resource Map for Cable TV Industry",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-1.png`,
    description: "Managing 3 million km of cables nationwide with GIS technology."
  },
  {
    id: 2,
    title: "Robot Friend and Tutor for Children",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-3.png`,
    description: "AI-powered companion with speech recognition and learning modules."
  },
  {
    id: 3,
    title: "AI Car Damage Assessment System",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-2.png`,
    description: "Real-time damage evaluation using computer vision."
  },
  {
    id: 4,
    title: "AIROS – AI Restaurant Operating System",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-4.png`,
    description: "Comprehensive automation for restaurant operations."
  },
  {
    id: 5,
    title: "Golf Social Network & Handicap System",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-4.png`,
    description: "Connecting golf enthusiasts with clubs and scoring systems."
  },
  {
    id: 6,
    title: "High-Performance Computing Systems",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-2.png`,
    description: "Distributed systems for data-intensive tasks like search engines."
  },
  {
    id: 7,
    title: "Single Function Apps for Global Markets",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-1.png`,
    description: "Multilingual, fault-tolerant apps operating in 35 languages."
  },
  {
    id: 8,
    title: "Performance Tracking BI System",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-3.png`,
    description: "Enterprise-grade solutions for consumer lending and robotics operations."
  },
  {
    id: 9,
    title: "Virtual Assistant System for Employees",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-1.png`,
    description: "AI-powered chatbots and document OCR for corporate use."
  },
  {
    id: 10,
    title: "Embedded AI Systems",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-16.png`,
    description: "Real-time data processing and decision-making at the edge."
  }
];

export const homeMissions = {
  title: "Our Commitment to Sustainability Through Innovation:",
  items: [
    {
      title: "Energy-Efficient Technologies",
      color: "blue",
      points: [
        "Developing AI and robotics systems that consume less energy while maintaining top performance.",
        "Leveraging low-power computing technologies like analog chips and edge AI to reduce operational energy costs for our clients."
      ]
    },
    {
      title: "Sustainable Automation",
      color: "green",
      points: [
        "Transforming industries such as food and beverage, insurance, and logistics with AI-driven solutions that streamline processes, optimize resource usage, and reduce waste.",
        "Providing automated systems that decrease dependency on manual labor, improve precision, and reduce turnaround times."
      ]
    },
    {
      title: "Boosting Productivity Through Technology",
      color: "cyan",
      points: [
        "Offering AI tools to automate repetitive tasks, freeing resources for high-value activities.",
        "Creating integrated systems for data-driven decision-making to enhance business scalability."
      ]
    },
    {
      title: "Operational Cost Reduction",
      color: "orange",
      points: [
        "Utilizing AI for predictive analytics and maintenance, reducing downtime and repair costs.",
        "Enhancing efficiency in industries like insurance and F&B with AI-driven claims assessments and resource allocation."
      ]
    }
  ]
};

export const homeWhyItems = {
  title: 'Why It Matters:',
  items: [
    {
      imageSrc: `${baseMediaUrl}/images/pages/shared/share-10.png`,
      title: 'Cost Saving',
      description: 'Helping clients reduce expenses by automating processes and optimizing energy use.',
    },
    {
      imageSrc: `${baseMediaUrl}/images/pages/shared/share-9.png`,
      title: 'Increased Efficiency',
      description: 'Delivering technologies that streamline operations and improve productivity across industries.',
    },
    {
      imageSrc: `${baseMediaUrl}/images/pages/shared/share-8.png`,
      title: 'Future-Proof Solutions',
      description: 'Providing scalable systems that adapt to evolving business needs, ensuring long-term operational success.',
    },
  ]
};

export const homeNewsHeader = {
  title: 'News and insights',
  description: 'The world is changing rapidly, technologies are disrupting our businesses and life'
};

export const homeNewsContent = [
  {
    imageSrc: `${baseMediaUrl}/images/pages/home/home-2.png`,
    title: 'Successfully invested and incubated startups like VGS',
    description: 'Co-fund Handapp, Vbee AI call bot, Conn- HR management, 2019-2023 in Emai- FHB Automation',
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/home/home-3.png`,
    title: 'Successfully invested and incubated startups like VGS',
    description: 'Co-fund Handapp, Vbee AI call bot, Conn- HR management, 2019-2023 in Emai- FHB Automation',
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/home/home-4.png`,
    title: 'Successfully invested and incubated startups like VGS',
    description: 'Co-fund Handapp, Vbee AI call bot, Conn- HR management, 2019-2023 in Emai- FHB Automation',
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/home/home-5.png`,
    title: 'Successfully invested and incubated startups like VGS',
    description: 'Co-fund Handapp, Vbee AI call bot, Conn- HR management, 2019-2023 in Emai- FHB Automation',
  },
];

/***
 * 
 * ABOUT PAGE
 * 
***/

export const aboutCoreValues = [
  'Innovation',
  'Integrity',
  'Excellence',
  'Collaboration'
];

export const aboutValueHeading = {
  title: "Core Values and Philosophy",
  description: "At Naiscorp, our entrepreneurial spirit is driven by a profound belief in the transformative power of technology. We strive to create ecosystems that not only fuel business growth but also have a positive societal impact."
};

export const aboutVisions = [
  {
    items: [
      {
        imgSrc: `${baseMediaUrl}/images/pages/about/about-3.png`,
        title: 'Mission:',
        subtitle: 'Creating the best values of technologies in daily lives and fostering disruptive innovations',
        subtitleClassName: 'text-headline-large leading-tight mb-4',
        description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        overlayTitle: 'Vision:',
        imageContainerClassName: 'h-full',
        imageClassName: 'rounded-2xl',
        className: '!min-h-[400px] sm:!min-h-[450px]',
        cardContainerClassName: 'h-[300px] md:min-h-[400px] lg:min-h-[450px]',
        overlayDescription: 'To be the leading company in sustainable innovative solutions.',
        overlayClassName: 'px-4 w-full sm:max-w-[75%] lg:max-w-[85%] xl:max-w-[75%] h-full flex flex-col items-start justify-end pb-0 sm:pb-1',
        titleClassName: 'text-title-medium-teriary',
        overlayTitleClassName: 'text-title-medium-blue',
        overlayDescriptionClassName: 'text-headline-large-white mt-2',
        descriptionClassName: 'text-body-large-black',
        order: 'imageFirst',
        imagePriority: true,
        overlay: true,
      },
    ],
  },
];

export const aboutTeamMembersHeading = {
  title: "Leadership Team:",
  description: "Established in 2006, led by Tai Nguyen, with investment from IDGV and Softbank — proposed for M&A from Google, Microsoft, and Yahoo."
};

export const aboutTeamMembers = [
  {
    name: "Nguyen Xuan Tai",
    title: "Founder Naiscorp",
    imageSrc: `${baseMediaUrl}/images/pages/about/about-4.png`,
    backgroundGradient: "linear-gradient(135deg, #F3FBFF 0%, #70B7FF 100%)",
  },
  {
    name: "Pham Xuan Lan",
    title: "Marketing Leader",
    imageSrc: `${baseMediaUrl}/images/pages/about/about-5.png`,
    backgroundGradient: "linear-gradient(135deg, #F3FFFE 0%, #2DDE7A 100%)",
  },
  {
    name: "Pham Thanh Tam",
    title: "CTO",
    imageSrc: `${baseMediaUrl}/images/pages/about/about-6.png`,
    backgroundGradient: "linear-gradient(135deg, #FEF5FF 0%, #B968FB 100%)",
  },
];

export const aboutMileStonesHeading = {
  title: "Company",
  subtitle: "Milestone",
  description: "Established in 2006, led by Tai Nguyen, with investment from IDGVV and Softbank – proposed for MnA from Google, Microsoft, and Yahoo."
};

export const aboutMileStones = [
  { year: 2006, id: 1, title: "Search Engine", imageSrc: `${baseMediaUrl}/images/pages/shared/share-1.png` },
  { year: 2008, id: 2, title: "Search Engine", imageSrc: `${baseMediaUrl}/images/pages/shared/share-3.png` },
  { year: 2010, id: 3, title: "Search Engine", imageSrc: `${baseMediaUrl}/images/pages/shared/share-2.png` },
  { year: 2012, id: 4, title: "Search Engine", imageSrc: `${baseMediaUrl}/images/pages/shared/share-4.png` },
  { year: 2014, id: 5, title: "Search Engine", imageSrc: `${baseMediaUrl}/images/pages/shared/share-3.png` },
  { year: 2016, id: 6, title: "Search Engine", imageSrc: `${baseMediaUrl}/images/pages/shared/share-4.png` },
  { year: 2018, id: 7, title: "Search Engine", imageSrc: `${baseMediaUrl}/images/pages/shared/share-14.png` },
  { year: 2020, id: 8, title: "Search Engine", imageSrc: `${baseMediaUrl}/images/pages/shared/share-1.png` },
  { year: 2021, id: 9, title: "Search Engine", imageSrc: `${baseMediaUrl}/images/pages/shared/share-3.png` },
  { year: 2022, id: 10, title: "Search Engine", imageSrc: `${baseMediaUrl}/images/pages/shared/share-2.png` },
  { year: 2024, id: 11, title: "Search Engine", imageSrc: `${baseMediaUrl}/images/pages/shared/share-4.png` },
];

export const aboutValueItems = [
  {
    id: 1,
    title: "Innovation at Our Core:",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-1.png`,
    description: "Relentless pursuit of breakthrough solutions, solving complex problems with creativity and technology."
  },
  {
    id: 2,
    title: "Resilience and Adaptability:",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-3.png`,
    description: "Rooted in resilience, we confidently navigate challenges in a rapidly evolving landscape."
  },
  {
    id: 3,
    title: "Leadership with Purpose:",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-2.png`,
    description: "Transparency, integrity, and collaboration define our leadership philosophy, fostering trust and mutual respect."
  },
  {
    id: 4,
    title: "A Commitment to Society:",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-4.png`,
    description: "Beyond business, we create technologies that enhance lives and promote sustainability."
  }
];

/***
 * 
 * CONTACT PAGE
 * 
***/

export const contactCarouselImages = [
  { 
    src: `${baseMediaUrl}/images/pages/contact/contact-1.png`,
    alt: "Image 1", 
    title: "Manage electronic publishing system", 
    description: "Established in 2006, led by Tai Nguyen, with investment from IDGVV and Softbank" 
  },
  { 
    src: `${baseMediaUrl}/images/pages/contact/contact-1.png`,
    alt: "Image 2", 
    title: "Manage electronic publishing system", 
    description: "Established in 2006, led by Tai Nguyen, with investment from IDGVV and Softbank" 
  },
  { 
    src: `${baseMediaUrl}/images/pages/contact/contact-1.png`,
    alt: "Image 3", 
    title: "Manage electronic publishing system", 
    description: "Established in 2006, led by Tai Nguyen, with investment from IDGVV and Softbank" 
  },
];

/***
 * 
 * CAREER PAGE
 * 
***/

export const careerData = [
  {
    id: 1,
    date: "23 Feb 2025",
    title: "Frontend Developer",
    tags: ["React", "TypeScript", "Full time job"],
    salaryRange: "15,000,000 - 25,000,000",
    address: "District 1, Ho Chi Minh City",
    background: "linear-gradient(237.73deg, #FFFFFF 0%, #67CAFF 100%)",
  },
  {
    id: 2,
    date: "22 Feb 2025",
    title: "UX/UI Designer",
    tags: ["Figma", "Adobe XD", "Part time job"],
    salaryRange: "12,000,000 - 20,000,000",
    address: "District 2, Ho Chi Minh City",
    background: "linear-gradient(237.73deg, #FFFFFF 0%, #67CAFF 100%)",
  },
  {
    id: 3,
    date: "21 Feb 2025",
    title: "Backend Developer",
    tags: ["Node.js", "Express", "Full time job"],
    salaryRange: "18,000,000 - 28,000,000",
    address: "District 3, Ho Chi Minh City",
    background: "linear-gradient(237.73deg, #FFFFFF 0%, #67CAFF 100%)",
  },
  {
    id: 4,
    date: "20 Feb 2025",
    title: "Full Stack Developer",
    tags: ["React", "Node.js", "Project Works"],
    salaryRange: "20,000,000 - 30,000,000",
    address: "District 7, Ho Chi Minh City",
    background: "linear-gradient(237.73deg, #FFFFFF 0%, #67CAFF 100%)",
  },
  {
    id: 5,
    date: "19 Feb 2025",
    title: "Mobile Developer",
    tags: ["React Native", "Firebase", "Internship"],
    salaryRange: "15,000,000 - 25,000,000",
    address: "Thu Duc City, Ho Chi Minh City",
    background: "linear-gradient(237.73deg, #FFFFFF 0%, #67CAFF 100%)",
  },
  {
    id: 6,
    date: "18 Feb 2025",
    title: "DevOps Engineer",
    tags: ["Docker", "Kubernetes", "Full time job"],
    salaryRange: "25,000,000 - 35,000,000",
    address: "District 4, Ho Chi Minh City",
    background: "linear-gradient(237.73deg, #FFFFFF 0%, #67CAFF 100%)",
  },
];

/***
 * 
 * TECHNOLOGY PAGE
 * 
***/
export const technologyHeading = {
  title: "Technology of Interest"
};

export const technologyHighLightHeading = {
  title: "Cutting-Edge Technologies:",
  description: "Naiscorp's Behavioral & Activities Tracking solutions are designed to provide unparalleled safety, care, and peace of mind. Contact us to learn how we can help protect your family and optimize your indoor environments with our cutting-edge systems."
};

export const technologyChips = [
  { label: "Computer Vision:", description: "For robotics and environmental awareness." },
  { label: "Computing Technology:", description: "Digital, Analog, and Quantum Computing." },
  { label: "LLM & Conversational AI:", description: "Chatbots, assistants, and more." },
  { label: "Distributed Computing:", description: "Handling large-scale processes." },
  { label: "LLM & Conversational AI:", description: "Chatbots, assistants, and more." },
  { label: "Chips:", description: "Analog, FPGA, and AI Inference Chips" },
  { label: "", description: "Behavior & Activities Tracking" },
  { label: "Embedded AIs:", description: "Edge device integration." },
  { label: "Spatial Perception:", description: "Intelligent navigation." },
];

export const technologyInfo: InfoSectionProps['sections'] = [
  {
    items: [
      {
        imgSrc: '/images/pages/technology/technology-2.png',
        subtitle: 'Revolutionizing Safety and Care with Advanced Tracking Technologies',
        subtitleClassName: 'text-headline-large mb-6 !leading-tight',
        description: 'Behavioral and activities tracking at Naiscorp focuses on leveraging advanced computer vision, heat cameras, RGB-D cameras, and surveillance systems to create a comprehensive solution for security and family care. These technologies are designed to enhance safety, provide real-time alerts, and ensure better indoor monitoring for elders, children, and overall home security.',
        imageContainerClassName: 'h-full min-h-[263px] lg:min-h-[373px]',
        imageClassName: 'rounded-[40px] h-full lg:min-h-[373px] w-full md:max-w-[90%] md:left-[10%]',
        descriptionClassName: 'text-body-large-black',
        className: 'justify-center items-center lg:gap-8',
        order: 'infoFirst',
        imagePriority: true,
      },
    ],
  },
];

const technologyListItems1 = [
  {
    title: 'Digital Computing:',
    content: 'Continues to be the backbone of modern technology, with ongoing improvements in processing power and energy efficiency.',
  },
  {
    title: 'Analog Computing:',
    content: 'Recent developments have led to the creation of analog chips capable of performing AI ofference tasks with significantly reduced energy consumption compared to digital counterparts.',
  },
];

const technologyListItems2 = [
  {
    title: 'Analog Chips:',
    content: 'Advancements in analog chip design have enabled faster and more energy-efficient AI computations.',
  },
  {
    title: 'Field-Programmable Gate Arrays (FPGAs):',
    content: 'FPGAs offer flexibility in hardware programming, allowing for customized processing architectures that can be optimized for specific tasks, including AI workloads.',
  },
  {
    title: 'AI ofference Chips:',
    content: 'The industry is witnessing a shift toward specialized AI ofference chips designed to efficiently run AI models in production environments.',
  },
];

export const technologyNews: InfoCardProps[] = [
  {
    id: "1",
    imgSrc: `${baseMediaUrl}/images/pages/technology/technology-1.png`,
    title: "Computing Technology: Digital, Analog and Quantum",
    listItems: technologyListItems1,
    order: "imageFirst",
    imagePriority: true,
  },
  {
    id: "2",
    imgSrc: `${baseMediaUrl}/images/pages/technology/technology-2.png`,
    title: "Chips: Analog, FPGA, and AI ofference Chips",
    listItems: technologyListItems2,
    order: "infoFirst",
  },
  {
    id: "3",
    imgSrc: `${baseMediaUrl}/images/pages/technology/technology-3.png`,
    title: "Computer Vision: For Robotics and Environmental Awareness",
    description:
      "Computer vision technology has advanced to enable robots to interpret and interact with their environments more effectively...",
    order: "imageFirst",
  },
  {
    id: "4",
    imgSrc: `${baseMediaUrl}/images/pages/technology/technology-4.png`,
    title:
      "Large Language Models (LLMs) & Conversational AI: Chatbots, Assistants, and More",
    description:
      "The evolution of LLMs has led to more sophisticated conversational AI systems...",
    order: "infoFirst",
  },
  {
    id: "5",
    imgSrc: `${baseMediaUrl}/images/pages/technology/technology-5.png`,
    title: "Spatial Perception: Intelligent Navigation",
    description:
      "Advancements in spatial perception technologies have improved the ability of autonomous systems...",
    order: "imageFirst",
  },
  {
    id: "6",
    imgSrc: `${baseMediaUrl}/images/pages/technology/technology-6.png`,
    title: "Embedded AIs: Edge Device Integration",
    description:
      "Embedded AI involves integrating artificial intelligence capabilities directly into edge devices...",
    order: "infoFirst",
  },
  {
    id: "7",
    imgSrc: `${baseMediaUrl}/images/pages/technology/technology-7.png`,
    title: "Industry-Specific AI: Custom AI for Sectors Like Insurance and F&B",
    description:
      "Tailored AI solutions are being developed to address specific challenges in various industries...",
    order: "imageFirst",
  },
  {
    id: "8",
    imgSrc: `${baseMediaUrl}/images/pages/technology/technology-8.png`,
    title: "Distributed Computing: Handling Large-Scale Processes",
    description:
      "Distributed computing has become essential for managing large-scale computational tasks...",
    order: "infoFirst",
  },
];

export const technologyKeyHeading = {
  title: "Key Capacities:"
};

export const technologyKeyItems = [
  {
    title: "In-Door Family Tracking:",
    description:
      "Monitor the movements and activities of family members, especially elders and children, to ensure their safety. AI-powered tracking systems can detect unusual patterns and provide immediate notifications.",
    src: `${baseMediaUrl}/images/pages/shared/share-4.png`,
  },
  {
    title: "Security Systems:",
    description:
      "Utilize a combination of heat and RGB-D cameras to monitor surroundings, identify unauthorized access, and detect potential threats. These systems offer proactive alerts, enabling real-time intervention in case of emergencies.",
    src: `${baseMediaUrl}/images/pages/shared/share-3.png`,
  },
  {
    title: "Elder Care Monitoring:",
    description:
      "Track movements and detect falls or inactivity for elderly family members, providing instant alerts to caregivers or family members.",
    src: `${baseMediaUrl}/images/pages/shared/share-21.png`,
  },
  {
    title: "Child Safety:",
    description:
      "Monitor children's activities to ensure they remain in safe zones within the house and provide alerts if they wander into potentially dangerous areas.",
    src: `${baseMediaUrl}/images/pages/shared/share-23.png`,
  },
  {
    title: "Smart Alerts & Automation:",
    description:
      "Integrated with AI, these systems can trigger automated responses, such as locking doors, activating alarms, or notifying relevant parties based on detected events.",
    src: `${baseMediaUrl}/images/pages/shared/share-2.png`,
  },
];

export const technologyHighlightItems = [
  {
    title: 'Computer Vision Algorithms:',
    description: 'Advanced AI to recognize behaviors, identify patterns, and detect anomalies.',
  },
  {
    title: 'Heat Cameras:',
    description: 'Accurate detection of human presence, even in low-light or obscured environments.',
  },
  {
    title: 'RGB-D Cameras:',
    description: 'Depth-sensing technology to create detailed 3D maps of spaces for better tracking and object recognition.',
  },
  {
    title: 'Surveillance Integration:',
    description: 'Seamless integration with existing security systems for enhanced coverage.',
  },
];

export const technologyOffersHeading = {
  title: "Why It Matters?"
};

export const technologyOfferItems = [
  {
    title: "Enhanced Home Security:",
    description:
      "Ensure 24/7 monitoring of your living spaces, deterring intrusions and providing peace of mind.",
    src: `${baseMediaUrl}/images/pages/shared/share-7.png`,
  },
  {
    title: "Improved Caregiving:",
    description:
      "Offer tailored solutions for elder care and child safety, ensuring their well-being and providing caregivers with actionable insights.",
    src: `${baseMediaUrl}/images/pages/shared/share-8.png`,
  },
  {
    title: "Real-Time Intervention:",
    description:
      "Proactively respond to emergencies with instant alerts and automated safety mechanisms.",
    src: `${baseMediaUrl}/images/pages/shared/share-6.png`,
  },
];

export const technologyDBNews: InfoCardProps[] = [
  {
    id: "1",
    imgSrc: `${baseMediaUrl}/images/pages/technology-1.png`,
    title: "Computing Technology: Digital, Analog and Quantum",
    listItems: [
      {
        title: "Digital Computing:",
        content:
          "Continues to be the backbone of modern technology, with ongoing improvements in processing power and energy efficiency.",
      },
      {
        title: "Analog Computing:",
        content:
          "Recent developments have led to the creation of analog chips capable of performing AI ofference tasks with significantly reduced energy consumption compared to digital counterparts.",
      },
    ],
    listTitleClassName:
      "text-contentDescription text-sm sm:text-sm md:text-md lg:text-lg font-light",
    order: "imageFirst",
    imagePriority: true,
  },
  {
    id: "2",
    imgSrc: `${baseMediaUrl}/images/pages/technology-2.png`,
    title: "Chips: Analog, FPGA, and AI ofference Chips",
    listItems: [
      {
        title: "Analog Chips:",
        content:
          "Advancements in analog chip design have enabled faster and more energy-efficient AI computations.",
      },
      {
        title: "Field-Programmable Gate Arrays (FPGAs):",
        content:
          "FPGAs offer flexibility in hardware programming, allowing for customized processing architectures that can be optimized for specific tasks, including AI workloads.",
      },
      {
        title: "AI ofference Chips:",
        content:
          "The industry is witnessing a shift toward specialized AI ofference chips designed to efficiently run AI models in production environments.",
      },
    ],
    order: "infoFirst",
  },
  {
    id: "3",
    imgSrc: `${baseMediaUrl}/images/pages/technology-2.png`,
    title: "Computer Vision: For Robotics and Environmental Awareness",
    description:
      "Computer vision technology has advanced to enable robots to interpret and interact with their environments more effectively. Recent developments include AI-driven robotic systems capable of complex tasks such as object recognition, navigation, and real-time decision-making, enhancing automation in various sectors.",
    order: "imageFirst",
  },
  {
    id: "4",
    imgSrc: `${baseMediaUrl}/images/pages/technology-2.png`,
    title:
      "Large Language Models (LLMs) & Conversational AI: Chatbots, Assistants, and More",
    description:
      "The evolution of LLMs has led to more sophisticated conversational AI systems capable of understanding and generating human-like text. Models like PaLM 2 have demonstrated advanced reasoning capabilities, enabling applications in chatbots, virtual assistants, and other natural language processing tasks.",
    order: "infoFirst",
  },
  {
    id: "5",
    imgSrc: `${baseMediaUrl}/images/pages/technology-2.png`,
    title: "Spatial Perception: Intelligent Navigation",
    description:
      "Advancements in spatial perception technologies have improved the ability of autonomous systems to navigate complex environments. This includes the development of AI algorithms that enable real-time mapping, obstacle detection, and path planning, which are crucial for applications in robotics and autonomous vehicles.",
    order: "imageFirst",
  },
  {
    id: "6",
    imgSrc: `${baseMediaUrl}/images/pages/technology-2.png`,
    title: "Embedded AIs: Edge Device Integration",
    description:
      "Embedded AI involves integrating artificial intelligence capabilities directly into edge devices, allowing for real-time data processing and decision-making without relying on cloud computing. This approach reduces latency, enhances privacy, and enables the deployment of AI in resource-constrained environments.",
    order: "infoFirst",
  },
  {
    id: "7",
    imgSrc: `${baseMediaUrl}/images/pages/technology-2.png`,
    title:
      "Industry-Specific AI: Custom AI for Sectors Like Insurance and F&B",
    description:
      "Tailored AI solutions are being developed to address specific challenges in various industries. In the insurance sector, AI is used for tasks such as real-time policy issuance and claims assessment. In the food and beverage industry, AI-driven automation systems optimize operations, enhance customer experiences, and improve efficiency.",
    order: "imageFirst",
  },
  {
    id: "8",
    imgSrc: `${baseMediaUrl}/images/pages/technology-2.png`,
    title: "Distributed Computing: Handling Large-Scale Processes",
    description:
      "Distributed computing has become essential for managing large-scale computational tasks across multiple systems. This approach enables efficient processing of big data, supports complex simulations, and facilitates the development of scalable applications, making it a cornerstone of modern computing infrastructure.",
    order: "infoFirst",
  },
];

/***
 * 
 * DIVISIONS PAGE
 * 
 ***/

export const divisionsHeading = {
  title: "Our Divisions:",
  description: "Explore our innovative solutions designed to solve critical challenges and create impactful opportunities across industries. From AI-driven tools to next-generation software systems, our solutions are built to inspire confidence and curiosity, encouraging you to connect with us to unlock potential."
};

export const divisionsList = [
  {
    id: 1,
    title: "Production House",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-1.png`,
    slug: "production_house",
  },
  {
    id: 2,
    title: "Robotics",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-3.png`,
    slug: "robotics",
  },
  {
    id: 3,
    title: "Ezin Insurtech",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-2.png`,
    slug: "insurtech",
  },
  {
    id: 4,
    title: "Emoi FnB",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-4.png`,
    slug: "fnb",
  },
  {
    id: 5,
    title: "Investment & Venture Builder",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-4.png`,
    slug: "investment_venture",
  },
];

//*** PRODUCTION HOUSE ***//
export const productionHeading = {
  title: "Production House",
  subtitle: "Innovating Ideas, Delivering Excellence",
  description: "Naiscorp Production House is where creativity meets technology to build strategic, high-impact applications for global partners and customers. Our team specializes in crafting solutions that are as visionary as they are functional, addressing unique challenges with precision and innovation."
};

export const productionInfo = [
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/production/production-3.png`,
    description: "Transform ideas into cutting-edge apps, tailored to your specific needs.",
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/production/production-4.png`,
    description: "Partner with businesses to co-create scalable, innovative solutions",
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/production/production-5.png`,
    description: "Serve as a trusted outsourcing partner, delivering exceptional quality on time.",
  },
];

export const productionOffer = [
  {
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-8.png`,
    description: "Expertise in GIS systems, large-scale data management, and digital transformation.",
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-9.png`,
    description: "Proven track record with projects like the Resource Map for Cable TV Industry, managing over 3 million km of infrastructure.",
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-10.png`,
    description: "Designed fault-tolerant, multilingual single-function apps used in over 35 languages worldwide.",
  },
];

//*** ROBOTICS ***//
export const roboticsHeading = {
  title: "Human Robotics",
  subtitle: "Engineering the Future of Intelligence and Automation.",
  description: "At Naiscorp Robotics, we push the boundaries of robotics to create intelligent systems that enrich daily life and revolutionize industries. Combining advanced Computer Vision, Spatial Perception, and AI technologies, we design robots that are smarter, faster, and more adaptable."
};

export const roboticsNews: InfoCardProps[] = [
  {
    title: "Assistant Robots",
    news: [
      {
        id: "1",
        imgSrc: `${baseMediaUrl}/images/pages/divisions/robotics/robotics-3.png`,
        title: "Children Companion",
        titleClassName: 'text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg',
        description:
          "A companion robot equipped with speech recognition, learning modules, and adaptive AI for personalized engagement.",
        descriptionClassName: 'text-contentDescription text-base sm:text-base md:text-sm lg:text-md',
        order: "imageFirst",
        imageClassName: 'rounded-tl-3xl rounded-bl-3xl',
        imagePriority: true,
      },
      {
        id: "2",
        imgSrc: `${baseMediaUrl}/images/pages/divisions/robotics/robotics-4.png`,
        title: "Private Assistant Robots for Executives",
        titleClassName: 'text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg',
        order: "infoFirst",
        description:
          "A companion robot equipped with speech recognition, learning modules, and adaptive AI for personalized engagement.",
        descriptionClassName: 'text-contentDescription text-base sm:text-base md:text-sm lg:text-md',
        imageClassName: 'rounded-tr-3xl rounded-br-3xl',
      },
    ],
  },
  {
    title: "Security Robots",
    news: [
      {
        id: "3",
        imgSrc: `${baseMediaUrl}/images/pages/divisions/robotics/robotics-5.png`,
        title: "Family Guardian Robot",
        titleClassName: 'text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg',
        description:
          "An advanced home assistant robot designed for security, personalized care, and household management. Equipped with a Family Recognition System to identify members, guests, and strangers, ensuring safety.",
        descriptionClassName: 'text-contentDescription text-base sm:text-base md:text-sm lg:text-md',
        order: "imageFirst",
        imageClassName: 'rounded-tl-3xl rounded-bl-3xl',
        imagePriority: true,
      },
      {
        id: "4",
        imgSrc: `${baseMediaUrl}/images/pages/divisions/robotics/robotics-6.png`,
        title: "High-End Security Robots (e-dogs)",
        titleClassName: 'text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg',
        order: "infoFirst",
        description:
          "Advanced security robots with AI and computer vision for 24/7 surveillance in high-security environments, capable of working in swarm mode.",
        descriptionClassName: 'text-contentDescription text-base sm:text-base md:text-sm lg:text-md',
        imageClassName: 'rounded-tr-3xl rounded-br-3xl',
      },
    ],
  },
  {
    title: "Service Robots",
    news: [
      {
        id: "5",
        imgSrc: `${baseMediaUrl}/images/pages/divisions/robotics/robotics-7.png`,
        title: "Robot Mannequin",
        titleClassName: 'text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg',
        description:
          "Replacing traditional mannequins in retail stores with humanoid robotic mannequins that move, pose, and interact with customers.",
        descriptionClassName: 'text-contentDescription text-base sm:text-base md:text-sm lg:text-md',
        order: "imageFirst",
        imagePriority: true,
        imageClassName: 'rounded-tl-3xl rounded-bl-3xl',
      },
      {
        id: "6",
        imgSrc: `${baseMediaUrl}/images/pages/divisions/robotics/robotics-8.png`,
        title: "Marketing Robots",
        titleClassName: 'text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg',
        order: "infoFirst",
        description:
          "Robots with large touch screens to advertise products and services in airports, malls, and public areas.",
        descriptionClassName: 'text-contentDescription text-base sm:text-base md:text-sm lg:text-md',
        imageClassName: 'rounded-tr-3xl rounded-br-3xl',
      },
      {
        id: "7",
        imgSrc: `${baseMediaUrl}/images/pages/divisions/robotics/robotics-9.png`,
        title: "Hospitality and Concierge Robots",
        titleClassName: 'text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg',
        description:
          "Designed for luxury hotels, resorts, and high-end real estate to manage front-desk operations and assist guests with personalized recommendations.",
        order: "imageFirst",
        imagePriority: true,
        imageClassName: 'rounded-tl-3xl rounded-bl-3xl',
      },
      {
        id: "8",
        imgSrc: `${baseMediaUrl}/images/pages/divisions/robotics/robotics-10.png`,
        title: "Front Desk Robots",
        titleClassName: 'text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg',
        order: "infoFirst",
        description:
          "Receptionist robots capable of greeting guests, managing inquiries, and facilitating efficient customer service.",
        descriptionClassName: 'text-contentDescription text-base sm:text-base md:text-sm lg:text-md',
        imageClassName: 'rounded-tr-3xl rounded-br-3xl',
      },
    ],
  },
];

export const roboticsOfferItems = [
  {
    description: "Expertise in integrating AI with robotics to create adaptive systems.",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-8.png`,
  },
  {
    description: "Collaboration with top-tier OEMs and research in humanoid robot development",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-9.png`,
  },
];


//*** INSURTECH ***//
export const insurtechHeading = {
  title: "Ezin Insurtech",
  subtitle: "Transforming Insurance Through Technology.",
  description: "Ezin Insurtech is redefining how insurance companies operate by providing innovative, real-time solutions that enhance efficiency, transparency, and scalability. From AI-powered claims assessments to instant policy issuance, we enable insurers to meet modern demands with agility and confidence."
};

export const insurtechInfo = [
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/insurtech/insurtech-3.png`,
    listItems: [
      {
        title: "Realtime Insurance Core System:",
        content: "Sub-second policy issuance for embedded insurance.",
      },
    ],
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/insurtech/insurtech-4.png`,
    listItems: [
      {
        title: "AI Car Damage Assessment System:",
        content: "Real-time damage evaluation powered by computer vision.",
      },
    ],
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/insurtech/insurtech-5.png`,
    listItems: [
      {
        title: "TPA & CDP Platforms:",
        content: "Advanced tools for professional compensation handling and customer data management.",
      },
    ],
  },
];

export const insurtechOfferItems = [
  {
    description: "Trusted by leading insurance companies for real-time, high-performance systems",
    src: `${baseMediaUrl}/images/pages/mission-1.png`,
  },
  {
    description: "Experience managing over 2 million damage images and large-scale AI model training.",
    src: `${baseMediaUrl}/images/pages/mission-2.png`,
  }
];

//*** FNB ***//
export const fnbHeading = {
  title: "Emoi FnB AI & Automation",
  subtitle: "Redefining Dining Through Technology.",
  description: "Ezin Insurtech is redefining how insurance companies operate by providing innovative, real-time solutions that enhance efficiency, transparency, and scalability. From AI-powered claims assessments to instant policy issuance, we enable insurers to meet modern demands with agility and confidence."
};

export const fnbInfo = [
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/fnb/fnb-3.png`,
    listItems: [
      {
        title: "AIROS – AI Restaurant Operating System:",
        content: "Comprehensive automation for lighting, cooking, reminders, and more.",
      },
    ],
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/fnb/fnb-4.png`,
    listItems: [
      {
        title: "Restaurant Operating System with AI:",
        content: "Automation solutions for F&B, including kitchen robots and intelligent environmental controls.",
      },
    ],
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/fnb/fnb-5.png`,
    listItems: [
      {
        title: "E-commerce for F&B:",
        content: "Platforms to issue vouchers and streamline customer interactions",
      },
    ],
  },
];

export const fnbOfferItems = [
  {
    description: "Proven expertise in creating end-to-end automation for F&B.",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-8.png`,
  },
  {
    description: "Collaboration with global leaders in robotics and AI to deliver transformative results.",
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-9.png`,
  }
];

//*** INVESTMENT ***//
export const investmentHeading = {
  title: "Investment & Venture Builder",
  subtitle: "Fueling Innovation. Empowering Visionaries.",
  description: "Naiscorp’s Investment & Venture Builder division is dedicated to nurturing the next generation of groundbreaking ideas. By investing in early-stage startups and supporting research, we empower innovators to create solutions with global impact."
};

export const investmentInfo = [
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/investment/investment-3.png`,
    description: "Research investments in areas like Computer Vision, Speech Processing, Multimodal LLM, and Spatial Perception",
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/investment/investment-4.png`,
    description: "Angel investments in Big Apps, B2B AI SaaS, and Big Data Companies.",
  },
  {
    imageSrc: `${baseMediaUrl}/images/pages/divisions/investment/investment-5.png`,
    description: "Collaboration with student groups to turn startup ideas into scalable ventures.",
  },
];

const investmentListItems = [
  { title: "Exporting Vietnamese Innovations" },
  { title: "Importing Global Technologies" },
  { title: "Cross-Border Education and Knowledge Transfer" },
  { title: "Innovation Trading" },
  { title: "Supply Chain and Logistics for High-Tech Products" },
];

export const investmentNews: InfoCardProps[] = [
  {
    title: "Investment Opportunities",
    news: [
      {
        id: "1",
        imgSrc: `${baseMediaUrl}/images/pages/divisions/investment/investment-6.png`,
        title: "VGC – Social Community Platform",
        description:
          "Connecting golf enthusiasts with clubs and tournaments. (có link tới trang VGCGolf)",
        order: "imageFirst",
        imagePriority: true,
        imageClassName: 'rounded-tl-3xl rounded-bl-3xl',
        button: 
          <Button 
            text="Learn More"
            variant="magic"
            className="text-white font-semibold text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-8 rounded-full bg-violet-500/80"
          />
      },
      {
        id: "2",
        imgSrc: `${baseMediaUrl}/images/pages/divisions/investment/investment-7.png`,
        title: "VDBC – Vietnam Digital Business Council",
        order: "infoFirst",
        listTitleClassName:'text-contentDescription text-sm sm:text-sm md:text-md lg:text-lg font-light',
        listItems: investmentListItems,
        imageClassName: 'rounded-tr-3xl rounded-br-3xl',
        button: 
          <Button 
            text="Learn More"
            variant="magic"
            className="text-white font-semibold text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-8 rounded-full bg-violet-500/80"
          />
      },
    ],
  },
];

/***
 * 
 * SOLUTIONS PAGE
 * 
***/

export const solutionsHeading = {
  title: "Our Solutions:",
  description: "Explore our innovative solutions designed to solve critical challenges and create impactful opportunities across industries. From AI-driven tools to next-generation software systems, our solutions are built to inspire confidence and curiosity, encouraging you to connect with us to unlock potential."
};

export const solutionsList = [
  {
    id: 1,
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-2.png`,
    title: "High-Performance Computing and Distributed Systems",
    slug: "cloud_computing",
  },
  {
    id: 2,
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-20.png`,
    title: "Big Data Storage and Processing",
    slug: "big_data",
  },
  {
    id: 3,
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-21.png`,
    title: "AI-Powered Recognition and Automation",
    slug: "automation",
  },
  {
    id: 4,
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-4.png`,
    title: "Digital Maps and Resource Management",
    slug: "digital_maps",
  },
  {
    id: 5,
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-3.png`,
    title: "Golf Technology Solutions",
    slug: "golf_technology",
  },
  {
    id: 6,
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-21.png`,
    title: "App Development for Global Markets",
    slug: "app_development",
  },
  {
    id: 7,
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-19.png`,
    title: "Robotics and Automation",
    slug: "robotics",
  },
  {
    id: 8,
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-1.png`,
    title: "Insurance Technology Solutions",
    slug: "insurtech",
  },
  {
    id: 9,
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-18.png`,
    title: "E-Commerce and Consumer Platforms",
    slug: "ecommerce",
  },
  {
    id: 10,
    imageSrc: `${baseMediaUrl}/images/pages/shared/share-22.png`,
    title: "AI On Demand: Customizable AI-driven solutions",
    slug: "ai_ondemand",
  }
];

const solutionsCloudComputing = {
  "pageId": "solutions",
  "slug": "cloud_computing",
  "sections": [
    {
      "sectionId": "heading",
      "content": {
        "title": "High-Performance Computing and Distributed Systems",
        "description": "Our expertise in distributed computing powers advanced systems like high-performance search engines, capable of processing vast datasets at unmatched speeds."
      }
    },
    {
      "sectionId": "body",
      "content": {
        "title": "",
        "description": "",
        "items": [
          {
            "news": [
              {
                "id": "1",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-1.png`,
                "title": "What We Solve:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "description": "Efficiently handle data-intensive tasks with scalable systems, ensuring seamless operations even in the most demanding scenarios.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "order": "imageFirst",
                "imageClassName": "rounded-tl-3xl rounded-bl-3xl",
                "imagePriority": true
              },
              {
                "id": "2",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-2.png`,
                "title": "Why It Matters:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "order": "infoFirst",
                "description": "Transform complex processes into streamlined solutions, driving efficiency and innovation in your organization.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "imageClassName": "rounded-tr-3xl rounded-br-3xl"
              }
            ]
          }
        ]
      }
    }
  ]
};

const solutionsBigData = {
  "pageId": "solutions",
  "slug": "big_data",
  "sections": [
    {
      "sectionId": "heading",
      "content": {
        "title": "Big Data Storage and Processing",
        "description": "Advanced platforms for storing and processing massive datasets in text, image, and video formats."
      }
    },
    {
      "sectionId": "body",
      "content": {
        "title": "",
        "description": "",
        "items": [
          {
            "news": [
              {
                "id": "1",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-1.png`,
                "title": "What We Solve:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "description": "Leverage robust data lakes and warehouses to turn raw data into actionable insights for better decision-making.x",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "order": "imageFirst",
                "imageClassName": "rounded-tl-3xl rounded-bl-3xl",
                "imagePriority": true
              },
              {
                "id": "2",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-2.png`,
                "title": "Why It Matters:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "order": "infoFirst",
                "description": "Empower businesses to unlock the potential of their data assets, boosting operational performance.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "imageClassName": "rounded-tr-3xl rounded-br-3xl"
              }
            ]
          }
        ]
      }
    }
  ]
};

const solutionsAutomation = {
  "pageId": "solutions",
  "slug": "automation",
  "sections": [
    {
      "sectionId": "heading",
      "content": {
        "title": "AI-Powered Recognition and Automation"
      }
    },
    {
      "sectionId": "body",
      "content": {
        "title": "",
        "description": "",
        "items": [
          {
            "news": [
              {
                "id": "1",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-1.png`,
                "title": "OCR and Content Classification:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "description": "Automate document recognition and organize content with precision, reducing manual efforts and accelerating workflows.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "order": "imageFirst",
                "imageClassName": "rounded-tl-3xl rounded-bl-3xl",
                "imagePriority": true
              },
              {
                "id": "2",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-2.png`,
                "title": "Virtual Assistant System:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "order": "infoFirst",
                "description": "Deploy intelligent corporate AI chatbots and document OCR solutions to enhance responsiveness and streamline operations.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "imageClassName": "rounded-tr-3xl rounded-br-3xl"
              }
            ]
          }
        ]
      }
    }
  ]
};

const solutionsDigitalMaps = {
  "pageId": "solutions",
  "slug": "digital_maps",
  "sections": [
    {
      "sectionId": "heading",
      "content": {
        "title": "Digital Maps and Resource Management"
      }
    },
    {
      "sectionId": "body",
      "content": {
        "title": "",
        "description": "",
        "items": [
          {
            "news": [
              {
                "id": "1",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-1.png`,
                "title": "Resource Mapping for the Cable TV Industry:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "description": "Developed a digital map system managing 3 million km of cables nationwide, leveraging GIS technology.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "order": "imageFirst",
                "imageClassName": "rounded-tl-3xl rounded-bl-3xl",
                "imagePriority": true
              },
              {
                "id": "2",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-2.png`,
                "title": "Applications:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "order": "infoFirst",
                "description": "Our experience in vector mapping and managing large datasets can transform industries like logistics, urban planning, and robotics.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "imageClassName": "rounded-tr-3xl rounded-br-3xl"
              }
            ]
          }
        ]
      }
    }
  ]
};

const solutionsGolfTechnology = {
  "pageId": "solutions",
  "slug": "golf_technology",
  "sections": [
    {
      "sectionId": "heading",
      "content": {
        "title": "Golf Technology Solutions"
      }
    },
    {
      "sectionId": "body",
      "content": {
        "title": "",
        "description": "",
        "items": [
          {
            "news": [
              {
                "id": "1",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-1.png`,
                "title": "Golf Social Network & Handicap System:",
                "description": "A dedicated platform to connect golf enthusiasts, organize clubs, and facilitate scoring.",
                "listItems": [
                  {
                    "title": "Technologies Used:",
                    "content": "iOS/Android Apps, Social Network, CMS."
                  },
                  {
                    "title": "Status:",
                    "content": "Successfully deployed and transferred to partners."
                  }
                ],
                "order": "imageFirst",
                "imageClassName": "rounded-tl-3xl rounded-bl-3xl",
                "imagePriority": true
              },
              {
                "id": "2",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-2.png`,
                "title": "Why It Matters:",
                "description": "We redefine sports technology with seamless integration and enhanced user engagement.",
                "order": "infoFirst",
                "imageClassName": "rounded-tr-3xl rounded-br-3xl"
              }
            ]
          }
        ]
      }
    }
  ]
};

const solutionsAppDevelopment = {
  "pageId": "solutions",
  "slug": "app_development",
  "sections": [
    {
      "sectionId": "heading",
      "content": {
        "title": "App Development for Global Markets"
      }
    },
    {
      "sectionId": "body",
      "content": {
        "title": "",
        "description": "",
        "items": [
          {
            "news": [
              {
                "id": "1",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-1.png`,
                "title": "Single Function Apps:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "description": "Designed and deployed high-performance, single-function apps in 35 languages with low crash rates and exceptional user experience.",
                "listItems": [
                  {
                    "title": "Technologies Used:",
                    "content": "Java, Kotlin, Stable Diffusion AI."
                  },
                  {
                    "title": "Status:",
                    "content": "Successfully operating globally."
                  }
                ],
                "listTitleClassName": "text-contentDescription text-sm sm:text-sm md:text-md lg:text-lg font-light",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "order": "imageFirst",
                "imageClassName": "rounded-tl-3xl rounded-bl-3xl",
                "imagePriority": true
              },
              {
                "id": "2",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-2.png`,
                "title": "Applications:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "order": "infoFirst",
                "description": "Build multilingual, fault-tolerant apps tailored for diverse audiences.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "imageClassName": "rounded-tr-3xl rounded-br-3xl"
              }
            ]
          }
        ]
      }
    }
  ]
};

const solutionsRobotics = {
  "pageId": "solutions",
  "slug": "robotics",
  "sections": [
    {
      "sectionId": "heading",
      "content": {
        "title": "Robotics and Automation"
      }
    },
    {
      "sectionId": "body",
      "content": {
        "title": "",
        "description": "",
        "items": [
          {
            "news": [
              {
                "id": "1",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-1.png`,
                "title": "Robot Friend and Tutor for Children:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "description": "An intelligent companion for children using AI-driven systems like TTS, STT, and ROS: Applications: Enhances child learning and interaction with cutting-edge AI.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "order": "imageFirst",
                "imageClassName": "rounded-tl-3xl rounded-bl-3xl",
                "imagePriority": true
              },
              {
                "id": "2",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-2.png`,
                "title": "Restaurant Operating System with AI:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "order": "infoFirst",
                "description": "Automate restaurant operations with intelligent systems that manage lighting, fans, cooking robots, and more:",
                "listItems": [
                  {
                    "title": "Technologies Used:",
                    "content": "Edge Computing, Machine Learning."
                  },
                  {
                    "title": "Why It Matters:",
                    "content": "Revolutionize the F&B industry with smarter, more efficient automation."
                  }
                ],
                "listTitleClassName": "text-contentDescription text-sm sm:text-sm md:text-md lg:text-lg font-light",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "imageClassName": "rounded-tr-3xl rounded-br-3xl"
              }
            ]
          }
        ]
      }
    }
  ]
};

const solutionsInsurtech = {
  "pageId": "solutions",
  "slug": "insurtech",
  "sections": [
    {
      "sectionId": "heading",
      "content": {
        "title": "Insurance Technology Solutions"
      }
    },
    {
      "sectionId": "body",
      "content": {
        "title": "",
        "description": "",
        "items": [
          {
            "news": [
              {
                "id": "1",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-1.png`,
                "title": "AI Car Damage Assessment:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "description": "Assess vehicle damage with real-time AI computer vision models, trained on over 2 million images:",
                "listItems": [
                  {
                    "title": "Applications:",
                    "content": "Enhances precision and speed in insurance claim processing."
                  }
                ],
                "listTitleClassName": "text-contentDescription text-sm sm:text-sm md:text-md lg:text-lg font-light",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "order": "imageFirst",
                "imageClassName": "rounded-tl-3xl rounded-bl-3xl",
                "imagePriority": true
              },
              {
                "id": "2",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-2.png`,
                "title": "Online Insurance Core System:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "order": "infoFirst",
                "description": "Our experience in vector mapping and managing large datasets can transform industries like logistics, urban planning, and robotics.",
                "listItems": [
                  {
                    "title": "Technologies Used:",
                    "content": "Serverless Computing, API Gatewa"
                  }
                ],
                "listTitleClassName": "text-contentDescription text-sm sm:text-sm md:text-md lg:text-lg font-light",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "imageClassName": "rounded-tr-3xl rounded-br-3xl"
              }
            ]
          }
        ]
      }
    }
  ]
};

const solutionsBusinessIntelligence = {
  "pageId": "solutions",
  "slug": "business_intelligence",
  "sections": [
    {
      "sectionId": "heading",
      "content": {
        "title": "Business Intelligence and Enterprise Solutions"
      }
    },
    {
      "sectionId": "body",
      "content": {
        "title": "",
        "description": "",
        "items": [
          {
            "news": [
              {
                "id": "1",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-1.png`,
                "title": "Performance Tracking System:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "description": "An enterprise-grade BI system for consumer lending, processing data for over 20 million customers.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "listItems": [
                  {
                    "title": "Technologies Used:",
                    "content": "PowerBI, Data Lake, ETL."
                  },
                  {
                    "title": "Applications:",
                    "content": "Global management systems for robotics and businesses."
                  }
                ],
                "listTitleClassName": "text-contentDescription text-sm sm:text-sm md:text-md lg:text-lg font-light",
                "order": "imageFirst",
                "imageClassName": "rounded-tl-3xl rounded-bl-3xl",
                "imagePriority": true
              },
              {
                "id": "2",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-2.png`,
                "title": "Virtual Manager:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "order": "infoFirst",
                "description": "An intelligent assistant for managers, providing quick access to data and enabling faster decisions.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "imageClassName": "rounded-tr-3xl rounded-br-3xl"
              }
            ]
          }
        ]
      }
    }
  ]
};

const solutionsEcommerce = {
  "pageId": "solutions",
  "slug": "ecommerce",
  "sections": [
    {
      "sectionId": "heading",
      "content": {
        "title": "E-Commerce and Consumer Platforms"
      }
    },
    {
      "sectionId": "body",
      "content": {
        "title": "",
        "description": "",
        "items": [
          {
            "news": [
              {
                "id": "1",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-1.png`,
                "title": "Emoi E-Commerce Platform:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "description": "A powerful marketplace for F&B vouchers with seamless integration for restaurants and cafes.",
                "listItems": [
                  {
                    "title": "Applications:",
                    "content": "Enhance customer engagement and streamline operations."
                  }
                ],
                "listTitleClassName": "text-contentDescription text-sm sm:text-sm md:text-md lg:text-lg font-light",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "order": "imageFirst",
                "imageClassName": "rounded-tl-3xl rounded-bl-3xl",
                "imagePriority": true
              },
              {
                "id": "2",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-2.png`,
                "title": "Restaurant Management System (RMS):",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "order": "infoFirst",
                "description": "Automate restaurant management with QR menus, POS, and employee apps for an optimized customer journey.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "imageClassName": "rounded-tr-3xl rounded-br-3xl"
              }
            ]
          }
        ]
      }
    }
  ]
};

const solutionsAIOnDemand = {
  "pageId": "solutions",
  "slug": "ai_ondemand",
  "sections": [
    {
      "sectionId": "heading",
      "content": {
        "title": "AI On Demand"
      }
    },
    {
      "sectionId": "body",
      "content": {
        "title": "",
        "description": "",
        "items": [
          {
            "news": [
              {
                "id": "1",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-1.png`,
                "title": "Overview:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "description": "Customized AI-driven solutions for diverse industries, delivered efficiently to meet specific needs.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "order": "imageFirst",
                "imageClassName": "rounded-tl-3xl rounded-bl-3xl",
                "imagePriority": true
              },
              {
                "id": "2",
                "imgSrc": `${baseMediaUrl}/images/pages/technology-2.png`,
                "title": "Why It Matters:",
                "titleClassName": "text-contentTitle text-sm sm:text-sm md:text-md lg:text-lg",
                "order": "infoFirst",
                "description": "Provides flexibility and adaptability for businesses looking to integrate AI seamlessly into their operations.",
                "descriptionClassName": "text-contentDescription text-base sm:text-base md:text-sm lg:text-md",
                "imageClassName": "rounded-tr-3xl rounded-br-3xl"
              }
            ]
          }
        ]
      }
    }
  ]
};

export const SolutionPages = {
  "cloud_computing": solutionsCloudComputing,
  "big_data": solutionsBigData,
  "golf_technology": solutionsGolfTechnology,
  "app_development": solutionsAppDevelopment,
  "digital_maps": solutionsDigitalMaps,
  "robotics": solutionsRobotics,
  "insurtech": solutionsInsurtech,
  "business_intelligence": solutionsBusinessIntelligence,
  "ecommerce": solutionsEcommerce,
  "ai_ondemand": solutionsAIOnDemand,
  "automation": solutionsAutomation,
};

export const careerLocaleMap = {
  details: {
    en: "Details",
    vi: "Chi tiết",
    zh: "详情"
  },
  filters: {
    en: "Filters",
    vi: "Bộ lọc",
    zh: "筛选"
  },
  clearAllFilters: {
    en: "Clear all filters",
    vi: "Xóa tất cả bộ lọc",
    zh: "清除所有筛选"
  },
  recommendedJobs: {
    en: "Recommended jobs",
    vi: "Việc làm đề xuất",
    zh: "推荐工作"
  },
  relatedJobs: {
    en: "Related jobs",
    vi: "Công việc liên quan",
    zh: "相关工作"
  },
  submitForm: {
    en: "Submit form",
    vi: "Gửi biểu mẫu",
    zh: "提交表单"
  },
  submit: {
    en: "Submit",
    vi: "Ứng tuyển",
    zh: "順暢"
  },
  jobSummary: {
    en: "Job Summary",
    vi: "Tóm tắt công việc",
    zh: "工作摘要"
  },
  keyResponsibilities: {
    en: "Key Responsibilities",
    vi: "Trách nhiệm chính",
    zh: "主要职责"
  },
  qualifications: {
    en: "Qualifications",
    vi: "Yêu cầu trình độ",
    zh: "资格要求"
  },
};

export const newsLocaleMap = {
  weeklyHighlights: {
    en: "Weekly highlights",
    vi: "Tin nổi bật trong tuần",
    zh: "每周亮点"
  },
  highLights: {
    en: "Highlights",
    vi: "Tin nổi bật",
    zh: "亮点"
  },
  relatedTopic: {
    en: "Related topic",
    vi: "Chủ đề liên quan",
    zh: "相关主题"
  }
};

/***
 * 
 * NAVBAR 
 * FOOTER
 * 
***/

export const navbarLinks = [
  { id:'home', page: "Home", link: "/en" },
  { id: 'about', page: "About", link: "/en/about" },
  { id: 'devisions', page: "Divisions", link: "/en/divisions" },
  { id:'solutions', page: "Our Solutions", link: "/en/solutions" },
  { id: 'technology', page: "Technology", link: "/en/technology" },
  { id: 'career', page: "Careers", link: "/en/careers" },
  { id: 'contact', page: "Contact", link: "/en/contact" },
];

export const navbarLinksZH = [
  { id:'home', page: "首页", link: "/zh" },
  { id: 'about', page: "关于我们", link: "/zh/guan_yu_wo_men" },
  { id: 'devisions', page: "业务部门", link: "/zh/ye_wu_bu_men" },
  { id:'solutions', page: "我们的解决方案", link: "/zh/wo_men_de_jie_jue_fang_an" },
  { id: 'technology', page: "技术", link: "/zh/ji_shu" },
  { id: 'career', page: "职业发展", link: "/zh/zhi_ye_fa_zhan" },
  { id: 'contact', page: "联系我们", link: "/zh/lian_xi_wo_men" },
];

export const navbarLinksVI = [
  { id:'home', page: "Trang chủ", link: "/vi" },
  { id: 'about', page: "Giới thiệu", link: "/vi/ve_chung_toi" },
  { id: 'devisions', page: "Các bộ phận", link: "/vi/cac_bo_phan" },
  { id:'solutions', page: "Giải pháp", link: "/vi/giai_phap" },
  { id: 'technology', page: "Công nghệ", link: "/vi/cong_nghe" },
  { id: 'career', page: "Tuyển dụng", link: "/vi/tuyen_dung" },
  { id: 'contact', page: "Liên hệ", link: "/vi/lien_he" },
];

export const aboutColumn = {
  title: 'About',
  links: [
    { text: 'About Naiscorp', href: '/about' },
    { text: 'News', href: '/news' },
    { text: 'Careers', href: '/careers' },
    { text: 'Contact', href: '/contact' },
  ],
};

export const aboutColumnZH = {
  title: '关于',
  links: [
    { text: '关于 Naiscorp', href: '/zh/guanyu' },
    { text: '新闻', href: '/zh/xinwen' },
    { text: '职业发展', href: '/zh/zhiye' },
    { text: '联系我们', href: '/zh/lianxi' },
  ],
};

export const aboutColumnVI = {
  title: 'Giới thiệu',
  links: [
    { text: 'Về Naiscorp', href: '/vi/ve_chung_toi' },
    { text: 'Tin tức', href: '/vi/tin_tuc' },
    { text: 'Tuyển dụng', href: '/vi/nghe_nghiep' },
    { text: 'Liên hệ', href: '/vi/lien_he' },
  ],
};

export const solutionsColumn = {
  title: 'Our Solutions',
  links: [
    { text: 'High performance insurance system', href: '/solutions/insurtech' },
    { text: 'AI on Edge', href: '/solutions/ai_ondemand' },
    { text: 'Private AI assistant', href: '/solutions/ai_ondemand' },
    { text: 'Car damage inspection', href: '/solutions/insurtech' },
    { text: 'See all', href: '/solutions' },
  ],
};

export const solutionsColumnZH = {
  title: '我们的解决方案',
  links: [
    { text: '高性能保险系统', href: '/zh/jiejuefangan/baoxian' },
    { text: '边缘 AI', href: '/zh/jiejuefangan/ai_bianyuan' },
    { text: '私人 AI 助手', href: '/zh/jiejuefangan/si_ren_ai' },
    { text: '汽车损坏检测', href: '/zh/jiejuefangan/qichejiance' },
    { text: '查看全部', href: '/zh/jiejuefangan' },
  ],
};

export const solutionsColumnVI = {
  title: 'Giải pháp',
  links: [
    { text: 'Hệ thống bảo hiểm hiệu suất cao', href: '/vi/giai_phap/bao_hiem' },
    { text: 'AI trên Edge', href: '/vi/giai_phap/ai_tren_edge' },
    { text: 'Trợ lý AI cá nhân', href: '/vi/giai_phap/tro_ly_ai' },
    { text: 'Kiểm tra hư hỏng xe', href: '/vi/giai_phap/kiem_tra_xe' },
    { text: 'Xem tất cả', href: '/vi/giai_phap' },
  ],
};

export const divisionsColumn = {
  title: 'Our Divisions',
  links: [
    { text: 'Production house', href: '/divisions/production_house' },
    { text: 'Robotics and smart hardware', href: '/divisions/robotics' },
    { text: 'Investment & Incubation', href: '/divisions/investment_venture' },
    { text: 'Innovative apps', href: '/divisions/fnb' },
    { text: 'Insurtech', href: '/divisions/insurtech' },
    { text: 'See all', href: '/divisions' },
  ],
};

export const divisionsColumnZH = {
  title: '我们的业务部门',
  links: [
    { text: '制作工作室', href: '/zh/bumen/zhizuo' },
    { text: '机器人和智能硬件', href: '/zh/bumen/jiqiren' },
    { text: '投资与孵化', href: '/zh/bumen/touzi' },
    { text: '创新应用', href: '/zh/bumen/chuangxin' },
    { text: '保险科技', href: '/zh/bumen/baoxian' },
    { text: '查看全部', href: '/zh/bumen' },
  ],
};

export const divisionsColumnVI = {
  title: 'Các bộ phận',
  links: [
    { text: 'Phát triển và sản xuất', href: '/vi/bo_phan/phat_trien' },
    { text: 'Robot và phần cứng thông minh', href: '/vi/bo_phan/robot' },
    { text: 'Đầu tư & ươm tạo', href: '/vi/bo_phan/dau_tu' },
    { text: 'Ứng dụng sáng tạo', href: '/vi/bo_phan/ung_dung' },
    { text: 'Công nghệ bảo hiểm', href: '/vi/bo_phan/bao_hiem' },
    { text: 'Xem tất cả', href: '/vi/bo_phan' },
  ],
};

export const contactColumn = {
  subtitle: `Naiscorp is a leading technology service company providing digital transformation solutions, developing AI, Big Data, Robotics, and Big Apps; providing customers with high quality products, services, and solutions to help transform the world.
  Established in 2006, led by Tai Nguyen, invested by IDGVV and Softbank.`,
  items: [     
    {   
      name: 'address',
      icon: '/svgs/local.svg',
      text: '86 Ton That Thuyet, ward 16, district 4, TP HCM',
    },
    {
      name: 'phone',
      icon: '/svgs/phone.svg',
      text: '+84.988136833',
    },
    {
      name: 'email',
      icon: '/svgs/mail.svg',
      text: 'tai.nguyen@naiscorp.com',
    },
  ],
};

export const contactColumnZH = {
  subtitle: `Naiscorp 是领先的技术服务公司，提供数字化转型解决方案，开发 AI、大数据、机器人和大型应用；为客户提供高质量的产品、服务和解决方案，以帮助改变世界。
  成立于 2006 年，由 Tai Nguyen 领导，获得 IDGVV 和 Softbank 投资。`,
  items: [     
    {   
      name: '地址',
      icon: '/svgs/local.svg',
      text: '86 Ton That Thuyet, 第16区, 第4郡, 胡志明市',
    },
    {
      name: '电话',
      icon: '/svgs/phone.svg',
      text: '+84.988136833',
    },
    {
      name: '电子邮件',
      icon: '/svgs/mail.svg',
      text: 'tai.nguyen@naiscorp.com',
    },
  ],
};

export const contactColumnVI = {
  subtitle: `Naiscorp là công ty dịch vụ công nghệ hàng đầu cung cấp các giải pháp chuyển đổi số, phát triển AI, Dữ liệu lớn, Robot và Ứng dụng quy mô lớn; mang đến cho khách hàng những sản phẩm, dịch vụ và giải pháp chất lượng cao để giúp thay đổi thế giới.
  Thành lập năm 2006, do Tai Nguyen lãnh đạo, được đầu tư bởi IDGVV và Softbank.`,
  items: [     
    {   
      name: 'Địa chỉ',
      icon: '/svgs/local.svg',
      text: '86 Tôn Thất Thuyết, phường 16, quận 4, TP HCM',
    },
    {
      name: 'Điện thoại',
      icon: '/svgs/phone.svg',
      text: '+84.988136833',
    },
    {
      name: 'Email',
      icon: '/svgs/mail.svg',
      text: 'tai.nguyen@naiscorp.com',
    },
  ],
};

export const languageMap = {
  en: {
    navbarLinks,
    aboutColumn,
    solutionsColumn,
    divisionsColumn,
    contactColumn,
  },
  zh: {
    navbarLinks: navbarLinksZH,
    aboutColumn: aboutColumnZH,
    solutionsColumn: solutionsColumnZH,
    divisionsColumn: divisionsColumnZH,
    contactColumn: contactColumnZH,
  },
  vi: {
    navbarLinks: navbarLinksVI,
    aboutColumn: aboutColumnVI,
    solutionsColumn: solutionsColumnVI,
    divisionsColumn: divisionsColumnVI,
    contactColumn: contactColumnVI,
  },
};

export const socialLinks: SocialLink[] = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@Naiscorpcomputefuture',
    icon: '/svgs/Youtube.svg'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/naiscorp',
    icon: '/svgs/LinkedIn.svg'
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: '/svgs/Facebook.svg',
  },
];

/***
 *  
 * SHARE DATA
 * 
***/
export const imageFallbackUrl = '/images/global/fallback.png';

export const logoPath = "/images/global/logo/telamonix.png";


export const heroText = {
  mainHeading: "Telamonix provides solutions for",
  rotatingText: ["INDIVIDUALS", "STARTUPS", "BUSINESSES", "ENTERPRISES"],
  typewriterTexts: [
    "Telamonix provides optimal solutions to your problems.",
    "We transform ideas into reality.",
    "Innovate, Create, Succeed with Telamonix."
  ],
  partnersHeading: "Partnered With",
  partnerLogos: [
    '/global/images/partner/google.png',
    '/global/images/partner/microsoft.png',
    '/global/images/partner/clerk.png',
  ],
  stats: [
    { label: "Projects", value: "50+" },
    { label: "Experience", value: "5+" },
    { label: "Rating", value: "5" }
  ],
  ctaButton: "Get In Touch"
};
