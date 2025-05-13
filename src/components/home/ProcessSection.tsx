"use client"
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import $ from 'jquery';
import { Rocket, CheckCircle, Clock, Users, Cog, Headphones, ChevronDown } from 'lucide-react';
import { FaComments, FaClipboardList, FaLaptopCode, FaRocket, FaHeadset } from 'react-icons/fa';
import { Popover, PopoverTrigger, PopoverContent, Card, CardHeader, CardBody, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const iconComponents = [FaComments, FaClipboardList, FaLaptopCode, FaRocket, FaHeadset];

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We discuss your needs and goals, understanding your vision and challenges.',
    details: [
      'In-depth analysis of your current situation',
      'Identification of key pain points and opportunities',
      'Discussion of potential solutions and technologies',
      'Setting clear objectives and success metrics'
    ]
  },
  {
    number: '02',
    title: 'Planning',
    description: 'We create a tailored strategy, outlining milestones and deliverables.',
    details: [
      'Development of a comprehensive project roadmap',
      'Resource allocation and team assignment',
      'Risk assessment and mitigation strategies',
      'Definition of key performance indicators (KPIs)'
    ]
  },
  {
    number: '03',
    title: 'Development',
    description: 'We build your custom solution, leveraging cutting-edge technologies.',
    details: [
      'Agile development methodology with regular sprints',
      'Continuous integration and deployment (CI/CD)',
      'Rigorous quality assurance and testing processes',
      'Regular progress updates and client feedback sessions'
    ]
  },
  {
    number: '04',
    title: 'Implementation',
    description: 'We deploy and integrate the solution seamlessly into your workflow.',
    details: [
      'Phased rollout strategy to minimize disruption',
      'Comprehensive user training and documentation',
      'System integration with existing infrastructure',
      'Performance monitoring and optimization'
    ]
  },
  {
    number: '05',
    title: 'Support',
    description: 'We provide ongoing maintenance and support to ensure long-term success.',
    details: [
      '24/7 technical support and issue resolution',
      'Regular system updates and security patches',
      'Performance analytics and improvement recommendations',
      'Scalability planning for future growth'
    ]
  },
];

const StepCard = ({ step, isOpen, onOpenChange, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 500 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }
  };

  const IconComponent = iconComponents[parseInt(step.number) - 1];

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          motionProps={{
            variants: modalVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit"
          }}
          classNames={{
            wrapper: 'z-[99999]',
            body: 'p-0',
            backdrop: "bg-gradient-to-t from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm",
            base: 'border-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100',
            header: 'border-b-0',
            footer: 'border-t-0',
            closeButton: 'hover:bg-white/10 active:bg-white/20',
          }}
        >
          <ModalContent className="max-w-md mx-auto">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <motion.div 
                    className="flex items-center gap-4"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="p-3 bg-indigo-600 rounded-full">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </motion.div>
                </ModalHeader>
                <ModalBody>
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-6"
                  >
                    <p className="text-lg mb-4">{step.description}</p>
                    <ul className="space-y-3">
                      {step.details.map((detail, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="inline-block w-2 h-2 mt-2 mr-3 bg-indigo-600 rounded-full" />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    variant="shadow"
                    onPress={onClose}
                    className="w-full"
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
}

const ProcessIcon = ({ icon: Icon, isActive }) => {
  return (
    <motion.div
      className={`w-24 h-12 mb-24 rounded-lg flex items-center justify-center ${
        isActive ? 'bg-indigo-600' : 'bg-gray-300'
      }`}
      initial={{ rotateY: 0, x: 20 }}
      animate={{ 
        x: isActive ? -30 : 20,
        rotateY: isActive ? 180 : 0
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center"
        style={{ rotateY: isActive ? 180 : 0 }}
      >
        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`} />
      </motion.div>
    </motion.div>
  );
};

const ProcessSection = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const stepPositionsRef = useRef(new Map());
  const rocketRef = useRef(null);
  const smokeRef = useRef(null);
  const rocketContainerRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !rocketContainerRef.current) return;
    const updateContainerHeight = () => {
      if (rocketContainerRef.current) {
        setContainerHeight(rocketContainerRef.current.clientHeight);
      }
    };
    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const sectionTop = sectionRect.top;
    const sectionBottom = sectionRect.bottom;
    stepPositionsRef.current = new Map(
      stepsRef.current.map((step, index) => {
        if (!step) return [index, null];
        const stepRect = step.getBoundingClientRect();
        return [
          index,
          {
            top: stepRect.top,
            bottom: stepRect.bottom
          }
        ];
      })
    );

    const handleScroll = () => {
      const scrollTop = $(document.body).scrollTop() + 200;
      if (scrollTop < sectionTop) {
        setCurrentStep(0)
        return;
      }
      if (scrollTop > sectionBottom) {
        setCurrentStep(4)
        return;
      }
      const currentStepIndex = Array.from(stepPositionsRef.current.entries()).find(
        ([index, position]) => {
          if (!position) return false;
          return scrollTop >= position.top && scrollTop < position.bottom;
        }
      );

      if (currentStepIndex) {
        const newStep = currentStepIndex[0];
        if (newStep !== currentStep) {
          setCurrentStep(newStep);
          setIsUpdated(true);
        } else {
          setIsUpdated(false);
        }
      } 
    };

    $(document.body).on('scroll', handleScroll);
    handleScroll(); 

    return () => {
      $(document.body).off('scroll', handleScroll);
    };
  }, []);

  const calculateRocketPosition = (step) => {
    const stepHeight = containerHeight / 5;
    const initialOffset = 0;
    const stepOffset = 50;
    if (step === 0) {
      return initialOffset;
    } else {
      return stepHeight * step + stepOffset;
    }
  };

  const calculateSmokeHeight = (step) => {
    const stepHeight = containerHeight / 5;
    const initialOffset = 0;
    const stepOffset = 50;
    if (step === 0) {
      return initialOffset;
    } else {
      return stepHeight * step + stepOffset;
    }
  };

  return (
    <section 
      id="process" 
      className="py-20 bg-gradient-to-b from-indigo-100 via-white to-purple-100"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-indigo-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Process
        </motion.h2>
        <div className="relative flex justify-between items-start">
          <div className="w-2/3">
            <div className="relative flex justify-center">
              <div className="absolute left-0 h-full top-16 bottom-24" ref={rocketContainerRef}>
                <motion.div
                  className="absolute left-4 w-6 h-full"
                  initial={{ height: 50 }}
                  animate={{ height: calculateSmokeHeight(currentStep) }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 animate-pulse" style={{ filter: 'blur(8px)' }} />
                  </div>
                </motion.div>
                <motion.div
                  ref={rocketRef}
                  className="absolute left-0 z-10"
                  initial={{ top: 0, rotate: 135 }}
                  animate={{
                    rotate: isUpdated ? 0 : 135,
                    top: calculateRocketPosition(currentStep),
                    transition: { duration: 0.5, type: 'spring', stiffness: 100 }
                  }}
                >
                  <Rocket className="text-indigo-600 h-14 w-14 drop-shadow-lg" />
                </motion.div>
              </div>
              <div className="space-y-24 py-8 max-w-3xl ml-64">
                {steps.map((step, index) => (
                  <div key={index} ref={el => stepsRef.current[index] = el}>
                    <StepItem 
                      step={step} 
                      index={index} 
                      isActive={index === currentStep}
                      isCompleted={index < currentStep}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/3 relative bottom-48 mt-56 hidden md:block">
            <div className="absolute right-32 top-0 bottom-0 w-1 h-full bg-indigo-200" />
            <div className="space-y-40">
              {steps.map((step, index) => (
                <div key={index} className="relative top-24 h-28">
                  <div className="absolute right-32 transform -translate-y-1/2">
                    <ProcessIcon icon={iconComponents[index]} isActive={index === currentStep} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StepItem = ({ step, index, isActive, isCompleted }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="w-full pr-16"
    >
      <motion.div 
        className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
          isActive ? 'bg-white scale-105 shadow-xl' : 'bg-gray-50'
        }`}
        whileHover={{ scale: isActive ? 1.05 : 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
        onClick={onOpen}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-semibold ${isActive ? 'text-indigo-800' : 'text-gray-800'}`}>
            {step.title}
          </h3>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isActive ? 'bg-indigo-600' : isCompleted ? 'bg-purple-500' : 'bg-gray-400'
          } text-white font-bold`}>
            {step.number}
          </div>
        </div>
        <p className={`${isActive ? 'text-gray-700' : 'text-gray-600'} mb-4`}>{step.description}</p>
        <div className="flex items-center text-indigo-600">
          <span className="mr-2">Learn More</span>
          <ChevronDown size={16} />
        </div>
      </motion.div>
      <StepCard
        step={step}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={`${step.title} Details`}
        content={
          <ul className="list-disc pl-5">
            {step.details.map((detail, i) => (
              <li key={i} className="text-sm mb-2">{detail}</li>
            ))}
          </ul>
        }
      />
    </motion.div>
  );
};

export default ProcessSection;