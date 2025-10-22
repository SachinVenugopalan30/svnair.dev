import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';

interface NavItem {
  name: string;
  path: string;
}

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  const navItems: NavItem[] = [
    { name: 'About', path: '/#about' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Photography', path: '/photography' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };

    // Set initial state based on current scroll position
    const initializeNavigation = () => {
      setScrolled(window.scrollY > 20);
      lastScrollY.current = window.scrollY;
      setIsLoaded(true);
    };

    // Initialize after a brief delay to ensure proper animation
    const timeoutId = setTimeout(initializeNavigation, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      const targetId = path.substring(2); // Remove '/#'
      
      // Check if we're currently on the home page
      if (window.location.pathname === '/') {
        // We're on the home page, just scroll to the section
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navHeight = 100; // Approximate height of the navigation
          const targetPosition = targetElement.offsetTop - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // We're on a different page, navigate to home page with hash
        window.location.href = path;
      }
      setIsOpen(false); // Close mobile menu
    }
  };

  const isActive = (path: string): boolean => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === path;
    }
    return false;
  };

  return (
    <nav className={`fixed left-4 right-4 z-50 transition-all duration-500 ease-out ${
      !isLoaded 
        ? 'top-2 opacity-0 -translate-y-4' 
        : (scrolled ? 'top-4 opacity-100 translate-y-0' : 'top-8 opacity-100 translate-y-0')
    }`}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ease-out ${
        !isLoaded ? 'scale-95 opacity-0' :
        scrolled 
          ? 'glass border border-white/20 rounded-2xl backdrop-blur-xl shadow-2xl scale-100 opacity-100' 
          : 'bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-lg scale-100 opacity-100'
      }`}>
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <div className="flex items-center overflow-visible flex-shrink-0" style={{ minWidth: '300px' }}>
            <a 
              href="/" 
              className="no-underline flex items-center"
              style={{ textDecoration: 'none' }}
            >
              <Logo size={32} variant="full" className="max-w-none" />
            </a>
          </div>

          {/* Desktop Navigation - Separate Pills */}
          <div className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border no-underline bg-raisin-black/80 border-ivory/30 hover:bg-gradient-to-r hover:from-scarlet/90 hover:to-scarlet hover:border-scarlet/60 hover:shadow-xl hover:shadow-scarlet/20 hover:scale-105"
                style={{ color: '#EFF6E0', textDecoration: 'none' }}
              >
                <span className="tracking-wide font-medium">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 flex items-center justify-center hover:text-scarlet focus:outline-none focus:ring-2 focus:ring-scarlet/50 transition-all duration-300 bg-transparent border-none p-0"
              style={{ color: '#EFF6E0', background: 'transparent', border: 'none' }}
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="mx-4 mt-3 mb-1 p-4 glass rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl">
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="block px-5 py-3.5 rounded-2xl text-base font-medium transition-all duration-300 hover:text-white bg-raisin-black/60 hover:bg-gradient-to-r hover:from-scarlet/90 hover:to-scarlet border border-ivory/20 hover:border-scarlet/40 hover:shadow-lg hover:shadow-scarlet/20"
                style={{ color: '#EFF6E0', animationDelay: `${index * 50}ms` }}
              >
                <span className="tracking-wide">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
