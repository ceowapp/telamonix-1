"use client"
import React, { useEffect, useCallback, useState, useMemo, useRef, Suspense } from 'react';
import { SocialIcon } from 'react-social-icons';
import { Typography, Container, Box, InputAdornment, TextField, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from "@gsap/react";
import { Decal, Float, OrbitControls, Preload, useTexture, Text, Billboard, Sphere, MeshDistortMaterial, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Center, Instance, Instances, RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { CustomMaterial } from "./material";
import { GroupProps, useFrame, Canvas } from '@react-three/fiber';
import SearchIcon from '@mui/icons-material/Search';
import { ChevronDown, ChevronUp } from 'react-feather';

const ExpandableFooterLinks = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const services = [
    "Web App Development",
    "Mobile App Development",
    "Low-code/No-code Development",
    "Data Analytics",
    "AR VR",
    "QR Code",
    "BIM Technology",
    "Digital Twins",
    "API Integration",
    "Microservices Architecture",
    "DevOps and CI/CD",
    "AI Services",
    "Cloud Computing",
    "Serverless Computing",
    "Cybersecurity",
    "Business Automation",
    "Gamification",
    "IOT Development",
    "Blockchain",
    "Robotics Development",
    "Quantum Computing",
  ];

  return (
    <motion.div layout>
      <ul className="text-left space-y-2">
        {services.slice(0, 6).map((service, index) => (
          <FooterLink key={index} href="/myspace/apps">
            {service}
          </FooterLink>
        ))}
      </ul>
      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            className="text-left space-y-2 mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {services.slice(6).map((service, index) => (
              <FooterLink key={index + 6} href="/myspace/apps">
                {service}
              </FooterLink>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <motion.button
        className="mt-4 text-indigo-400 hover:text-indigo-300 transition-colors duration-300 flex items-center"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="mr-2">{isExpanded ? 'Collapse' : 'Expand'}</span>
        <motion.div
          initial={false}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

const SocialLink = ({ href, network, bgColor }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="inline-block w-12 h-12 rounded-full bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
      whileHover={{
        boxShadow: `0 0 20px ${bgColor}`,
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-75"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: bgColor }}
      />
      <SocialIcon
        target="_blank"
        url={href}
        network={network}
        bgColor="transparent"
        fgColor="#ffffff"
        style={{ height: '100%', width: '100%' }}
      />
    </motion.div>
  </motion.div>
);

const SocialLinks = () => (
  <motion.div
    className="flex justify-center space-x-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, staggerChildren: 0.1 }}
  >
    <SocialLink href="https://www.linkedin.com/in/nguyen-dat-5b1812324/" network="linkedin" bgColor="#0077B5" />
    <SocialLink href="https://github.com/ceowapp" network="github" bgColor="#333" />
    <SocialLink href="https://www.facebook.com/telamonix" network="facebook" bgColor="#1877F2" />
    <SocialLink href="https://www.youtube.com/@telamonix" network="youtube" bgColor="#FF0000" />
    <SocialLink href="https://x.com/CEOTelamonix" network="twitter" bgColor="#1DA1F2" />
  </motion.div>
);

const radius = 3;
const count = 8;

function Item(props: GroupProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
      ref.current.rotation.z += 0.01;
    }
  });

  return (
    <group {...props}>
      <group ref={ref} rotation={[0, Math.PI / count, Math.PI / 2]}>
        <Instance />
      </group>
    </group>
  );
}

export const AnimatedComponent = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= 0.01;
    }
  });

  return (
    <Center>
      <group>
        <group scale={10} ref={groupRef}>
          <Instances>
            <cylinderGeometry args={[1, 1, 0.1, 64]}></cylinderGeometry>
            <CustomMaterial></CustomMaterial>
            {Array.from({ length: 8 }).map((_, index) => {
              return (
                <Item
                  position={[
                    radius *
                      Math.cos((index * 2 * Math.PI) / count + Math.PI / 4),
                    radius *
                      Math.sin((index * 2 * Math.PI) / count + Math.PI / 4),
                    0,
                  ]}
                  rotation={[0, 0, (index * 2 * Math.PI) / count]}
                  key={index}
                ></Item>
              );
            })}
          </Instances>
        </group>
      </group>
    </Center>
  );
};

const FooterLink = ({ href, children }) => (
  <motion.li
    whileHover={{ x: 5 }}
    className="py-2"
  >
    <Link className="text-gray-400 hover:text-white no-underline transition-colors duration-300" href={href}>
      {children}
    </Link>
  </motion.li>
);

export const Footer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const animatedComponentSize = useMemo(() => {
    if (isSmallScreen) {
      return { width: '180px', height: '180px' };
    }
    return { width: '250px', height: '250px' };
  }, [isSmallScreen]);

  return (
    <div className="rounded-t-3xl bg-gradient-to-b px-4 from-black/90 via-gray-900 to-gray-800/90 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-start min-w-full">
          <div className="col-span-1">
            <Typography variant="h6" component="h3" gutterBottom className="text-left font-bold text-indigo-400">
              COMPANY
            </Typography>
            <ul className="text-left space-y-2">
              <FooterLink href="/support">Contact Us</FooterLink>
              <FooterLink href="/additionals">Contribute</FooterLink>
              <FooterLink href="/additionals">Careers</FooterLink>
              <FooterLink href="/tos">Terms</FooterLink>
              <FooterLink href="/tos">Privacy</FooterLink>
            </ul>
          </div>
          <div className="col-span-1">
            <Typography variant="h6" component="h3" gutterBottom className="text-left font-bold text-indigo-400">
              SERVICES
            </Typography>
            <ExpandableFooterLinks />
          </div>
          <div className="col-span-1">
            <Typography variant="h6" component="h3" gutterBottom className="text-left font-bold text-indigo-400">
              RESOURCES
            </Typography>
            <ul className="text-left space-y-2">
              <FooterLink href="/blogs">Blog</FooterLink>
              <FooterLink href="/support">Customers</FooterLink>
              <FooterLink href="/support">Events</FooterLink>
              <FooterLink href="/support">Documentation</FooterLink>
              <FooterLink href="/support">Community</FooterLink>
            </ul>
          </div>
          <div className="col-span-1">
            <Typography variant="h6" component="h3" gutterBottom className="text-left font-bold text-indigo-400">
              CONTACT
            </Typography>
            <Link className="text-gray-400 hover:text-white transition-colors duration-300" href="mailto:ceowapp@gmail.com">
              ceowapp@gmail.com
            </Link>
            <div className="flex justify-center sm:justify-start mt-8 overflow-x-auto py-8">
              <SocialLinks />
            </div>
            <div className="relative flex items-center justify-center mt-6">
              <div style={animatedComponentSize}>
                <Canvas camera={{ position: [0, 0, 50], fov: 90 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Suspense fallback={null}>
                    <group rotation={[0, 0, 0]}>
                      <AnimatedComponent />
                    </group>
                  </Suspense>
                </Canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-16 pt-8 text-center">
          <Typography variant="body2" className="text-gray-400">
            © {new Date().getFullYear()} Telamonix. All rights reserved.
          </Typography>
        </div>
      </div>
    </div>
  );
}