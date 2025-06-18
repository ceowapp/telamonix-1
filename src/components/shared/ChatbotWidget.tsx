"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ChatbotWidget = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [areScriptsLoaded, setAreScriptsLoaded] = useState(false);

  useEffect(() => {
    if (!areScriptsLoaded && !document.getElementById('botpress-main-script')) {
      const injectScript = document.createElement('script');
      injectScript.id = 'botpress-main-script';
      injectScript.src = 'https://cdn.botpress.cloud/webchat/v2.5/inject.js';
      injectScript.async = true;

      const configScript = document.createElement('script');
      configScript.id = 'botpress-config-script';
      configScript.src = 'https://files.bpcontent.cloud/2025/06/03/09/20250603091621-3YOOUU5N.js';
      configScript.async = true;

      injectScript.onload = () => {
        document.body.appendChild(configScript);
        configScript.onload = () => {
          setAreScriptsLoaded(true);

          if (window.botpressWebChat) {
            window.botpressWebChat.sendEvent({ type: 'close' });
          }
        };
        configScript.onerror = (error) => {
          console.error("Failed to load Botpress config script:", error);
        };
      };
      injectScript.onerror = (error) => {
        console.error("Failed to load Botpress inject script:", error);
      };

      document.body.appendChild(injectScript);
    }
  }, [areScriptsLoaded]);

  useEffect(() => {
    if (areScriptsLoaded && window.botpressWebChat) {
      if (isChatbotOpen) {
        window.botpressWebChat.sendEvent({ type: 'show' });
      } else {
        window.botpressWebChat.sendEvent({ type: 'close' });
      }
    }
  }, [isChatbotOpen, areScriptsLoaded]);

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev);
  };

  return null;
};

export default ChatbotWidget;