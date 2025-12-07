import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_DIR = path.join(__dirname, '../results/raw');
const SUMMARY_FILE = path.join(__dirname, '../results/summary.json');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Calculate statistics
function calculateStats(values) {
  if (values.length === 0) {
    return { mean: 0, median: 0, min: 0, max: 0, stdDev: 0, count: 0 };
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
    mean: Math.round(mean * 1000) / 1000,
    median: Math.round(median * 1000) / 1000,
    min: Math.round(min * 1000) / 1000,
    max: Math.round(max * 1000) / 1000,
    stdDev: Math.round(stdDev * 1000) / 1000,
    count: values.length
  };
}

// Parse CSV file
function parseCSV(filename) {
  const filepath = path.join(RAW_DIR, filename);

  if (!fs.existsSync(filepath)) {
    log(`Warning: ${filename} not found`, 'yellow');
    return [];
  }

  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.trim().split('\n');

  // Skip header
  const dataLines = lines.slice(1);

  const results = [];
  for (const line of dataLines) {
    const parts = line.split(',');
    if (parts.length >= 6 && parts[2] !== 'error') {
      results.push({
        protocol: parts[0],
        scenario: parts[1],
        timeTotal: parseFloat(parts[2]),
        timeConnect: parseFloat(parts[3]),
        timeStartTransfer: parseFloat(parts[4]),
        sizeDownload: parseInt(parts[5]),
        httpVersion: parts[6] || 'unknown'
      });
    }
  }

  return results;
}

// Main analysis
log('\n================================', 'bright');
log('HTTP Protocol Test Results Analysis', 'bright');
log('================================\n', 'bright');

// Read all protocol files
const protocols = ['http1', 'http2', 'http3'];
const allData = {};

for (const protocol of protocols) {
  const filename = `${protocol}.txt`;
  const data = parseCSV(filename);
  allData[protocol] = data;
  log(`Loaded ${data.length} results for ${protocol.toUpperCase()}`, 'cyan');
}

console.log('');

// Analyze by protocol and scenario
const summary = {};

for (const [protocol, data] of Object.entries(allData)) {
  summary[protocol] = {
    overall: {},
    byScenario: {}
  };

  // Overall stats
  if (data.length > 0) {
    summary[protocol].overall = {
      timeTotal: calculateStats(data.map(d => d.timeTotal)),
      timeConnect: calculateStats(data.map(d => d.timeConnect)),
      timeStartTransfer: calculateStats(data.map(d => d.timeStartTransfer)),
      sizeDownload: calculateStats(data.map(d => d.sizeDownload))
    };
  }

  // Stats by scenario
  const scenarios = [...new Set(data.map(d => d.scenario))];
  for (const scenario of scenarios) {
    const scenarioData = data.filter(d => d.scenario === scenario);
    summary[protocol].byScenario[scenario] = {
      timeTotal: calculateStats(scenarioData.map(d => d.timeTotal)),
      timeConnect: calculateStats(scenarioData.map(d => d.timeConnect)),
      timeStartTransfer: calculateStats(scenarioData.map(d => d.timeStartTransfer)),
      sizeDownload: calculateStats(scenarioData.map(d => d.sizeDownload))
    };
  }
}

// Save summary
fs.writeFileSync(SUMMARY_FILE, JSON.stringify(summary, null, 2));
log(`Summary saved to: ${SUMMARY_FILE}\n`, 'green');

// Print results table
log('=== Overall Performance Comparison ===\n', 'bright');

console.log('Protocol    | Avg Total Time | Avg TTFB       | Avg Connect    | Tests');
console.log('------------|----------------|----------------|----------------|-------');

for (const protocol of protocols) {
  const stats = summary[protocol].overall;
  if (stats.timeTotal && stats.timeTotal.count > 0) {
    const protocolName = protocol.toUpperCase().padEnd(11);
    const totalTime = `${(stats.timeTotal.mean * 1000).toFixed(0)}ms (±${(stats.timeTotal.stdDev * 1000).toFixed(0)})`.padEnd(14);
    const ttfb = `${(stats.timeStartTransfer.mean * 1000).toFixed(0)}ms (±${(stats.timeStartTransfer.stdDev * 1000).toFixed(0)})`.padEnd(14);
    const connect = `${(stats.timeConnect.mean * 1000).toFixed(0)}ms (±${(stats.timeConnect.stdDev * 1000).toFixed(0)})`.padEnd(14);
    const count = stats.timeTotal.count.toString().padEnd(6);

    console.log(`${protocolName} | ${totalTime} | ${ttfb} | ${connect} | ${count}`);
  } else {
    console.log(`${protocol.toUpperCase().padEnd(11)} | No data available`);
  }
}

console.log('');

// Print by scenario
for (const scenario of ['light', 'heavy', 'many']) {
  log(`\n=== ${scenario.toUpperCase()} Scenario ===\n`, 'bright');

  console.log('Protocol    | Avg Total Time | Avg TTFB       | Tests');
  console.log('------------|----------------|----------------|-------');

  for (const protocol of protocols) {
    const stats = summary[protocol].byScenario[scenario];
    if (stats && stats.timeTotal && stats.timeTotal.count > 0) {
      const protocolName = protocol.toUpperCase().padEnd(11);
      const totalTime = `${(stats.timeTotal.mean * 1000).toFixed(0)}ms (±${(stats.timeTotal.stdDev * 1000).toFixed(0)})`.padEnd(14);
      const ttfb = `${(stats.timeStartTransfer.mean * 1000).toFixed(0)}ms (±${(stats.timeStartTransfer.stdDev * 1000).toFixed(0)})`.padEnd(14);
      const count = stats.timeTotal.count.toString().padEnd(6);

      console.log(`${protocolName} | ${totalTime} | ${ttfb} | ${count}`);
    } else {
      console.log(`${protocol.toUpperCase().padEnd(11)} | No data available`);
    }
  }
}

// Winner comparison
log('\n\n=== Performance Winners ===\n', 'bright');

const metrics = ['timeTotal', 'timeConnect', 'timeStartTransfer'];
const metricNames = {
  timeTotal: 'Fastest Overall',
  timeConnect: 'Fastest Connect',
  timeStartTransfer: 'Fastest TTFB'
};

for (const metric of metrics) {
  let fastest = null;
  let fastestTime = Infinity;

  for (const protocol of protocols) {
    const stats = summary[protocol].overall[metric];
    if (stats && stats.mean > 0 && stats.mean < fastestTime) {
      fastestTime = stats.mean;
      fastest = protocol;
    }
  }

  if (fastest) {
    log(`${metricNames[metric]}: ${fastest.toUpperCase()} (${(fastestTime * 1000).toFixed(0)}ms)`, 'green');
  }
}

log('\n================================\n', 'bright');
log('Analysis complete!', 'green');
log(`\nDetailed results saved to: ${SUMMARY_FILE}`, 'cyan');
