// Client-side analytics initialization script
// This file gets the environment variables passed from the server

import { initAnalytics, trackVisit, getAnalyticsConfig } from './analytics.js';

// Initialize analytics when DOM is ready
const initializeAnalytics = () => {
  console.log('🚀 Analytics: Initializing...');
  const config = getAnalyticsConfig();
  
  console.log('📊 Analytics config:', {
    websiteId: config.websiteId ? config.websiteId.slice(0, 8) + '...' : 'missing',
    apiUrl: config.apiUrl || 'missing',
    enabled: config.enabled
  });
  
  if (config.enabled) {
    initAnalytics(config);
    // Track visit after a short delay to ensure page is fully loaded
    setTimeout(() => {
      trackVisit();
    }, 1000);
  } else {
    console.debug('⚠️ Analytics: Disabled or not configured');
  }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initializeAnalytics();
} else {
  document.addEventListener('DOMContentLoaded', initializeAnalytics);
}
