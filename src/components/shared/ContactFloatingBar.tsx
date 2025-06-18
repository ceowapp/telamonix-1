'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

const ContactFloatingBar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeOption, setActiveOption] = useState(null);

  const contactOptions = [
    {
      id: 'phone',
      icon: '/svgs/phone.svg',
      label: 'Call Us',
      link: 'tel:0326119184',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-green-500',
    },
    {
      id: 'zalo',
      icon: '/svgs/zalo.svg',
      label: 'Zalo',
      link: 'https://zalo.me/0326119184',
      color: 'bg-[#0068FF] hover:bg-[#0048CC]',
      textColor: 'text-[#0068FF]',
    },
    {
      id: 'email',
      icon: '/svgs/email.svg',
      label: 'Email',
      link: 'mailto:thenguyenfiner@gmail.com',
      color: 'bg-[#FF5722] hover:bg-[#E64A19]',
      textColor: 'text-[#FF5722]',
    },
    {
      id: 'whatsapp',
      icon: '/svgs/whatsapp.svg',
      label: 'WhatsApp',
      link: 'https://api.whatsapp.com/send?phone=%2B84326119184',
      color: 'bg-[#25D366] hover:bg-[#20BD5C]',
      textColor: 'text-[#25D366]',
    },
    {
      id: 'messenger',
      icon: '/svgs/messenger.svg',
      label: 'Messenger',
      link: 'https://www.facebook.com/telamonix',
      color: 'bg-[#0084FF] hover:bg-[#0063CC]',
      textColor: 'text-[#0084FF]',
    },
    {
      id: 'linkedin',
      icon: '/svgs/linkedin.svg',
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/nguyen-dat-5b1812324/',
      color: 'bg-[#0088cc] hover:bg-[#006699]',
      textColor: 'text-[#0088cc]',
    },
  ];

  return (
    <div className="fixed left-5 bottom-32 z-50 flex flex-col items-start">
      {/* Toggle Button */}
      <motion.button
        className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex justify-center items-center text-white shadow-lg shadow-indigo-400/30 z-10 my-3"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
      >
        <Icon 
          src={isExpanded ? '/svgs/close.svg' : '/svgs/chat.svg'} 
          alt={isExpanded ? 'Close' : 'Contact Us'} 
          size={28}
        />
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="flex flex-col gap-3 mb-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.id}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center px-4 py-3 rounded-full transition-all duration-300 ${
                  activeOption === option.id
                    ? `${option.color} text-white`
                    : `bg-white/90 ${option.textColor} hover:${option.color} hover:text-white`
                } shadow-md hover:shadow-lg`}
                onMouseEnter={() => setActiveOption(option.id)}
                onMouseLeave={() => setActiveOption(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-center items-center w-9 h-9 mr-3 rounded-full bg-white/20">
                  <Icon src={option.icon} alt={option.label} size={22} />
                </div>
                <span className="font-medium text-sm whitespace-nowrap">{option.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactFloatingBar;