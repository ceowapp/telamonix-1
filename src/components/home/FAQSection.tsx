import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What IT services do you offer?',
    answer: 'We offer a wide range of IT services including web development, mobile app development, cloud services, IT consulting, and cybersecurity solutions.',
  },
  {
    question: 'How do you ensure the security of our data?',
    answer: 'We implement industry-standard security protocols, regular audits, and encrypted data storage to ensure the highest level of security for your data.',
  },
  {
    question: 'Can you work with our existing systems?',
    answer: 'Yes, we specialize in integrating new solutions with existing systems to ensure a seamless transition and minimal disruption to your operations.',
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary depending on the scope and complexity. We provide detailed timelines during the consultation phase and keep you updated throughout the project.',
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faq" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="flex justify-between items-center w-full text-left p-4 bg-white rounded-lg shadow-md"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <span className="text-2xl">{activeIndex === index ? '-' : '+'}</span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white px-4 pb-4 rounded-b-lg"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;