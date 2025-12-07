/**
 * LocalStorage utilities for managing test results
 */

const STORAGE_KEY = 'http-protocol-test-results';

/**
 * Save a test result to localStorage
 * @param {Object} result - Test result object
 * @param {string} scenarioType - Type of scenario (light, heavy, many)
 */
export function saveResult(result, scenarioType) {
  try {
    const results = getResults();

    const newResult = {
      ...result,
      scenarioType,
      id: Date.now() + Math.random().toString(36).substr(2, 9)
    };

    results.push(newResult);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));

    return newResult;
  } catch (error) {
    console.error('Error saving result:', error);
    throw error;
  }
}

/**
 * Get all saved results from localStorage
 * @returns {Array} Array of test results
 */
export function getResults() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting results:', error);
    return [];
  }
}

/**
 * Clear all results from localStorage
 */
export function clearResults() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing results:', error);
    throw error;
  }
}

/**
 * Export results to JSON format
 * @returns {string} JSON string of all results
 */
export function exportToJSON() {
  try {
    const results = getResults();
    return JSON.stringify(results, null, 2);
  } catch (error) {
    console.error('Error exporting to JSON:', error);
    throw error;
  }
}

/**
 * Export results to CSV format
 * @returns {string} CSV string of all results
 */
export function exportToCSV() {
  try {
    const results = getResults();

    if (results.length === 0) {
      return 'No results to export';
    }

    // CSV headers
    const headers = [
      'Timestamp',
      'Scenario Type',
      'Protocol',
      'TTFB (ms)',
      'DOM Load (ms)',
      'Full Load (ms)',
      'Resource Count',
      'Total Size (bytes)'
    ];

    // CSV rows
    const rows = results.map(result => [
      result.timestamp,
      result.scenarioType,
      result.protocol,
      result.ttfb,
      result.domLoad,
      result.fullLoad,
      result.resourceCount,
      result.totalSize
    ]);

    // Combine headers and rows
    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return csv;
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    throw error;
  }
}

/**
 * Download data as a file
 * @param {string} content - File content
 * @param {string} filename - Name of the file
 * @param {string} mimeType - MIME type of the file
 */
export function downloadFile(content, filename, mimeType = 'text/plain') {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}

/**
 * Get results grouped by protocol
 * @returns {Object} Results grouped by protocol
 */
export function getResultsByProtocol() {
  const results = getResults();
  return results.reduce((acc, result) => {
    const protocol = result.protocol;
    if (!acc[protocol]) {
      acc[protocol] = [];
    }
    acc[protocol].push(result);
    return acc;
  }, {});
}

/**
 * Get results grouped by scenario type
 * @returns {Object} Results grouped by scenario type
 */
export function getResultsByScenario() {
  const results = getResults();
  return results.reduce((acc, result) => {
    const scenario = result.scenarioType;
    if (!acc[scenario]) {
      acc[scenario] = [];
    }
    acc[scenario].push(result);
    return acc;
  }, {});
}

/**
 * Calculate statistics for a set of results
 * @param {Array} results - Array of results
 * @param {string} metric - Metric to calculate stats for (ttfb, domLoad, fullLoad)
 * @returns {Object} Statistics (mean, median, min, max, stdDev)
 */
export function calculateStats(results, metric) {
  if (!results || results.length === 0) {
    return { mean: 0, median: 0, min: 0, max: 0, stdDev: 0 };
  }

  const values = results.map(r => r[metric]).filter(v => typeof v === 'number' && !isNaN(v));

  if (values.length === 0) {
    return { mean: 0, median: 0, min: 0, max: 0, stdDev: 0 };
  }

  const sorted = [...values].sort((a, b) => a - b);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  return {
    mean: Math.round(mean * 100) / 100,
    median: Math.round(median * 100) / 100,
    min: Math.round(min * 100) / 100,
    max: Math.round(max * 100) / 100,
    stdDev: Math.round(stdDev * 100) / 100
  };
}
