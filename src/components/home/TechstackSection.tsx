import React, { useState, useRef, useEffect } from 'react';
import { Code, Globe, Shield, Database, Cpu, Zap, Smartphone, Cloud, PieChart, Brain, Server, Wand2 } from 'lucide-react'; // Added new icons
import { gsap } from 'gsap'; // Import GSAP

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Gets the mouse position
const getMousePos = e => {
    return {
        x: e.clientX,
        y: e.clientY
    };
};

// This function generates a random string of a given length
const getRandomString = length => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Initialize mouse position object outside of component to persist across renders
let mousepos = {x: 0, y: 0};

const TechStackItem = ({ icon: Icon, label, tag }) => {
  const itemRef = useRef(null);
  const decoRef = useRef(null);
  const animationRef = useRef(null);
  const renderedStylesRef = useRef({
    x: { previous: 0, current: 0, amt: 0.1 },
    y: { previous: 0, current: 0, amt: 0.1 }
  });
  const scrollValRef = useRef({ x: 0, y: 0 });
  const rectRef = useRef(null);
  const randomStringRef = useRef(getRandomString(2000)); // Initialize with a random string

  useEffect(() => {
    if (!itemRef.current || !decoRef.current) return;

    const handleGlobalMouseMove = (ev) => {
        mousepos = getMousePos(ev);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);

    const calculateSizePosition = () => {
        scrollValRef.current = {x: window.scrollX, y: window.scrollY};
        rectRef.current = itemRef.current.getBoundingClientRect();
    };

    const loopRender = (isFirstTick = false) => {
        if ( !animationRef.current ) {
            animationRef.current = requestAnimationFrame(() => render(isFirstTick));
        }
    };

    const stopRendering = () => {
        if ( animationRef.current ) {
            window.cancelAnimationFrame(animationRef.current);
            animationRef.current = undefined;
        }
    };

    const render = (isFirstTick) => {
        animationRef.current = undefined;

        const scrollDiff = {
            x: scrollValRef.current.x - window.scrollX,
            y: scrollValRef.current.y - window.scrollY
        };

        // Calculate current target position relative to the element
        // Adjust for scroll and element's own position
        renderedStylesRef.current['x'].current = (mousepos.x - (scrollDiff.x + rectRef.current.left));
        renderedStylesRef.current['y'].current = (mousepos.y - (scrollDiff.y + rectRef.current.top));

        if ( isFirstTick ) {
            renderedStylesRef.current['x'].previous = renderedStylesRef.current['x'].current;
            renderedStylesRef.current['y'].previous = renderedStylesRef.current['y'].current;
        }

        for (const key in renderedStylesRef.current ) {
            renderedStylesRef.current[key].previous = lerp(renderedStylesRef.current[key].previous, renderedStylesRef.current[key].current, renderedStylesRef.current[key].amt);
        }

        // *** IMPORTANT CHANGE HERE ***
        // Set the CSS variables --x and --y directly on the decoRef.current element
        // The mask-image uses these variables for its position
        gsap.set(decoRef.current, {
            '--x': `${renderedStylesRef.current['x'].previous}px`, // Ensure units are included
            '--y': `${renderedStylesRef.current['y'].previous}px`  // Ensure units are included
        });
        // *****************************

        decoRef.current.innerHTML = randomStringRef.current;

        loopRender();
    };

    const handleResize = () => calculateSizePosition();

    const handleMouseMove = () => {
        // Get a new random string only on mousemove over the item
        randomStringRef.current = getRandomString(2000);
    };

    const handleMouseEnter = () => {
        gsap.to(decoRef.current, {
            duration: .5,
            ease: 'power3',
            opacity: 1
        });
        console.log("Mouse entered TechStackItem");
        const isFirstTick = true;
        loopRender(isFirstTick);
    };

    const handleMouseLeave = () => {
        stopRendering();

        gsap.to(decoRef.current, {
            duration: .5,
            ease: 'power3',
            opacity: 0
        });
    };

    calculateSizePosition();

    window.addEventListener('resize', handleResize);
    itemRef.current.addEventListener('mousemove', handleMouseMove);
    itemRef.current.addEventListener('mouseenter', handleMouseEnter);
    itemRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      stopRendering();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      if (itemRef.current) {
        itemRef.current.removeEventListener('mousemove', handleMouseMove);
        itemRef.current.removeEventListener('mouseenter', handleMouseEnter);
        itemRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="grid__item">
      <div
        ref={itemRef}
        className="grid__item-img"
      >
        <div
          ref={decoRef}
          className="grid__item-img-deco"
        />
        <Icon className="w-12 h-12 relative z-20 text-purple-400" /> {/* Ensure icon is above deco */}
      </div>
      <div className="mt-4">
        <p className="grid__item-label">{label}</p>
        <span className="grid__item-tag">
          {tag}
        </span>
      </div>
    </div>
  );
};

const TechstackSection = () => {
   const techs = [
    // Web Development
    {
      icon: Globe,
      label: "Modern web development with React, Vue, or Angular for dynamic and responsive user interfaces.",
      tag: "Frontend Development"
    },
    {
      icon: Code,
      label: "Robust backend systems using Node.js, Python (Django/Flask), or Ruby on Rails.",
      tag: "Backend Development"
    },
    {
      icon: Database,
      label: "Database management with PostgreSQL, MongoDB, or MySQL for scalable data storage.",
      tag: "Database Management"
    },
    {
      icon: Server,
      label: "Cloud deployment and infrastructure on AWS, Azure, or Google Cloud Platform.",
      tag: "Cloud Infrastructure"
    },

    // Mobile Development
    {
      icon: Smartphone,
      label: "Native iOS applications using Swift and SwiftUI for exceptional performance and UI.",
      tag: "iOS Native Development"
    },
    {
      icon: Smartphone,
      label: "Native Android applications developed with Kotlin and Jetpack Compose for modern experiences.",
      tag: "Android Native Development"
    },
    {
      icon: Zap,
      label: "Cross-platform mobile apps built with React Native or Flutter for efficient development.",
      tag: "Cross-Platform Mobile"
    },

    // Data Analytics
    {
      icon: PieChart,
      label: "Data processing and analysis using Python (Pandas, NumPy) and R for statistical modeling.",
      tag: "Data Processing & Analysis"
    },
    {
      icon: Database,
      label: "Big data solutions with Apache Spark, Hadoop, and data warehousing on Snowflake or BigQuery.",
      tag: "Big Data & Warehousing"
    },
    {
      icon: Cloud,
      label: "Business intelligence and visualization with Tableau, Power BI, and Google Looker Studio.",
      tag: "BI & Data Visualization"
    },

    // AI Solutions
    {
      icon: Brain,
      label: "Machine Learning models developed with TensorFlow, PyTorch, and Scikit-learn.",
      tag: "Machine Learning"
    },
    {
      icon: Cpu,
      label: "Natural Language Processing (NLP) solutions using libraries like SpaCy and Hugging Face Transformers.",
      tag: "Natural Language Processing"
    },
    {
      icon: Wand2,
      label: "Computer Vision applications for image processing and object detection with OpenCV.",
      tag: "Computer Vision"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0945EB] via-[#67D1FF] to-[#0945EB]">
              Our Tech Stack
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover the cutting-edge technologies and solutions we've implemented for our clients
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techs.map((project, index) => (
            <TechStackItem
              key={index}
              icon={project.icon}
              label={project.label}
              tag={project.tag}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechstackSection;