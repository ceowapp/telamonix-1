import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Code, 
  Smartphone, 
  Database, 
  Zap, 
  Building2, 
  Workflow, 
  Brain, 
  Wifi, 
  Gamepad2, 
  Bitcoin, 
  QrCode,
  Copy,
  Network,
  GitBranch,
  Cloud,
  Server,
  Shield,
  Cpu,
  Atom
} from 'lucide-react';
import { BsHeadsetVr } from 'react-icons/bs';
import PDFContainer from './PDFContainer';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Tabs, Tab } from "@nextui-org/react";

const services = [
  { id: "web", title: 'Web App Development', description: 'Custom web applications tailored to your needs', icon: Code, videoId: 'dQw4w9WgXcQ' },
  { id: "mobile", title: 'Mobile App Development', description: 'Native and cross-platform mobile solutions', icon: Smartphone, videoId: 'dQw4w9WgXcQ' },
  { id: "lowcode", title: 'Low-code/No-code Development', description: 'Rapid application development with minimal coding', icon: Zap, videoId: 'dQw4w9WgXcQ' },
  { id: "data", title: 'Data Analytics', description: 'Unlock insights from your data', icon: Database, videoId: 'dQw4w9WgXcQ' },
  { id: "automation", title: 'Business Automation', description: 'Streamline your operations', icon: Zap, videoId: 'dQw4w9WgXcQ' },
  { id: "twins", title: 'Digital Twins', description: 'Virtual representations of physical assets or systems', icon: Copy, videoId: 'dQw4w9WgXcQ' },
  { id: "microservices", title: 'Microservices Architecture', description: 'Modular and scalable application design', icon: Network, videoId: 'dQw4w9WgXcQ' },
  { id: "devops", title: 'DevOps and CI/CD', description: 'Streamlined development and deployment processes', icon: GitBranch, videoId: 'dQw4w9WgXcQ' },
  { id: "cloud", title: 'Cloud Computing', description: 'Scalable and flexible cloud-based solutions', icon: Cloud, videoId: 'dQw4w9WgXcQ' },
  { id: "serverless", title: 'Serverless Computing', description: 'Build and run applications without managing servers', icon: Server, videoId: 'dQw4w9WgXcQ' },
  { id: "cybersecurity", title: 'Cybersecurity', description: 'Protect your digital assets and data', icon: Shield, videoId: 'dQw4w9WgXcQ' },
  { id: "robotics", title: 'Robotics Development', description: 'Design and programming of robotic systems', icon: Cpu, videoId: 'dQw4w9WgXcQ' },
  { id: "quantum", title: 'Quantum Computing', description: 'Harnessing quantum mechanics for computational power', icon: Atom, videoId: 'dQw4w9WgXcQ' },
  { id: "bim", title: 'BIM Technology', description: 'Advanced building information modeling', icon: Building2, videoId: 'dQw4w9WgXcQ' },
  { id: "api", title: 'API Integration', description: 'Seamless connection of systems', icon: Workflow, videoId: 'dQw4w9WgXcQ' },
  { id: "ai", title: 'AI Services', description: 'AI model training and applications', icon: Brain, videoId: 'dQw4w9WgXcQ' },
  { id: "iot", title: 'IoT (Internet of Things)', description: 'Connect and control smart devices', icon: Wifi, videoId: 'dQw4w9WgXcQ' },
  { id: "gamification", title: 'Gamification', description: 'Engage users through game mechanics', icon: Gamepad2, videoId: 'dQw4w9WgXcQ' },
  { id: "blockchain", title: 'Blockchain', description: 'Secure and decentralized solutions', icon: Bitcoin, videoId: 'dQw4w9WgXcQ' },
  { id: "qr", title: 'QR Technology', description: 'Quick Response code solutions', icon: QrCode, videoId: 'dQw4w9WgXcQ' },
  { id: "vr", title: 'VR & AR', description: 'Immersive virtual and augmented experiences', icon: BsHeadsetVr, videoId: 'dQw4w9WgXcQ' },
];

const ServiceContent = memo(({ serviceId }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const contentMap = {
    web: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.h3 
          className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Web App Development
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg leading-relaxed"
        >
          Our web application development service delivers cutting-edge, responsive, and scalable solutions tailored to your unique business needs. We leverage the latest technologies and best practices to create powerful, user-friendly web applications that drive growth and enhance user engagement.
        </motion.p>
        <Tabs 
          aria-label="Web App Development Features" 
          color="primary" 
          variant="underlined"
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
          className="mt-6"
        >
          <Tab key="frontend" title="Frontend">
            <AnimatePresence mode="wait">
              <motion.ul
                key="frontend"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>Responsive design for seamless experiences across all devices</li>
                <li>Modern frameworks like React, Vue, or Angular for dynamic UIs</li>
                <li>Progressive Web App (PWA) capabilities for offline functionality</li>
                <li>Accessibility compliance (WCAG) for inclusive design</li>
              </motion.ul>
            </AnimatePresence>
          </Tab>
          <Tab key="backend" title="Backend">
            <AnimatePresence mode="wait">
              <motion.ul
                key="backend"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>Scalable server-side architectures using Node.js, Python, or Java</li>
                <li>RESTful API design and implementation</li>
                <li>Database integration (SQL and NoSQL solutions)</li>
                <li>Cloud deployment and serverless computing options</li>
              </motion.ul>
            </AnimatePresence>
          </Tab>
          <Tab key="features" title="Key Features">
            <AnimatePresence mode="wait">
              <motion.ul
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>Single Page Application (SPA) development for smooth user experiences</li>
                <li>Real-time data synchronization and WebSocket integration</li>
                <li>Third-party API integrations for extended functionality</li>
                <li>Robust security measures including encryption and authentication</li>
              </motion.ul>
            </AnimatePresence>
          </Tab>
        </Tabs>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="text-2xl font-semibold mb-4">Our Web App Development Process</h4>
          <ol className="list-decimal pl-5 space-y-2">
            {[
              "Requirements gathering and analysis",
              "UI/UX design and prototyping",
              "Frontend and backend development",
              "Quality assurance and testing",
              "Deployment and ongoing support"
            ].map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {step}
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </motion.div>
    ),
    mobile: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.h3 
          className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Mobile App Development
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg leading-relaxed"
        >
          Our mobile app development service creates innovative, high-performance applications for iOS and Android platforms. We focus on delivering intuitive user experiences, robust functionality, and seamless integration with device features to ensure your app stands out in the competitive mobile landscape.
        </motion.p>
        <Tabs
          aria-label="Mobile App Development Options"
          color="primary"
          variant="underlined"
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
          className="mt-6"
        >
          <Tab key="native" title="Native Apps">
            <AnimatePresence mode="wait">
              <motion.ul
                key="native"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>iOS development using Swift and SwiftUI</li>
                <li>Android development with Kotlin and Jetpack Compose</li>
                <li>Optimized performance and native UI components</li>
                <li>Full access to device features and APIs</li>
              </motion.ul>
            </AnimatePresence>
          </Tab>
          <Tab key="cross-platform" title="Cross-Platform">
            <AnimatePresence mode="wait">
              <motion.ul
                key="cross-platform"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>React Native for code reusability across platforms</li>
                <li>Flutter for beautiful, natively compiled applications</li>
                <li>Xamarin for .NET and C# based cross-platform development</li>
                <li>Efficient development process with shared codebase</li>
              </motion.ul>
            </AnimatePresence>
          </Tab>
          <Tab key="features" title="Key Features">
            <AnimatePresence mode="wait">
              <motion.ul
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>Offline functionality and data synchronization</li>
                <li>Push notifications and real-time updates</li>
                <li>Integration with device features (camera, GPS, sensors)</li>
                <li>Secure authentication and data encryption</li>
              </motion.ul>
            </AnimatePresence>
          </Tab>
        </Tabs>
      </motion.div>
    ),
    data: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.h3 
          className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Data Analytics
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg leading-relaxed"
        >
          Our data analytics service helps you unlock valuable insights from your data, enabling informed decision-making and strategic planning. We employ advanced analytics techniques and cutting-edge tools to transform raw data into actionable intelligence.
        </motion.p>
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/KOwu8sML2dQ?si=alHltttBT77Za5Ct"
            title="BIM Technology Overview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        <Tabs
          aria-label="Data Analytics Services"
          color="primary"
          variant="underlined"
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
          className="mt-6"
        >
          <Tab key="descriptive" title="Descriptive Analytics">
            <AnimatePresence mode="wait">
              <motion.ul
                key="descriptive"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>Historical data analysis and reporting</li>
                <li>Data visualization and dashboard creation</li>
                <li>KPI tracking and performance metrics</li>
                <li>Trend identification and pattern recognition</li>
              </motion.ul>
            </AnimatePresence>
          </Tab>
          <Tab key="predictive" title="Predictive Analytics">
            <AnimatePresence mode="wait">
              <motion.ul
                key="predictive"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>Machine learning models for forecasting</li>
                <li>Customer behavior prediction</li>
                <li>Risk assessment and fraud detection</li>
                <li>Demand forecasting and inventory optimization</li>
              </motion.ul>
            </AnimatePresence>
          </Tab>
          <Tab key="prescriptive" title="Prescriptive Analytics">
            <AnimatePresence mode="wait">
              <motion.ul
                key="prescriptive"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>Optimization algorithms for decision-making</li>
                <li>Scenario analysis and simulation</li>
                <li>Recommendation systems</li>
                <li>Automated decision support systems</li>
              </motion.ul>
            </AnimatePresence>
          </Tab>
        </Tabs>
      </motion.div>
    ),
    automation: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.h3 
          className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Business Automation
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg leading-relaxed"
        >
          Our business automation services streamline your operations, increase efficiency, and reduce manual tasks. We implement intelligent automation solutions that transform your business processes and drive productivity.
        </motion.p>
        <Tabs
          aria-label="Business Automation Services"
          color="primary"
          variant="underlined"
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
          className="mt-6"
        >
          <Tab key="rpa" title="Robotic Process Automation (RPA)">
            <AnimatePresence mode="wait">
              <motion.ul
                key="rpa"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>Automated data entry and processing</li>
                <li>Workflow automation for repetitive tasks</li>
                <li>Integration with existing systems and applications</li>
                <li>Scalable RPA solutions for enterprise-wide deployment</li>
              </motion.ul>
            </AnimatePresence>
          </Tab>
          <Tab key="bpm" title="Business Process Management (BPM)">
            <AnimatePresence mode="wait">
              <motion.ul
                key="bpm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>Process modeling and optimization</li>
                <li>Workflow design and implementation</li>
                <li>Business rules engine integration</li>
                <li>Performance monitoring and analytics</li>
              </motion.ul>
            </AnimatePresence>
          </Tab>
        <Tab key="ai" title="AI-powered Automation">
          <AnimatePresence mode="wait">
            <motion.ul
              key="ai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              <li>Machine learning for intelligent process automation</li>
              <li>Natural Language Processing for document analysis</li>
              <li>Predictive maintenance and anomaly detection</li>
              <li>Cognitive automation for complex decision-making</li>
            </motion.ul>
          </AnimatePresence>
        </Tab>
      </Tabs>
    </motion.div>
  ),
  bim: (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.h3 
        className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        BIM Technology
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg leading-relaxed"
      >
        Our Building Information Modeling (BIM) technology services revolutionize the architecture, engineering, and construction industries. We provide cutting-edge BIM solutions that enhance collaboration, improve efficiency, and reduce costs throughout the building lifecycle.
      </motion.p>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/MQCPO48Wkak?si=ZplLVjafORNRlkFr"
          title="BIM Technology Overview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <Tabs
        aria-label="BIM Technology Services"
        color="primary"
        variant="underlined"
        selectedKey={activeTab}
        onSelectionChange={setActiveTab}
        className="mt-6"
      >
        <Tab key="modeling" title="3D Modeling">
          <AnimatePresence mode="wait">
            <motion.ul
              key="modeling"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              <li>Detailed 3D modeling of buildings and infrastructure</li>
              <li>Parametric modeling for easy modifications</li>
              <li>Clash detection and resolution</li>
              <li>Integration of MEP systems in the model</li>
            </motion.ul>
          </AnimatePresence>
        </Tab>
        <Tab key="collaboration" title="Collaboration">
          <AnimatePresence mode="wait">
            <motion.ul
              key="collaboration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              <li>Cloud-based BIM collaboration platforms</li>
              <li>Real-time model sharing and updates</li>
              <li>Version control and change management</li>
              <li>Role-based access control for team members</li>
            </motion.ul>
          </AnimatePresence>
        </Tab>
        <Tab key="analysis" title="Analysis & Simulation">
          <AnimatePresence mode="wait">
            <motion.ul
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              <li>Energy performance analysis</li>
              <li>Structural analysis and simulation</li>
              <li>Daylight and solar studies</li>
              <li>Cost estimation and quantity takeoffs</li>
            </motion.ul>
          </AnimatePresence>
        </Tab>
      </Tabs>
      <PDFContainer pdfUrl="/global/pdfs/OUR_BIM_TEAM.pdf" />
    </motion.div>
  ),
  api: (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.h3 
        className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        API Integration
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg leading-relaxed"
      >
        Our API integration services enable seamless connectivity between different systems and applications. We design, implement, and manage robust API solutions that facilitate data exchange, enhance functionality, and drive digital transformation.
      </motion.p>
      <Tabs
        aria-label="API Integration Services"
        color="primary"
        variant="underlined"
        selectedKey={activeTab}
        onSelectionChange={setActiveTab}
        className="mt-6"
      >
        <Tab key="design" title="API Design">
          <AnimatePresence mode="wait">
            <motion.ul
              key="design"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              <li>RESTful and GraphQL API design</li>
              <li>API versioning and documentation</li>
              <li>Security and authentication protocols</li>
              <li>Performance optimization for high-load APIs</li>
            </motion.ul>
          </AnimatePresence>
        </Tab>
        <Tab key="development" title="API Development">
          <AnimatePresence mode="wait">
            <motion.ul
              key="development"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              <li>Custom API development for various platforms</li>
              <li>Microservices architecture implementation</li>
              <li>API testing and quality assurance</li>
              <li>Continuous integration and deployment (CI/CD) for APIs</li>
            </motion.ul>
          </AnimatePresence>
        </Tab>
        <Tab key="management" title="API Management">
          <AnimatePresence mode="wait">
            <motion.ul
              key="management"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              <li>API gateway implementation</li>
              <li>Traffic management and rate limiting</li>
              <li>Analytics and monitoring for API usage</li>
              <li>Developer portal for API documentation and testing</li>
            </motion.ul>
          </AnimatePresence>
        </Tab>
      </Tabs>
    </motion.div>
  ),

  vr: (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.h3 
        className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        VR & AR
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg leading-relaxed"
      >
        Our Virtual Reality (VR) and Augmented Reality (AR) services create immersive and interactive experiences that revolutionize various industries. From entertainment to education and training, we leverage cutting-edge VR and AR technologies to bring your ideas to life.
      </motion.p>
      <Tabs
        aria-label="VR & AR Services"
        color="primary"
        variant="underlined"
        selectedKey={activeTab}
        onSelectionChange={setActiveTab}
        className="mt-6"
      >
        <Tab key="vr" title="Virtual Reality">
          <AnimatePresence mode="wait">
            <motion.ul
              key="vr"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              <li>Immersive VR experiences for various platforms</li>
              <li>360-degree video production and integration</li>
              <li>VR training simulations for industries</li>
              <li>Virtual showrooms and product demonstrations</li>
            </motion.ul>
          </AnimatePresence>
        </Tab>
        <Tab key="ar" title="Augmented Reality">
          <AnimatePresence mode="wait">
            <motion.ul
              key="ar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              <li>AR mobile applications development</li>
              <li>AR for marketing and advertising campaigns</li>
              <li>Industrial AR solutions for maintenance and repair</li>
              <li>AR-enhanced educational content</li>
            </motion.ul>
          </AnimatePresence>
        </Tab>
        <Tab key="mixed" title="Mixed Reality">
          <AnimatePresence mode="wait">
            <motion.ul
              key="mixed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              <li>Development for Microsoft HoloLens and similar devices</li>
              <li>Interactive 3D holographic experiences</li>
              <li>Spatial computing applications</li>
              <li>Collaborative mixed reality environments</li>
            </motion.ul>
          </AnimatePresence>
        </Tab>
      </Tabs>
    </motion.div>
  ),
};

  return contentMap[serviceId] || <div>Content not available</div>;
});

const ServiceCard = ({ service, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card
          isPressable
          onPress={handleOpen}
          className="w-full h-[300px] group overflow-hidden cursor-pointer"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <CardHeader className="absolute z-20 top-1 flex-col items-start">
            <motion.p
              className="text-tiny text-white/60 uppercase font-bold"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {service.title}
            </motion.p>
            <motion.h4
              className="text-white/90 font-medium text-xl text-start"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {service.description}
            </motion.h4>
          </CardHeader>
          <Image
            removeWrapper
            alt={service.title}
            className="z-0 w-full h-full object-cover transition-transform opacity-60 duration-300 group-hover:scale-110"
            src={`/global/images/service/${service.id.toLowerCase().replace(/ /g, '-')}.png`}
          />
          <CardFooter className="absolute bottom-0 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
            <motion.div
              className="flex flex-grow gap-2 items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <service.icon className="w-10 h-11 text-white" />
              <p className="text-tiny text-white/60">Learn More</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button
                radius="full"
                size="sm"
                color="primary"
                className="bg-white text-black hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Explore
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
      <ServiceModal
        title={service.title}
        content={<ServiceContent serviceId={service.id} />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onClose={handleClose}
      />
    </>
  );
}

const ServiceModal = ({ title, content, isOpen, onOpenChange, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      size="full"
      scrollBehavior="inside"
      aria-labelledby="modal-title"
      backdrop="blur"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }
      }}
      classNames={{
        wrapper: 'z-[99999]',
        body: 'py-6',
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
        header: 'border-b-[1px] border-[#292f46]',
        footer: 'border-t-[1px] border-[#292f46]',
        closeButton: 'hover:bg-white/5 active:bg-white/10',
      }}
    >
      <ModalContent>
       {(onClose) => (
        <>
          <ModalHeader>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          </ModalHeader>
          <ModalBody>
            <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              <div>
                {content}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button auto flat color="error" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      )}
      </ModalContent>
    </Modal>
  );
}

const ScrollBanner = () => {
  const items = ["AI-Powered", "Secure", "Scalable", "Customizable", "Efficient", "Collaborative"];
  
  return (
    <div className="relative w-full overflow-hidden py-8 top-8 bg-black rounded-md">
      <div className="flex animate-scroll">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex-shrink-0 mx-8 h-16 flex items-center relative">
            <div className="text-white font-bold bg-white/30 backdrop-blur-lg rounded-full px-4 py-2 z-10">
              {item}
            </div>
            <svg className="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2" viewBox="0 0 100 50">
              <path 
                d="M0,25 Q25,0 50,25 T100,25" 
                fill="none" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="2"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 50 25"
                  to="360 50 25"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
              <circle cx="0" cy="25" r="3" fill="white">
                <animate
                  attributeName="cx"
                  from="0"
                  to="100"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="100" cy="25" r="3" fill="white">
                <animate
                  attributeName="cx"
                  from="100"
                  to="0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const [visibleServices, setVisibleServices] = useState(8);

  return (
    <section id="services" className="py-20 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {services.slice(0, visibleServices).map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </AnimatePresence>
        </div>
        {visibleServices < services.length && (
          <div className="text-center mt-12">
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVisibleServices(prev => Math.min(prev + 4, services.length))}
            >
              Load More
            </motion.button>
          </div>
        )}
        <ScrollBanner />
      </div>
    </section>
  );
};

export default ServicesSection;
