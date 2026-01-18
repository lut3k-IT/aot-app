/**
 * Generate heroes.ts from heroes.json
 */
const fs = require('fs');
const path = require('path');

// Read the JSON file which already has slugs
const heroesJson = require('../public/data/heroes.json');

// Helper to escape single quotes in strings
function escapeQuotes(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/'/g, "\\'");
}

// Helper to format alias array with proper escaping
function formatAliasArray(aliases) {
  if (!aliases || aliases.length === 0) return '[]';
  const escaped = aliases.map((a) => `'${escapeQuotes(a)}'`).join(', ');
  return `[${escaped}]`;
}

// Generate TS content
let content = `import { HeroType } from '@/constants/types';

const heroes: HeroType[] = [
`;

heroesJson.forEach((hero, index) => {
  content += `  {
    'id': ${hero.id},
    'slug': '${hero.slug}',
    'firstName': '${escapeQuotes(hero.firstName)}',
    'lastName': ${hero.lastName ? `'${escapeQuotes(hero.lastName)}'` : 'null'},
    'species': ${hero.species},
    'age': ${hero.age},
    'height': ${hero.height},
    'weight': ${hero.weight},
    'residence': ${hero.residence},
    'status': ${hero.status},
    'alias': ${formatAliasArray(hero.alias)},
    'mbti': ${hero.mbti}
  }${index < heroesJson.length - 1 ? ',' : ''}
`;
});

content += `];

export default heroes;
`;

const tsPath = path.join(__dirname, '..', 'src', 'data', 'heroes.ts');
fs.writeFileSync(tsPath, content);
console.log('Generated src/data/heroes.ts with slugs');
