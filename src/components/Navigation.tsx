import { useState, useEffect } from 'react';
import Logo from './Logo';

interface NavItem {
  name: string;
  path: string;
}

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Photography', path: '/photography' },
    { name: 'Resume & Contact', path: '/resume-contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Set initial state based on current scroll position
    const initializeNavigation = () => {
      setScrolled(window.scrollY > 20);
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

  const isActive = (path: string): boolean => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === path;
    }
    return false;
  };

  return (
    <nav className={`fixed left-4 right-4 z-50 transition-all duration-700 ease-out ${
      !isLoaded ? 'top-2 opacity-0 transform -translate-y-4' : 
      scrolled ? 'top-4 opacity-100 transform translate-y-0' : 'top-8 opacity-100 transform translate-y-0'
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
                className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden group border backdrop-blur-md no-underline bg-white/10 border-white/20 hover:bg-gradient-to-r hover:from-scarlet/90 hover:to-scarlet hover:border-scarlet/60 hover:shadow-xl hover:shadow-scarlet/20 hover:scale-105"
                style={{ color: '#EFF6E0', textDecoration: 'none' }}
              >
                {/* Animated background gradient - only on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-scarlet/20 via-scarlet/40 to-scarlet/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full blur-sm"></div>
                
                {/* Shimmer effect - only on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-full"></div>
                </div>
                
                {/* Glowing border effect - only on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(255, 58, 32, 0.3), transparent)',
                    padding: '1px',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-transparent"></div>
                </div>
                
                <span className="relative z-10 tracking-wide font-medium">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-11 h-11 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:text-scarlet hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-scarlet/50 transition-all duration-300 group"
              style={{ color: '#EFF6E0' }}
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-scarlet/10 to-ash-gray/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="h-5 w-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="mx-4 mt-3 mb-1 p-4 glass rounded-2xl border border-white/20 backdrop-blur-xl">
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <a
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="group block px-5 py-3.5 rounded-2xl text-base font-medium transition-all duration-300 relative overflow-hidden hover:text-white bg-white/5 hover:bg-gradient-to-r hover:from-scarlet/90 hover:to-scarlet border border-transparent hover:border-scarlet/40 hover:shadow-lg hover:shadow-scarlet/20"
                style={{ color: '#EFF6E0', animationDelay: `${index * 50}ms` }}
              >
                {/* Mobile pill background effect - only on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-scarlet/80 to-scarlet rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Mobile shimmer effect - only on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                </div>
                
                <span className="relative z-10 tracking-wide">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
