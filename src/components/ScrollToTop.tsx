import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    // Check initial position
    toggleVisibility();
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!mounted || !isVisible) return null;

  const button = (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-4 rounded-full text-white shadow-2xl hover:shadow-scarlet/50 transition-all duration-300 border-2 border-scarlet/50 backdrop-blur-sm hover:scale-110 active:scale-90 group"
      aria-label="Scroll to top"
      style={{
        background: 'linear-gradient(135deg, #FF3A20 0%, #e6341c 100%)',
        zIndex: 9999,
        position: 'fixed',
      }}
    >
      {/* Arrow icon */}
      <svg
        className="w-6 h-6 relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M12 19V5m0 0l-7 7m7-7l7 7"
        />
      </svg>
    </button>
  );

  // Try to use portal if available, otherwise render normally
  const portalRoot = document.getElementById('scroll-to-top-portal') || document.body;
  return createPortal(button, portalRoot);
};

export default ScrollToTop;
