import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicGreeting: React.FC = () => {
  const [greeting, setGreeting] = useState('Hello');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    'Developer',
    'Data Scientist', 
    'Photographer',
    'Passionate Cook',
  ];

  // Calculate the width needed for the longest role
  const longestRole = roles.reduce((a, b) => a.length > b.length ? a : b);
  const estimatedWidth = longestRole.length * 0.65; // Approximate character width in em

  useEffect(() => {
    // Set greeting based on time of day
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning,');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good Afternoon,');
    } else {
      setGreeting('Good Evening,');
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const startRotation = () => {
      interval = setInterval(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }, 3000);
    };

    // Handle visibility change to restart animation when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, clear interval
        if (interval) clearInterval(interval);
      } else {
        // Tab is visible, restart rotation immediately
        if (interval) clearInterval(interval);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length); // Immediate change
        startRotation();
      }
    };

    // Start initial rotation
    startRotation();

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (interval) clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [roles.length]);

  const RotatingText = ({ text }: { text: string }) => {
    const letters = text.split('');
    
    return (
      <motion.span
        className="inline-block whitespace-nowrap text-left w-full"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={`${text}-${index}`}
            className="inline-block"
            variants={{
              hidden: { 
                y: 30, 
                opacity: 0,
                rotateX: -90,
                scale: 0.8
              },
              visible: { 
                y: 0, 
                opacity: 1,
                rotateX: 0,
                scale: 1
              },
              exit: {
                y: -30,
                opacity: 0,
                rotateX: 90,
                scale: 0.8
              }
            }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.01,
              type: "spring",
              stiffness: 120,
              damping: 12
            }}
            style={{
              background: 'linear-gradient(90deg, #74A4BC 0%, #B6D6CC 25%, #F1FEC6 50%, #B6D6CC 75%, #74A4BC 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmerSlow 4s ease-in-out infinite'
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  return (
    <div className="space-y-4 w-full max-w-lg">
      <h1 className="font-bold leading-tight">
        <span className="block text-lg sm:text-xl lg:text-2xl mb-2" style={{ color: '#368A83' }}>
          {greeting}
        </span>
        <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl" style={{ color: '#CCD6F6' }}>
          I'm Sachin
        </span>
      </h1>
      
      <div className="text-lg sm:text-xl lg:text-2xl font-semibold flex items-center flex-wrap gap-2 mt-6 mb-12">
        <span className="text-shimmer">
          I'm a
        </span>
        <div 
          className="relative px-4 py-2 rounded-lg font-bold overflow-hidden inline-block"
          style={{
            background: 'linear-gradient(135deg, rgba(116, 164, 188, 0.08) 0%, rgba(182, 214, 204, 0.12) 50%, rgba(241, 254, 198, 0.06) 100%)',
            border: '1px solid rgba(116, 164, 188, 0.25)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 25px rgba(116, 164, 188, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            width: `${estimatedWidth}em`,
            minHeight: '2rem',
            borderRadius: '0.75rem'
          }}
        >
          <div className="flex items-center h-full">
            <AnimatePresence mode="wait" initial={false}>
              <RotatingText key={`${currentRoleIndex}-${roles[currentRoleIndex]}`} text={roles[currentRoleIndex]} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicGreeting;
