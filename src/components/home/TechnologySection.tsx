"use client"
import React, { useState, useEffect } from 'react';
import { Card, Chip, Avatar, Tooltip } from "@nextui-org/react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { IconContext } from "react-icons";
import { FaMobile, FaGlobe, FaChartBar, FaPlug, FaRobot, FaMicrochip, FaGamepad, FaCubes, FaQrcode, FaVrCardboard } from 'react-icons/fa';
import { TechnologySection } from "@/types/landing";

const TechnologySections: TechnologySection[] = [
  {
    category: 'Mobile App Development',
    icon: <FaMobile />,
    languages: [
      { name: 'Swift', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" alt="Swift" /> },
      { name: 'Objective-C', icon: <FaMobile /> },
      { name: 'Kotlin', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" alt="Kotlin" /> },
      { name: 'Java', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" /> },
      { name: 'JavaScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" /> },
      { name: 'TypeScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" /> },
      { name: 'Dart', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" alt="Dart" /> },
    ],
    frameworks: [
      { 
        name: 'Native iOS Development', 
        items: [
          { name: 'Swift', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" alt="Swift" /> },
          { name: 'Objective-C', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg" alt="Objective-C" /> }
        ] 
      },
      { 
        name: 'Native Android Development', 
        items: [
          { name: 'Kotlin', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" alt="Kotlin" /> },
          { name: 'Java', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" /> }
        ] 
      },
      { 
        name: 'React Native', 
        items: [{ 
          name: 'React', 
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" /> 
        }] 
      },
      { 
        name: 'Flutter', 
        items: [
          { name: 'Dart', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" alt="Dart" /> },
          { name: 'Flutter SDK', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter SDK" /> }
        ]
      },
      { 
        name: 'Ionic', 
        items: [
          { name: 'Angular', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular" /> },
          { name: 'HTML', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" /> },
          { name: 'CSS', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" /> },
        ] 
      }
    ],
    tools: [
      { name: 'Figma', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" /> },
      { name: 'Sketch', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg" alt="Sketch" /> },
      { name: 'TestFlight', icon: <FaMobile /> },
      { name: 'UserTesting', icon: <FaMobile /> },
      { name: 'App Store Optimization (ASO)', icon: <FaMobile /> },
      { name: 'Firebase App Distribution', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" /> },
    ],
  },
  {
    category: 'Web App Development',
    icon: <FaGlobe />,
    languages: [
      { name: 'JavaScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" /> },
      { name: 'TypeScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" /> },
      { name: 'HTML', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" /> },
      { name: 'CSS', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" /> },
      { name: 'Python', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /> },
      { name: 'Ruby', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" alt="Ruby" /> },
      { name: 'PHP', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" /> },
      { name: 'C#', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" /> },
      { name: 'Java', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" /> },
    ],
    frameworks: [
      { name: 'Frontend', items: [
        { name: 'React', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" /> },
        { name: 'Vue.js', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue.js" /> },
        { name: 'Angular', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular" /> },
        { name: 'Svelte', icon: <FaGlobe /> },
        { name: 'Next.js', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" /> },
        { name: 'Nuxt.js', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" alt="Nuxt.js" /> },
      ] },
      { name: 'Backend', items: [
        { name: 'Node.js', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" /> },
        { name: 'Express', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" /> },
        { name: 'Django', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg" alt="Django" /> },
        { name: 'Flask', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" /> },
        { name: 'Ruby on Rails', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg" alt="Ruby on Rails" /> },
        { name: 'Laravel', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" alt="Laravel" /> },
        { name: 'ASP.NET', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" alt="ASP.NET" /> },
        { name: 'Spring Boot', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" /> },
      ] },
      { name: 'Full-Stack Frameworks', items: [
        { name: 'MERN', icon: <FaGlobe /> },
        { name: 'MEAN', icon: <FaGlobe /> },
        { name: 'LAMP', icon: <FaGlobe /> },
        { name: 'GraphQL', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" alt="GraphQL" /> },
      ] },
    ],
    tools: [
      { name: 'Figma', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" /> },
      { name: 'Adobe XD', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" alt="Adobe XD" /> },
      { name: 'InVision', icon: <FaGlobe /> },
      { name: 'Google PageSpeed Insights', icon: <FaGlobe /> },
      { name: 'Lighthouse', icon: <FaGlobe /> },
      { name: 'Postman', icon: <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="Postman" /> },
      { name: 'Swagger', icon: <FaGlobe /> },
      { name: 'Heroku', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg" alt="Heroku" /> },
      { name: 'Netlify', icon: <FaGlobe /> },
    ],
  },
  {
    category: 'Data Analytics',
    icon: <FaChartBar />,
    languages: [
      { name: 'Python', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /> },
      { name: 'R', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" alt="R" /> },
      { name: 'Java', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" /> },
      { name: 'Scala', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg" alt="Scala" /> },
    ],
    frameworks: [
      { name: 'Python Libraries', items: [
        { name: 'Pandas', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" alt="Pandas" /> },
        { name: 'NumPy', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy" /> },
        { name: 'Matplotlib', icon: <FaChartBar /> },
        { name: 'Scikit-learn', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" alt="Scikit-learn" /> },
        { name: 'TensorFlow', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" /> },
        { name: 'Keras', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg" alt="Keras" /> },
      ] },
      { name: 'R Libraries', items: [
        { name: 'dplyr', icon: <FaChartBar /> },
        { name: 'ggplot2', icon: <FaChartBar /> },
        { name: 'tidyverse', icon: <FaChartBar /> },
      ] },
      { name: 'Big Data Technologies', items: [
        { name: 'Apache Hadoop', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" alt="Apache Hadoop" /> },
        { name: 'Apache Spark', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg" alt="Apache Spark" /> },
      ] },
      { name: 'Visualization Tools', items: [
        { name: 'Tableau', icon: <FaChartBar /> },
        { name: 'Power BI', icon: <FaChartBar /> },
      ] },
    ],
    tools: [
      { name: 'Tableau', icon: <FaChartBar /> },
      { name: 'Microsoft Power BI', icon: <FaChartBar /> },
      { name: 'Google Data Studio', icon: <FaChartBar /> },
      { name: 'Excel', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg" alt="Excel" /> },
      { name: 'Jupyter Notebooks', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg" alt="Jupyter Notebooks" /> },
      { name: 'Google Colab', icon: <FaChartBar /> },
    ],
  },
  {
    category: 'API Integration',
    icon: <FaPlug />,
    languages: [
      { name: 'JavaScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" /> },
      { name: 'Python', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /> },
      { name: 'PHP', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" /> },
      { name: 'TypeScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" /> },
      { name: 'C++', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" /> },
      { name: 'Go', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" alt="Go" /> },
    ],
    frameworks: [
      { name: 'REST APIs', items: [
        { name: 'Express', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" /> },
        { name: 'Flask', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" /> },
        { name: 'Django', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg" alt="Django" /> },
        { name: 'FastAPI', icon: <FaPlug /> },
      ] },
      { name: 'GraphQL', items: [
        { name: 'Apollo Server', icon: <FaPlug /> },
        { name: 'Hasura', icon: <FaPlug /> },
      ] },
      { name: 'gRPC', items: [
        { name: 'gRPC', icon: <FaPlug /> },
      ] },
    ],
    tools: [
      { name: 'Postman', icon: <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="Postman" /> },
      { name: 'Swagger', icon: <FaPlug /> },
      { name: 'API Gateway (AWS, Google Cloud)', icon: <FaPlug /> },
      { name: 'GraphQL Playground', icon: <FaPlug /> },
      { name: 'Insomnia', icon: <FaPlug /> },
    ],
  },
  {
    category: 'AI Services',
    icon: <FaRobot />,
    languages: [
      { name: 'Python', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /> },
      { name: 'JavaScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" /> },
    ],
    frameworks: [
      { name: 'AI Model Training', items: [
        { name: 'TensorFlow', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" /> },
        { name: 'PyTorch', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" /> },
        { name: 'Keras', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg" alt="Keras" /> },
        { name: 'Scikit-learn', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" alt="Scikit-learn" /> },
      ] },
      { name: 'AI App Development', items: [
        { name: 'Flask', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" /> },
        { name: 'FastAPI', icon: <FaRobot /> },
        { name: 'Node.js', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" /> },
      ] },
    ],
    tools: [
      { name: 'Google AI Platform', icon: <FaRobot /> },
      { name: 'AWS Sagemaker', icon: <FaRobot /> },
      { name: 'Azure Machine Learning', icon: <FaRobot /> },
    ],
  },
  {
    category: 'IoT (Internet of Things)',
    icon: <FaMicrochip />,
    languages: [
      { name: 'C', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" /> },
      { name: 'C++', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" /> },
    ],
    frameworks: [
      { name: 'IoT Platforms', items: [
        { name: 'AWS IoT', icon: <FaMicrochip /> },
        { name: 'Google Cloud IoT', icon: <FaMicrochip /> },
        { name: 'Microsoft Azure IoT', icon: <FaMicrochip /> },
      ] },
      { name: 'IoT Protocols', items: [
        { name: 'MQTT', icon: <FaMicrochip /> },
        { name: 'CoAP', icon: <FaMicrochip /> },
        { name: 'Zigbee', icon: <FaMicrochip /> },
        { name: 'Bluetooth Low Energy (BLE)', icon: <FaMicrochip /> },
      ] },
      { name: 'Embedded Development', items: [
        { name: 'Arduino', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" alt="Arduino" /> },
        { name: 'Raspberry Pi', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" alt="Raspberry Pi" /> },
        { name: 'Espressif ESP32', icon: <FaMicrochip /> },
      ] },
    ],
    tools: [
      { name: 'IoT Security Best Practices', icon: <FaMicrochip /> },
      { name: 'Device Management Platforms', icon: <FaMicrochip /> },
      { name: 'IoT Standards Compliance (ISO/IEC 30141)', icon: <FaMicrochip /> },
      { name: 'Edge Computing', icon: <FaMicrochip /> },
    ],
  },
  {
    category: 'Gamification',
    icon: <FaGamepad />,
    languages: [
      { name: 'C#', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" /> },
      { name: 'C++', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" /> },
      { name: 'JavaScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" /> },
    ],
    frameworks: [
      { name: 'Game Engines', items: [
        { name: 'Unity', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" alt="Unity" /> },
        { name: 'Unreal Engine', icon: <FaGamepad /> },
        { name: 'Godot', icon: <FaGamepad /> },
      ] },
      { name: 'Gamification Platforms', items: [
        { name: 'Badgeville', icon: <FaGamepad /> },
        { name: 'Bunchball', icon: <FaGamepad /> },
        { name: 'Classcraft', icon: <FaGamepad /> },
      ] },
    ],
    tools: [
      { name: 'Game Design Principles', icon: <FaGamepad /> },
      { name: 'Player Engagement Strategies', icon: <FaGamepad /> },
      { name: 'Behavioral Psychology in Games', icon: <FaGamepad /> },
    ],
  },
  {
    category: 'Blockchain',
    icon: <FaCubes />,
    languages: [
      { name: 'Solidity', icon: <FaCubes /> },
      { name: 'Go', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" alt="Go" /> },
      { name: 'Rust', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg" alt="Rust" /> },
    ],
    frameworks: [
      { name: 'Blockchain Platforms', items: [
        { name: 'Ethereum', icon: <FaCubes /> },
        { name: 'Hyperledger', icon: <FaCubes /> },
        { name: 'Polkadot', icon: <FaCubes /> },
      ] },
      { name: 'Smart Contract Development', items: [
        { name: 'Truffle', icon: <FaCubes /> },
        { name: 'Hardhat', icon: <FaCubes /> },
        { name: 'OpenZeppelin', icon: <FaCubes /> },
      ] },
    ],
    tools: [
      { name: 'Smart Contract Auditing', icon: <FaCubes /> },
      { name: 'Security Best Practices', icon: <FaCubes /> },
      { name: 'Decentralization Strategies', icon: <FaCubes /> },
      { name: 'Cryptocurrency Economics', icon: <FaCubes /> },
    ],
  },
  {
    category: 'QR Code Technology',
    icon: <FaQrcode />,
    languages: [
      { name: 'JavaScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" /> },
      { name: 'Python', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /> },
    ],
    frameworks: [
      { name: 'QR Code Libraries', items: [
        { name: 'qrcode.js', icon: <FaQrcode /> },
        { name: 'python-qrcode', icon: <FaQrcode /> },
        { name: 'ZXing', icon: <FaQrcode /> },
      ] },
    ],
    tools: [
      { name: 'QR Code Design Best Practices', icon: <FaQrcode /> },
      { name: 'Mobile Scanning Standards', icon: <FaQrcode /> },
    ],
  },
  {
    category: 'Virtual Reality (VR) & Augmented Reality (AR)',
    icon: <FaVrCardboard />,
    languages: [
      { name: 'C#', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" /> },
      { name: 'C++', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" /> },
      { name: 'JavaScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" /> },
    ],
    frameworks: [
      { name: 'VR/AR Development', items: [
        { name: 'Unity', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" alt="Unity" /> },
        { name: 'Unreal Engine', icon: <FaVrCardboard /> },
        { name: 'ARCore', icon: <FaVrCardboard /> },
        { name: 'ARKit', icon: <FaVrCardboard /> },
      ] },
      { name: 'Web-Based VR/AR', items: [
        { name: 'A-Frame', icon: <FaVrCardboard /> },
        { name: 'Three.js', icon: <FaVrCardboard /> },
        { name: 'WebXR', icon: <FaVrCardboard /> },
      ] },
    ],
    tools: [
      { name: '3D Asset Creation', icon: <FaVrCardboard /> },
      { name: 'Immersive Experience Design', icon: <FaVrCardboard /> },
      { name: 'User Experience Design for Immersive Tech', icon: <FaVrCardboard /> },
      { name: 'Prototyping VR/AR Interfaces', icon: <FaVrCardboard /> },
    ],
  },
];

const TechChip: React.FC<{ name: string; icon: React.ReactNode }> = ({ name, icon }) => (
  <Tooltip content={name} placement="top">
    <Chip
      variant="shadow"
      className="bg-white/20 hover:bg-white/30 transition-all duration-300 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full truncate group"
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Avatar
          src={typeof icon === 'string' ? icon : undefined}
          icon={typeof icon !== 'string' ? icon : undefined}
          size="sm"
          className="text-white"
        />
      </motion.div>
    </Chip>
  </Tooltip>
);

const CustomCursor: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  return (
    <motion.div
      className="fixed w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        left: mousePosition.x,
        top: mousePosition.y + 16,
        backgroundColor: 'white',
      }}
      initial={false}
      transition={{
        type: "tween",
        duration: 0,
      }}
    />
  );
};

const TechnologySection: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    document.body.addEventListener('mousemove', updateMousePosition);
    return () => {
      document.body.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

   const gradients = [
    'bg-gradient-to-br from-blue-600 to-purple-700',
    'bg-gradient-to-br from-green-500 to-blue-600',
    'bg-gradient-to-br from-purple-600 to-pink-600',
    'bg-gradient-to-br from-yellow-500 to-orange-600',
    'bg-gradient-to-br from-indigo-600 to-purple-700',
    'bg-gradient-to-br from-fuchsia-600 to-red-600',
    'bg-gradient-to-br from-teal-500 to-blue-600',
    'bg-gradient-to-br from-green-500 to-blue-600',
    'bg-gradient-to-br from-blue-500 to-indigo-600',
    'bg-gradient-to-br from-green-600 to-teal-600'
  ];

  return (
    <IconContext.Provider value={{ size: '1.5em' }}>
      <div className="space-y-12 p-4 sm:p-8 bg-gray-100 dark:bg-gray-900">
        {TechnologySections.map((stack, index) => (
          <motion.div
            key={stack.category}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="cursor-none"
          >
            <Card 
              className={`h-full w-full p-6 sm:p-8 overflow-hidden relative ${gradients[index % gradients.length]} shadow-xl`}
              onMouseEnter={() => {
                setHoveredCategory(stack.category);
                setIsHovering(true);
              }}
              onMouseLeave={() => {
                setHoveredCategory(null);
                setIsHovering(false);
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-10"></div>
              
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold text-white mb-8 flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  {stack.icon}
                </div>
                <span>{stack.category}</span>
              </motion.h2>
              
              {/* Languages section */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Languages</h3>
                <div className="flex flex-wrap gap-4">
                  {stack.languages.map((lang) => (
                    <TechChip key={lang.name} name={lang.name} icon={lang.icon} />
                  ))}
                </div>
              </div>
              
              {/* Frameworks section */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Frameworks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stack.frameworks.map((framework) => (
                    <div key={framework.name} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors duration-300">
                      <h4 className="font-medium text-white mb-3 truncate">{framework.name}</h4>
                      <div className="flex flex-wrap gap-3">
                        {framework.items.map((item) => (
                          <TechChip key={item.name} name={item.name} icon={item.icon} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tools section */}
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Tools</h3>
                <div className="flex flex-wrap gap-4">
                  {stack.tools.map((tool) => (
                    <TechChip key={tool.name} name={tool.name} icon={tool.icon} />
                  ))}
                </div>
              </div>
            </Card>
            <AnimatePresence>
              {isHovering && hoveredCategory === stack.category && (
                <CustomCursor mousePosition={mousePosition} />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </IconContext.Provider>
  );
};

export default TechnologySection;

