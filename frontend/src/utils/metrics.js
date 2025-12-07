/**
 * Performance metrics utilities using Performance API
 */

/**
 * Detect HTTP protocol version used for the main document
 * @returns {string} Protocol version (HTTP/3, HTTP/2, HTTP/1.1, or unknown)
 */
export function detectProtocol() {
  try {
    // Get navigation timing entry
    const navigationEntry = performance.getEntriesByType('navigation')[0];

    if (navigationEntry && navigationEntry.nextHopProtocol) {
      const protocol = navigationEntry.nextHopProtocol.toLowerCase();

      // Map protocol strings to readable format
      if (protocol.includes('h3') || protocol.includes('quic')) {
        return 'HTTP/3';
      } else if (protocol.includes('h2')) {
        return 'HTTP/2';
      } else if (protocol.includes('http/1')) {
        return 'HTTP/1.1';
      }

      return protocol;
    }

    // Fallback: check resource timing entries
    const entries = performance.getEntriesByType('resource');
    if (entries.length > 0 && entries[0].nextHopProtocol) {
      const protocol = entries[0].nextHopProtocol.toLowerCase();
      if (protocol.includes('h3') || protocol.includes('quic')) return 'HTTP/3';
      if (protocol.includes('h2')) return 'HTTP/2';
      if (protocol.includes('http/1')) return 'HTTP/1.1';
      return protocol;
    }

    return 'unknown';
  } catch (error) {
    console.error('Error detecting protocol:', error);
    return 'unknown';
  }
}

/**
 * Collect comprehensive performance metrics
 * @returns {Object} Performance metrics object
 */
export function collectMetrics() {
  try {
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    const resourceEntries = performance.getEntriesByType('resource');

    // Calculate key metrics
    const ttfb = navigationEntry
      ? navigationEntry.responseStart - navigationEntry.requestStart
      : 0;

    const domLoad = navigationEntry
      ? navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart
      : 0;

    const fullLoad = navigationEntry
      ? navigationEntry.loadEventEnd - navigationEntry.fetchStart
      : 0;

    // Calculate total transferred size
    let totalSize = navigationEntry ? navigationEntry.transferSize || 0 : 0;

    // Collect per-resource metrics
    const resources = resourceEntries.map(entry => {
      const size = entry.transferSize || entry.encodedBodySize || 0;
      totalSize += size;

      return {
        name: entry.name,
        type: entry.initiatorType,
        duration: Math.round(entry.duration * 100) / 100,
        size: size,
        protocol: entry.nextHopProtocol || 'unknown',
        startTime: Math.round(entry.startTime * 100) / 100,
        ttfb: Math.round((entry.responseStart - entry.requestStart) * 100) / 100
      };
    });

    return {
      protocol: detectProtocol(),
      ttfb: Math.round(ttfb * 100) / 100,
      domLoad: Math.round(domLoad * 100) / 100,
      fullLoad: Math.round(fullLoad * 100) / 100,
      resourceCount: resourceEntries.length,
      totalSize: totalSize,
      resources: resources,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error collecting metrics:', error);
    return {
      protocol: 'unknown',
      ttfb: 0,
      domLoad: 0,
      fullLoad: 0,
      resourceCount: 0,
      totalSize: 0,
      resources: [],
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
}

/**
 * Get Web Vitals metrics
 * @returns {Promise<Object>} Web Vitals metrics
 */
export async function getWebVitals() {
  return new Promise((resolve) => {
    const vitals = {
      fcp: 0,  // First Contentful Paint
      lcp: 0,  // Largest Contentful Paint
      cls: 0,  // Cumulative Layout Shift
      fid: 0   // First Input Delay
    };

    try {
      // FCP - First Contentful Paint
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        vitals.fcp = Math.round(fcpEntry.startTime * 100) / 100;
      }

      // LCP - Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length > 0) {
              const lastEntry = entries[entries.length - 1];
              vitals.lcp = Math.round(lastEntry.startTime * 100) / 100;
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // Stop observing after a short delay
          setTimeout(() => {
            lcpObserver.disconnect();
            resolve(vitals);
          }, 3000);
        } catch (e) {
          // LCP not supported, continue
          resolve(vitals);
        }
      } else {
        resolve(vitals);
      }
    } catch (error) {
      console.error('Error getting web vitals:', error);
      resolve(vitals);
    }
  });
}

/**
 * Wait for page to fully load before collecting metrics
 * @param {Function} callback - Callback function to execute with metrics
 */
export function waitForLoad(callback) {
  if (document.readyState === 'complete') {
    // Page already loaded
    setTimeout(callback, 100);
  } else {
    // Wait for load event
    window.addEventListener('load', () => {
      setTimeout(callback, 100);
    });
  }
}

/**
 * Format bytes to human readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Format milliseconds to human readable format
 * @param {number} ms - Time in milliseconds
 * @returns {string} Formatted time
 */
export function formatTime(ms) {
  if (ms < 1000) return Math.round(ms) + ' ms';
  return (Math.round(ms / 10) / 100) + ' s';
}
