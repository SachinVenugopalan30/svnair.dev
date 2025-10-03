interface AnalyticsConfig {
  websiteId: string;
  apiUrl: string;
  enabled: boolean;
}

class PrivateAnalytics {
  private config: AnalyticsConfig;
  private hasTracked: boolean = false;

  constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  /**
   * Detects if the current visitor is likely a bot
   */
  private isBot(): boolean {
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
                      (window as any).phantom || 
                      (window as any).callPhantom ||
                      (window as any)._phantom;

    // Check for automated testing environments
    const isAutomated = (window as any).Cypress || 
                       (window as any).selenium ||
                       (window as any).webdriver;

    // Check for missing essential browser features
    const lacksFeatures = !navigator.cookieEnabled || 
                         !window.localStorage ||
                         !document.createElement;

    return isBotUA || isHeadless || isAutomated || lacksFeatures;
  }

  /**
   * Generates a unique visitor fingerprint without using personal data
   */
  private generateVisitorHash(): string {
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
  private hasVisitedToday(): boolean {
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
  private markAsVisited(): void {
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
  private async sendTrackingData(data: any): Promise<void> {
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
      console.debug('Analytics tracking failed:', error);
    }
  }

  /**
   * Tracks a unique page visit
   */
  public async trackVisit(pageName?: string): Promise<void> {
    // Skip if already tracked in this session
    if (this.hasTracked) return;

    // Skip if bot detected
    if (this.isBot()) {
      console.debug('Bot detected, skipping analytics');
      return;
    }

    // Skip if already visited today
    if (this.hasVisitedToday()) {
      console.debug('Already tracked today, skipping');
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
    
    console.debug('Unique visit tracked');
  }

  /**
   * Tracks a custom event
   */
  public async trackEvent(eventName: string, eventData?: any): Promise<void> {
    if (this.isBot()) return;

    await this.sendTrackingData({
      name: eventName,
      type: 'event',
      data: eventData
    });
  }
}

// Global analytics instance
let analytics: PrivateAnalytics | null = null;

/**
 * Initializes the analytics system
 */
export function initAnalytics(config: AnalyticsConfig): void {
  if (typeof window === 'undefined') return; // Skip on server side
  
  analytics = new PrivateAnalytics(config);
}

/**
 * Tracks a page visit
 */
export function trackVisit(pageName?: string): void {
  if (analytics) {
    analytics.trackVisit(pageName);
  }
}

/**
 * Tracks a custom event
 */
export function trackEvent(eventName: string, eventData?: any): void {
  if (analytics) {
    analytics.trackEvent(eventName, eventData);
  }
}

/**
 * Gets the analytics configuration from environment variables
 */
export function getAnalyticsConfig(): AnalyticsConfig {
  return {
    websiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || '',
    apiUrl: import.meta.env.PUBLIC_UMAMI_API_URL || '',
    enabled: !!(import.meta.env.PUBLIC_UMAMI_WEBSITE_ID && import.meta.env.PUBLIC_UMAMI_API_URL)
  };
}
