/**
 * Skrypt do zmiany nazw obrazów z ID na slug (imie-nazwisko).
 * Uruchom: node scripts/rename-images.js
 */

const fs = require('fs');
const path = require('path');

// Helper function to create slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

// Create hero slug from firstName and lastName
function createHeroSlug(hero) {
  const parts = [hero.firstName];
  if (hero.lastName) {
    parts.push(hero.lastName);
  }
  return createSlug(parts.join(' '));
}

// Create titan slug from name
function createTitanSlug(titan) {
  return createSlug(titan.name);
}

// Rename files in a directory based on mapping
function renameFiles(directory, idToSlugMap, extension = '.jpg') {
  const files = fs.readdirSync(directory);
  const renamedFiles = [];
  const errors = [];

  for (const file of files) {
    if (!file.endsWith(extension)) continue;

    const id = parseInt(file.replace(extension, ''), 10);
    const slug = idToSlugMap[id];

    if (!slug) {
      errors.push(`No slug found for ID ${id} (file: ${file})`);
      continue;
    }

    const oldPath = path.join(directory, file);
    const newPath = path.join(directory, `${slug}${extension}`);

    if (oldPath !== newPath) {
      try {
        fs.renameSync(oldPath, newPath);
        renamedFiles.push({ from: file, to: `${slug}${extension}` });
      } catch (err) {
        errors.push(`Failed to rename ${file}: ${err.message}`);
      }
    }
  }

  return { renamedFiles, errors };
}

// Main execution
function main() {
  const rootDir = path.join(__dirname, '..');

  // Load data
  const heroesPath = path.join(rootDir, 'public', 'data', 'heroes.json');
  const titansPath = path.join(rootDir, 'public', 'data', 'titans.json');

  const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf-8'));
  const titans = JSON.parse(fs.readFileSync(titansPath, 'utf-8'));

  // Create ID to slug mappings
  const heroIdToSlug = {};
  const heroesWithSlugs = heroes.map((hero) => {
    const slug = createHeroSlug(hero);
    heroIdToSlug[hero.id] = slug;
    return { ...hero, slug };
  });

  const titanIdToSlug = {};
  const titansWithSlugs = titans.map((titan) => {
    const slug = createTitanSlug(titan);
    titanIdToSlug[titan.id] = slug;
    return { ...titan, slug };
  });

  // Check for duplicate slugs and resolve by appending ID
  const heroSlugCounts = {};
  heroes.forEach((hero) => {
    const slug = createHeroSlug(hero);
    heroSlugCounts[slug] = (heroSlugCounts[slug] || 0) + 1;
  });

  // Find slugs that appear more than once
  const duplicateSlugs = Object.keys(heroSlugCounts).filter((slug) => heroSlugCounts[slug] > 1);

  if (duplicateSlugs.length > 0) {
    console.log('⚠️ Found duplicate slugs, resolving by appending ID:');
    duplicateSlugs.forEach((slug) => {
      console.log(`  "${slug}" appears ${heroSlugCounts[slug]} times`);
    });

    // Update slugs for heroes with duplicates - append ID to ALL instances
    heroes.forEach((hero) => {
      const baseSlug = createHeroSlug(hero);
      if (duplicateSlugs.includes(baseSlug)) {
        const newSlug = `${baseSlug}-${hero.id}`;
        heroIdToSlug[hero.id] = newSlug;
        console.log(`    ID ${hero.id}: ${hero.firstName} ${hero.lastName || ''} -> ${newSlug}`);
      }
    });
    console.log('');
  }

  // Update heroesWithSlugs with resolved slugs
  const heroesWithSlugsResolved = heroes.map((hero) => ({
    ...hero,
    slug: heroIdToSlug[hero.id]
  }));

  console.log('✅ All slug conflicts resolved\n');

  // Check for duplicate titan slugs (still exit on duplicates for titans)
  const titanSlugs = Object.values(titanIdToSlug);
  const duplicateTitanSlugs = titanSlugs.filter((slug, index) => titanSlugs.indexOf(slug) !== index);

  if (duplicateTitanSlugs.length > 0) {
    console.error('❌ Duplicate titan slugs found:', [...new Set(duplicateTitanSlugs)]);
    process.exit(1);
  }

  // Rename hero images
  const heroImagesDir = path.join(rootDir, 'public', 'assets', 'img', 'heroes');
  console.log('Renaming hero images...');
  const heroResult = renameFiles(heroImagesDir, heroIdToSlug);
  console.log(`  ✅ Renamed ${heroResult.renamedFiles.length} files`);
  if (heroResult.errors.length > 0) {
    console.log(`  ⚠️ Errors: ${heroResult.errors.join(', ')}`);
  }

  // Rename titan images
  const titanImagesDir = path.join(rootDir, 'public', 'assets', 'img', 'titans');
  console.log('Renaming titan images...');
  const titanResult = renameFiles(titanImagesDir, titanIdToSlug);
  console.log(`  ✅ Renamed ${titanResult.renamedFiles.length} files`);
  if (titanResult.errors.length > 0) {
    console.log(`  ⚠️ Errors: ${titanResult.errors.join(', ')}`);
  }

  // Update JSON files with slugs
  console.log('\nUpdating JSON files with slugs...');
  fs.writeFileSync(heroesPath, JSON.stringify(heroesWithSlugsResolved, null, 2) + '\n');
  console.log('  ✅ Updated heroes.json');

  fs.writeFileSync(titansPath, JSON.stringify(titansWithSlugs, null, 2) + '\n');
  console.log('  ✅ Updated titans.json');

  console.log('\n✅ Done!');

  // Print slug mappings for reference
  console.log('\n--- Hero Slug Mappings (first 10) ---');
  Object.entries(heroIdToSlug)
    .slice(0, 10)
    .forEach(([id, slug]) => {
      console.log(`  ${id} -> ${slug}`);
    });

  console.log('\n--- Titan Slug Mappings ---');
  Object.entries(titanIdToSlug).forEach(([id, slug]) => {
    console.log(`  ${id} -> ${slug}`);
  });
}

main();
