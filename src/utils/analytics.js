/**
 * Privacy-focused analytics utility for tracking unique website visits
 * Features:
 * - Bot detection and filtering
 * - Unique visitor tracking using hashed fingerprints
 * - Country-level geolocation
 * - No cookies or personal data collection
 */

class PrivateAnalytics {
  constructor(config) {
    this.config = config;
    this.hasTracked = false;
  }

  /**
   * Detects if the current visitor is likely a bot
   */
  isBot() {
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
      'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
      'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
      'whatsapp', 'telegrambot', 'applebot', 'crawler', 'spider',
      'bot', 'crawl', 'search', 'index', 'monitor', 'test', 'lighthouse',
      'gtmetrix', 'pingdom', 'uptimerobot', 'statuspage'
    ];

    // Check user agent for bot patterns
    const isBotUA = botPatterns.some(pattern => userAgent.includes(pattern));
    
    // Check for headless browsers
    const isHeadless = navigator.webdriver || 
                      window.phantom || 
                      window.callPhantom ||
                      window._phantom;

    // Check for automated testing environments
    const isAutomated = window.Cypress || 
                       window.selenium ||
                       window.webdriver;

    // Check for missing essential browser features
    const lacksFeatures = !navigator.cookieEnabled || 
                         !window.localStorage ||
                         !document.createElement;

    return isBotUA || isHeadless || isAutomated || lacksFeatures;
  }

  /**
   * Generates a unique visitor fingerprint without using personal data
   */
  generateVisitorHash() {
    const components = [
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      navigator.platform,
      navigator.hardwareConcurrency || 'unknown'
    ];

    // Create a simple hash
    const dataString = components.join('|');
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
      const char = dataString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    return Math.abs(hash).toString(36);
  }

  /**
   * Checks if this visitor has already been tracked today
   */
  hasVisitedToday() {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `analytics_visit_${today}`;
    const visitorHash = this.generateVisitorHash();
    
    try {
      const visitedHashes = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return visitedHashes.includes(visitorHash);
    } catch {
      return false;
    }
  }

  /**
   * Marks the current visitor as tracked for today
   */
  markAsVisited() {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `analytics_visit_${today}`;
    const visitorHash = this.generateVisitorHash();
    
    try {
      const visitedHashes = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!visitedHashes.includes(visitorHash)) {
        visitedHashes.push(visitorHash);
        localStorage.setItem(storageKey, JSON.stringify(visitedHashes));
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  /**
   * Sends tracking data to Umami
   */
  async sendTrackingData(data) {
    if (!this.config.enabled) return;

    try {
      await fetch(`${this.config.apiUrl}/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': navigator.userAgent,
        },
        body: JSON.stringify({
          website: this.config.websiteId,
          url: window.location.pathname,
          referrer: document.referrer,
          hostname: window.location.hostname,
          language: navigator.language,
          screen: `${screen.width}x${screen.height}`,
          ...data
        })
      });
    } catch (error) {
      // Silently fail - don't block the website if analytics fails
      console.debug('❌ Analytics tracking failed:', error);
    }
  }

  /**
   * Tracks a unique page visit
   */
  async trackVisit(pageName) {
    // Skip if already tracked in this session
    if (this.hasTracked) {
      console.debug('📊 Analytics: Already tracked in this session');
      return;
    }

    // Skip if bot detected
    if (this.isBot()) {
      console.debug('🤖 Analytics: Bot detected, skipping');
      return;
    }

    // Skip if already visited today
    if (this.hasVisitedToday()) {
      console.debug('📅 Analytics: Already tracked today, skipping');
      return;
    }

    // Track the visit
    await this.sendTrackingData({
      name: pageName || document.title,
      type: 'pageview',
      visitor_hash: this.generateVisitorHash()
    });

    // Mark as tracked
    this.markAsVisited();
    this.hasTracked = true;
    
    console.log('✅ Analytics: Unique visit tracked');
  }

  /**
   * Tracks a custom event
   */
  async trackEvent(eventName, eventData) {
    if (this.isBot()) return;

    await this.sendTrackingData({
      name: eventName,
      type: 'event',
      data: eventData
    });
  }
}

// Global analytics instance
let analytics = null;

/**
 * Initializes the analytics system
 */
export function initAnalytics(config) {
  if (typeof window === 'undefined') return; // Skip on server side
  
  analytics = new PrivateAnalytics(config);
}

/**
 * Tracks a page visit
 */
export function trackVisit(pageName) {
  if (analytics) {
    analytics.trackVisit(pageName);
  }
}

/**
 * Tracks a custom event
 */
export function trackEvent(eventName, eventData) {
  if (analytics) {
    analytics.trackEvent(eventName, eventData);
  }
}

/**
 * Gets the analytics configuration from environment variables
 */
export function getAnalyticsConfig() {
  // These need to be available at build time for Astro
  return {
    websiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || '',
    apiUrl: import.meta.env.PUBLIC_UMAMI_API_URL || '',
    enabled: !!(import.meta.env.PUBLIC_UMAMI_WEBSITE_ID && import.meta.env.PUBLIC_UMAMI_API_URL)
  };
}
