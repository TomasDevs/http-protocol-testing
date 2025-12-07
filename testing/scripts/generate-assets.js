import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../../frontend/public/assets');

// Create directories
const dirs = [
  path.join(ASSETS_DIR, 'images/small'),
  path.join(ASSETS_DIR, 'images/medium'),
  path.join(ASSETS_DIR, 'images/large'),
  path.join(ASSETS_DIR, 'scripts'),
  path.join(ASSETS_DIR, 'styles')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Tech-minimalist grayscale palette
const grayscalePalette = [
  '#000000', // black
  '#1a1a1a', // very dark gray
  '#262626', // dark gray
  '#404040', // medium-dark gray
  '#525252', // medium gray
  '#737373', // medium-light gray
  '#a3a3a3', // light gray
  '#d4d4d4', // very light gray
  '#e5e5e5', // near white
  '#f5f5f5'  // off white
];

// Generate SVG image with specific size
function generateSVG(width, height, text, color) {
  const textColor = ['#000000', '#1a1a1a', '#262626', '#404040'].includes(color) ? '#ffffff' : '#000000';
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" font-size="24" font-family="monospace" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
}

// Fill to target size
function fillToSize(content, targetSize) {
  const comment = '<!-- padding -->';
  while (Buffer.byteLength(content, 'utf8') < targetSize) {
    content += comment;
  }
  return content;
}

// Generate small images (20x ~10KB each)
console.log('Generating small images...');
for (let i = 1; i <= 50; i++) {
  const color = grayscalePalette[i % grayscalePalette.length];
  const svg = generateSVG(200, 200, `Small ${i}`, color);
  const filled = fillToSize(svg, 10 * 1024); // 10KB
  const filename = path.join(ASSETS_DIR, 'images/small', `image-${i}.svg`);
  fs.writeFileSync(filename, filled);
}
console.log('Created 50 small images (~10KB each)');

// Generate medium images (10x ~100KB each)
console.log('Generating medium images...');
for (let i = 1; i <= 10; i++) {
  const color = grayscalePalette[i % grayscalePalette.length];
  const svg = generateSVG(600, 600, `Medium ${i}`, color);
  const filled = fillToSize(svg, 100 * 1024); // 100KB
  const filename = path.join(ASSETS_DIR, 'images/medium', `image-${i}.svg`);
  fs.writeFileSync(filename, filled);
}
console.log('Created 10 medium images (~100KB each)');

// Generate large images (5x ~500KB each)
console.log('Generating large images...');
for (let i = 1; i <= 5; i++) {
  const color = grayscalePalette[i % grayscalePalette.length];
  const svg = generateSVG(1200, 1200, `Large ${i}`, color);
  const filled = fillToSize(svg, 500 * 1024); // 500KB
  const filename = path.join(ASSETS_DIR, 'images/large', `image-${i}.svg`);
  fs.writeFileSync(filename, filled);
}
console.log('Created 5 large images (~500KB each)');

// Generate JavaScript files with varying sizes
console.log('Generating JavaScript files...');
const jsSizes = [10, 20, 30, 50, 75, 100, 150, 200, 250, 300]; // KB

for (let i = 1; i <= 10; i++) {
  const targetSize = jsSizes[i - 1] * 1024;
  let content = `// Dummy JavaScript file ${i} - Size: ~${jsSizes[i - 1]}KB\n`;
  content += `console.log('Loaded dummy-${i}.js');\n\n`;
  content += `var dummy${i} = {\n`;
  content += `  id: ${i},\n`;
  content += `  size: '${jsSizes[i - 1]}KB',\n`;
  content += `  data: '`;

  // Fill with dummy data
  const remainingSize = targetSize - Buffer.byteLength(content, 'utf8') - 10;
  content += 'x'.repeat(remainingSize);
  content += `'\n};\n`;

  const filename = path.join(ASSETS_DIR, 'scripts', `dummy-${i}.js`);
  fs.writeFileSync(filename, content);
}
console.log('Created 10 JavaScript files with varying sizes');

// Generate CSS files with varying sizes
console.log('Generating CSS files...');
const cssSizes = [20, 40, 60, 80, 100]; // KB

for (let i = 1; i <= 5; i++) {
  const targetSize = cssSizes[i - 1] * 1024;
  let content = `/* Dummy CSS file ${i} - Size: ~${cssSizes[i - 1]}KB */\n\n`;

  // Generate dummy CSS rules
  let ruleCount = 0;
  while (Buffer.byteLength(content, 'utf8') < targetSize - 100) {
    const textColor = grayscalePalette[ruleCount % grayscalePalette.length];
    const bgColor = grayscalePalette[(ruleCount + 5) % grayscalePalette.length];
    content += `.dummy-class-${i}-${ruleCount} {\n`;
    content += `  color: ${textColor};\n`;
    content += `  background-color: ${bgColor};\n`;
    content += `  padding: ${ruleCount % 20}px;\n`;
    content += `  margin: ${ruleCount % 15}px;\n`;
    content += `  font-size: ${12 + (ruleCount % 10)}px;\n`;
    content += `}\n\n`;
    ruleCount++;
  }

  const filename = path.join(ASSETS_DIR, 'styles', `style-${i}.css`);
  fs.writeFileSync(filename, content);
}
console.log('Created 5 CSS files with varying sizes');

// Generate summary
console.log('\n=== Asset Generation Complete ===');
console.log('Summary:');
console.log('- 50 small images (~10KB each) = ~500KB total');
console.log('- 10 medium images (~100KB each) = ~1MB total');
console.log('- 5 large images (~500KB each) = ~2.5MB total');
console.log('- 10 JavaScript files (10-300KB) = ~1.2MB total');
console.log('- 5 CSS files (20-100KB) = ~300KB total');
console.log('Total assets: ~5.5MB');
console.log('\nAssets created in:', ASSETS_DIR);
