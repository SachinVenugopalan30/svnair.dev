// Enhanced smooth scrolling utility for Astro
export interface SmoothScrollOptions {
  duration?: number;
  offset?: number;
  easing?: 'easeInOutCubic' | 'easeOutQuart' | 'easeInOutQuart';
}

export const smoothScrollTo = (target: string | Element, options: SmoothScrollOptions = {}): void => {
  const {
    duration = 800,
    offset = 80, // Account for fixed header
    easing = 'easeInOutCubic'
  } = options;

  let targetElement: Element | null;
  
  if (typeof target === 'string') {
    targetElement = document.querySelector(target);
  } else {
    targetElement = target;
  }

  if (!targetElement) return;

  const startPosition = window.pageYOffset;
  const targetPosition = (targetElement as HTMLElement).offsetTop - offset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  // Easing functions
  const easingFunctions: Record<string, (t: number) => number> = {
    easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeOutQuart: (t: number) => 1 - (--t) * t * t * t,
    easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
  };

  function animation(currentTime: number): void {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easingFunctions[easing](progress);
    
    window.scrollTo(0, startPosition + distance * ease);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
};

// Auto-setup for all anchor links on page
export const setupSmoothScrolling = (): void => {
  document.addEventListener('click', (e: MouseEvent) => {
    // Check if clicked element is an anchor link
    const target = e.target as Element | null;
    if (!target) return;
    
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    e.preventDefault();
    smoothScrollTo(href);
  });
};

// Initialize smooth scrolling when DOM is loaded
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSmoothScrolling);
  } else {
    setupSmoothScrolling();
  }
}
