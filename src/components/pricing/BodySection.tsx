import React, { useState, useEffect, useCallback } from 'react';

// Define data structures using TypeScript interfaces for clarity
interface Plan {
  id: string;
  name: string;
  price: string;
  priceUnit: string; // e.g., "$", ""
  duration: string; // e.g., "/month", "/one-time", ""
  description: string;
  features: string[]; // List of feature names
  recommended?: boolean; // Optional: for highlighting a plan
}

interface ITService {
  id: string;
  name: string;
  plans: Plan[];
}

// Mock Data for IT Services and Pricing Plans
const itServicesData: ITService[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    plans: [
      {
        id: 'basic-web',
        name: 'Basic Web',
        price: '999',
        priceUnit: '$',
        duration: '/one-time',
        description: 'Ideal for startups and small businesses needing a strong online presence.',
        features: [
          '5-Page Website',
          'Responsive Design',
          'Basic SEO Optimization',
          'Contact Form Integration',
          '1 Month Free Support',
          'Google Analytics Setup',
          'Standard Hosting (1 year)',
        ],
      },
      {
        id: 'pro-web',
        name: 'Professional Web',
        price: '2499',
        priceUnit: '$',
        duration: '/one-time',
        description: 'Advanced features for growing businesses with custom needs.',
        features: [
          '15-Page Website',
          'Custom UI/UX Design',
          'Advanced SEO Strategy',
          'CRM Integration',
          '6 Months Free Support',
          'E-commerce Functionality (up to 50 products)',
          'Premium Hosting (1 year)',
          'CMS Integration (WordPress/Strapi)',
        ],
        recommended: true, // Highlight this plan
      },
      {
        id: 'enterprise-web',
        name: 'Enterprise Web',
        price: 'Custom',
        priceUnit: '',
        duration: '',
        description: 'Tailored solutions for large-scale operations requiring robust infrastructure.',
        features: [
          'Unlimited Pages',
          'Dedicated Project Manager',
          'Full Stack Development',
          'Scalable Architecture',
          '24/7 Priority Support',
          'Advanced Security Audits',
          'Custom API Development',
          'Dedicated Server Hosting',
          'Ongoing Feature Development',
        ],
      },
    ],
  },
  {
    id: 'cloud-solutions',
    name: 'Cloud Solutions',
    plans: [
      {
        id: 'cloud-starter',
        name: 'Cloud Starter',
        price: '199',
        priceUnit: '$',
        duration: '/month',
        description: 'Get your business started with essential cloud infrastructure.',
        features: [
          '100GB Storage',
          'Basic Compute Instances',
          'VPN Access',
          '24/5 Email Support',
          'Data Backup (Daily)',
          'Monitoring & Alerts',
        ],
      },
      {
        id: 'cloud-pro',
        name: 'Cloud Pro',
        price: '499',
        priceUnit: '$',
        duration: '/month',
        description: 'Scale your operations with enhanced cloud capabilities.',
        features: [
          '500GB Storage',
          'High-Performance Compute',
          'Dedicated IP',
          '24/7 Phone Support',
          'Disaster Recovery Plan',
          'Load Balancing',
          'Managed Database Service',
        ],
        recommended: true,
      },
      {
        id: 'cloud-enterprise',
        name: 'Cloud Enterprise',
        price: 'Custom',
        priceUnit: '',
        duration: '',
        description: 'Comprehensive cloud management for large enterprises.',
        features: [
          'Unlimited Storage',
          'Serverless Architecture',
          'Hybrid Cloud Integration',
          'Dedicated Cloud Engineer',
          'Advanced Security & Compliance',
          'Cost Optimization',
          'DevOps Automation',
          'Global CDN',
        ],
      },
    ],
  },
  {
    id: 'managed-it',
    name: 'Managed IT Services',
    plans: [
      {
        id: 'essential-support',
        name: 'Essential Support',
        price: '149',
        priceUnit: '$',
        duration: '/month',
        description: 'Basic remote support and monitoring for small teams.',
        features: [
          'Remote Helpdesk (Business Hours)',
          'Proactive Monitoring',
          'Antivirus Management',
          'Patch Management',
          'Network Monitoring',
          'Security Awareness Training (Basic)',
        ],
      },
      {
        id: 'premium-support',
        name: 'Premium Support',
        price: '399',
        priceUnit: '$',
        duration: '/month',
        description: 'Comprehensive IT management with priority response.',
        features: [
          '24/7 Remote Helpdesk',
          'On-site Support (Limited)',
          'Advanced Threat Detection',
          'Data Recovery Services',
          'Cloud Infrastructure Management',
          'Compliance Consulting (Basic)',
          'IT Strategy Consulting',
        ],
        recommended: true,
      },
      {
        id: 'enterprise-it',
        name: 'Enterprise IT Solutions',
        price: 'Custom',
        priceUnit: '',
        duration: '',
        description: 'Full-scale outsourced IT department for large organizations.',
        features: [
          'Dedicated IT Team',
          'Custom SLA',
          'Advanced Cybersecurity',
          'DRP & BCP Implementation',
          'Software Development Support',
          'Hardware Procurement & Lifecycle Management',
          'Virtual CIO Services',
          'Global Support',
        ],
      },
    ],
  },
];

// Helper icon for checkmark (using inline SVG for simplicity)
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-green-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

// Helper icon for plus (for comparison table toggles)
const PlusIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
  </svg>
);

// Helper icon for minus (for comparison table toggles)
const MinusIcon = () => (
  <svg
    className="w-4 h-4 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
  </svg>
);

// Main Application Component
export default function App() {
  // State for active IT service tab
  const [activeServiceId, setActiveServiceId] = useState<string>(itServicesData[0].id);
  // State to toggle between card view and comparison view
  const [isComparisonView, setIsComparisonView] = useState<boolean>(false);
  // State to manage which plans are selected for comparison view
  const [selectedComparisonPlanIds, setSelectedComparisonPlanIds] = useState<Set<string>>(new Set());

  // Get the currently active IT service and its plans
  const activeService = itServicesData.find(service => service.id === activeServiceId);
  const plansForActiveService = activeService ? activeService.plans : [];

  // Reset selected comparison plans when the active service changes
  useEffect(() => {
    setSelectedComparisonPlanIds(new Set());
  }, [activeServiceId]);

  // Handle toggling plans for comparison
  const handleTogglePlanForComparison = useCallback((planId: string) => {
    setSelectedComparisonPlanIds(prevSelected => {
      const newSet = new Set(prevSelected);
      if (newSet.has(planId)) {
        newSet.delete(planId);
      } else {
        // Limit to 3 plans for comparison readability if desired, or allow all
        // if (newSet.size < 3) { // Example limit
        newSet.add(planId);
        // }
      }
      return newSet;
    });
  }, []);

  // Extract all unique features across all plans for the active service
  const allUniqueFeatures: string[] = Array.from(
    new Set(plansForActiveService.flatMap(plan => plan.features))
  ).sort(); // Sort features alphabetically for consistency

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-50 font-inter flex flex-col items-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Background glowing particles (optional, visual flair) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-3/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12 mt-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse-light">
            Empower Your Business. Choose Your Plan.
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Discover tailored IT solutions designed to propel your success.
            Select the perfect package for your needs, from foundational support to advanced digital transformation.
          </p>
        </header>

        {/* Service Category Tabs */}
        <nav className="flex justify-center mb-12 flex-wrap gap-3">
          {itServicesData.map(service => (
            <button
              key={service.id}
              onClick={() => setActiveServiceId(service.id)}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out
                ${activeServiceId === service.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg shadow-blue-500/50 transform scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75`}
            >
              {service.name}
            </button>
          ))}
        </nav>

        {/* View Toggle Button */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex items-center p-1 rounded-full bg-gray-800 border border-gray-700 shadow-inner">
            <button
              onClick={() => setIsComparisonView(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                ${!isComparisonView
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
                }`}
            >
              Card View
            </button>
            <button
              onClick={() => setIsComparisonView(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                ${isComparisonView
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
                }`}
            >
              Comparison View
            </button>
          </div>
        </div>

        {/* Pricing Display Area - Conditional Rendering */}
        {isComparisonView ? (
          <ComparisonView
            plans={plansForActiveService}
            allUniqueFeatures={allUniqueFeatures}
            selectedComparisonPlanIds={selectedComparisonPlanIds}
            onTogglePlan={handleTogglePlanForComparison}
          />
        ) : (
          <CardView plans={plansForActiveService} />
        )}
      </div>

      {/* Tailwind Custom Animations */}
      <style>{`
        @keyframes pulse-light {
          0%, 100% { text-shadow: 0 0 5px rgba(129, 230, 217, 0.5), 0 0 10px rgba(129, 230, 217, 0.3); }
          50% { text-shadow: 0 0 10px rgba(129, 230, 217, 0.7), 0 0 20px rgba(129, 230, 217, 0.5); }
        }
        .animate-pulse-light {
          animation: pulse-light 3s ease-in-out infinite;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.59, 1);
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}

// Card View Component
const CardView: React.FC<{ plans: Plan[] }> = ({ plans }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {plans.map(plan => (
        <div
          key={plan.id}
          className={`relative bg-gray-800 rounded-xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300 ease-in-out
            ${plan.recommended
              ? 'border-2 border-purple-500 ring-2 ring-purple-500 ring-opacity-50'
              : 'border border-gray-700'
            }`}
        >
          {plan.recommended && (
            <span className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold uppercase rounded-full shadow-lg transform rotate-6">
              Recommended
            </span>
          )}
          <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {plan.name}
          </h3>
          <p className="text-gray-400 mb-6 text-sm">{plan.description}</p>
          <div className="flex items-baseline mb-6">
            <span className="text-5xl font-extrabold text-white">
              {plan.priceUnit}{plan.price}
            </span>
            {plan.duration && <span className="text-gray-400 text-lg ml-2">{plan.duration}</span>}
          </div>
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <CheckIcon />
                <span className="ml-3">{feature}</span>
              </li>
            ))}
          </ul>
          <button className="w-full py-3 rounded-lg text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75">
            {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
          </button>
        </div>
      ))}
    </div>
  );
};

// Comparison View Component
const ComparisonView: React.FC<{
  plans: Plan[];
  allUniqueFeatures: string[];
  selectedComparisonPlanIds: Set<string>;
  onTogglePlan: (planId: string) => void;
}> = ({ plans, allUniqueFeatures, selectedComparisonPlanIds, onTogglePlan }) => {
  const selectedPlans = plans.filter(plan => selectedComparisonPlanIds.has(plan.id));

  // Determine the column count for responsive grid
  const columnCount = selectedPlans.length + 1; // Features column + selected plan columns

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Compare Plans</h2>

      {/* Plan Selection Toggles */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {plans.map(plan => (
          <button
            key={plan.id}
            onClick={() => onTogglePlan(plan.id)}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 group
              ${selectedComparisonPlanIds.has(plan.id)
                ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75`}
          >
            {selectedComparisonPlanIds.has(plan.id) ? <MinusIcon /> : <PlusIcon />}
            <span className="ml-2">{plan.name}</span>
          </button>
        ))}
      </div>

      {selectedPlans.length === 0 ? (
        <p className="text-center text-gray-400 text-lg py-10">
          Select up to {plans.length} plans above to compare their features.
        </p>
      ) : (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-700 rounded-lg">
              <tr>
                <th className="p-4 text-gray-300 font-semibold text-lg min-w-[200px] sticky left-0 bg-gray-700 z-20 rounded-tl-lg">
                  Features
                </th>
                {selectedPlans.map(plan => (
                  <th
                    key={plan.id}
                    className="p-4 text-white font-semibold text-lg text-center min-w-[150px] relative
                    bg-gradient-to-br from-gray-700 to-gray-800 border-l border-gray-600"
                  >
                    {plan.name}
                    <div className="text-sm text-gray-300 mt-1">
                      {plan.priceUnit}{plan.price}{plan.duration}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allUniqueFeatures.map((feature, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 transition-colors duration-200`}
                >
                  <td className="p-4 border-t border-gray-700 text-gray-200 sticky left-0 bg-inherit z-10 min-w-[200px]">
                    {feature}
                  </td>
                  {selectedPlans.map(plan => (
                    <td
                      key={plan.id}
                      className="p-4 border-t border-l border-gray-700 text-center"
                    >
                      {plan.features.includes(feature) ? (
                        <CheckIcon />
                      ) : (
                        <span className="text-gray-600 text-xl font-bold">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
