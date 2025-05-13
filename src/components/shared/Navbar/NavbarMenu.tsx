"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import NavbarItem from "./NavbarItem";
import { languageMap } from "@/constants/data";

interface NavbarMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  language?: string;
}

const NavbarMenu = React.memo(({ isOpen, toggleMenu, language = "en" }: NavbarMenuProps) => {
  const { navbarLinks = [] } = React.useMemo(() => 
    languageMap[language] || languageMap["en"] || { navbarLinks: [] }, 
  [language]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 shadow-xl"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/pages/shared/compressed_share-13.png"
              alt="Menu Background"
              layout="fill"
              objectFit="cover"
              priority
              quality={75}
              placeholder="blur"
              blurDataURL={"/images/pages/shared/low_res_share-13.png"}
            />
          </div>
          <div className="relative flex flex-col items-center justify-center pt-[128px] space-y-6 z-10">
            {navbarLinks.map((item, index) => (
              <motion.div
                key={item?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <NavbarItem href={`${item?.link?.toLowerCase()}`} label={item?.page} onClick={toggleMenu} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default NavbarMenu;

