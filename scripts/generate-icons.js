import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_SVG = path.resolve(__dirname, '../src/assets/icons/aot-icon.svg');
const OUTPUT_DIR = path.resolve(__dirname, '../public/assets/icons');

const sizes = [192, 512];

async function generateIcons() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const size of sizes) {
    const outputPath = path.join(OUTPUT_DIR, `pwa-${size}x${size}.png`);
    console.log(`Generating ${size}x${size} icon...`);

    try {
      await sharp(INPUT_SVG).resize(size, size).png().toFile(outputPath);
      console.log(`Created ${outputPath}`);
    } catch (error) {
      console.error(`Error generating ${size}x${size} icon:`, error);
    }
  }
}

generateIcons();
