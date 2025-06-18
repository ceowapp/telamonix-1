import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, Tab } from '@nextui-org/react';
import { servicesData, ServiceCategory } from '@/constants/data';

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>(servicesData[0]?.id || '');
  const [activeTab, setActiveTab] = useState<string>(servicesData[0]?.tabs[0]?.key || '');

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(prevCategory => 
      prevCategory === categoryId ? '' : categoryId
    );
    const category = servicesData.find(cat => cat.id === categoryId);
    if (category?.tabs[0]?.key) {
      setActiveTab(category.tabs[0].key);
    }
  };

  const handleTabChange = (key: React.Key) => {
    setActiveTab(key.toString());
  };

  const renderServiceContent = (category: ServiceCategory) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.h3
        className={`text-3xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {category.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg leading-relaxed text-gray-200"
      >
        {category.description}
      </motion.p>
      <Tabs
        aria-label={category.title}
        color="primary"
        variant="underlined"
        selectedKey={activeTab}
        onSelectionChange={handleTabChange}
        className="mt-6"
        classNames={{
          tabList: "flex-wrap",
          cursor: "bg-primary",
          tab: "max-w-fit px-2 h-10",
          tabContent: "group-data-[selected=true]:text-white"
        }}
      >
        {category.tabs.map((tab) => (
          <Tab key={tab.key} title={tab.title}>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <p className="mb-3 text-gray-200">{tab.description}</p>
                <h4 className="font-semibold mb-2 text-lg text-white">{tab.title}:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-200">
                  {tab.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </Tab>
        ))}
      </Tabs>
    </motion.div>
  );

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0945EB] via-[#67D1FF] to-[#0945EB]">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-[#E2E8F0] max-w-3xl mx-auto">
            Comprehensive technology solutions to drive your business forward
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12">
          {/* Service Categories */}
          <div className="space-y-4">
            {servicesData.map((category) => (
              <React.Fragment key={category.id}>
                <motion.button
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-[#0945EB]/20 to-[#67D1FF]/20 border border-[#67D1FF]/30'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.gradient}`}>
                      <category.icon className="text-2xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                      <p className="text-sm text-[#E2E8F0] mt-1">{category.description}</p>
                    </div>
                  </div>
                </motion.button>
                {/* Accordion Content for Small Screens */}
                <AnimatePresence>
                  {activeCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="lg:hidden bg-white/5 rounded-xl p-8 border border-white/10 mt-4"
                    >
                      {renderServiceContent(category)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </div>

          {/* Service Content for Larger Screens */}
          <div className="hidden lg:block bg-white/5 rounded-xl p-8 border border-white/10">
            <AnimatePresence mode="wait">
              {servicesData.map((category) => (
                activeCategory === category.id && (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderServiceContent(category)}
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ServicesSection);