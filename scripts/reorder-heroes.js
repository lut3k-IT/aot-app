const fs = require('fs');
const path = require('path');

const heroesPath = path.join(__dirname, '..', 'public', 'data', 'heroes.json');
const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf-8'));

// Define the desired order by full names (firstName lastName)
// Positions 1-30
const desiredOrder = [
  // Top 10
  { firstName: 'Levi', lastName: 'Ackermann' },
  { firstName: 'Erwin', lastName: 'Smith' },
  { firstName: 'Eren', lastName: 'Jaeger' },
  { firstName: 'Mikasa', lastName: 'Ackermann' },
  { firstName: 'Hange', lastName: 'Zoë' },
  { firstName: 'Armin', lastName: 'Arlelt' },
  { firstName: 'Reiner', lastName: 'Braun' },
  { firstName: 'Sasha', lastName: 'Braus' },
  { firstName: 'Jean', lastName: 'Kirschtein' },
  { firstName: 'Annie', lastName: 'Leonhart' },
  // Positions 11-30
  { firstName: 'Bertholdt', lastName: 'Hoover' },
  { firstName: 'Zeke', lastName: 'Jaeger' },
  { firstName: 'Historia', lastName: 'Reiss' },
  { firstName: 'Pieck', lastName: 'Finger' },
  { firstName: 'Gabi', lastName: 'Braun' },
  { firstName: 'Falco', lastName: 'Grice' },
  { firstName: 'Ymir', lastName: null }, // Freckles Ymir (no last name)
  { firstName: 'Conny', lastName: 'Springer' },
  { firstName: 'Porco', lastName: 'Galliard' },
  { firstName: 'Marco', lastName: 'Bodt' },
  { firstName: 'Floch', lastName: 'Forster' },
  { firstName: 'Petra', lastName: 'Rall' },
  { firstName: 'Kenny', lastName: 'Ackermann' },
  { firstName: 'Hannes', lastName: null },
  { firstName: 'Dot', lastName: 'Pyxis' },
  { firstName: 'Moblit', lastName: 'Berner' },
  { firstName: 'Miche', lastName: 'Zacharius' },
  { firstName: 'Yelena', lastName: null },
  { firstName: 'Nanaba', lastName: null },
  { firstName: 'Oruo', lastName: 'Bozad' }
];

console.log('Finding heroes...\n');

// Find heroes by full name
const topHeroes = [];
desiredOrder.forEach((desired, index) => {
  const found = heroes.find((h) => h.firstName === desired.firstName && h.lastName === desired.lastName);
  if (found) {
    console.log(`${index + 1}. ${found.firstName} ${found.lastName || ''} (ID: ${found.id})`);
    topHeroes.push(found);
  } else {
    console.log(`${index + 1}. ${desired.firstName} ${desired.lastName || ''} - NOT FOUND!`);
  }
});

// Get remaining heroes (excluding the top 30)
const topHeroIds = topHeroes.map((h) => h.id);
const remainingHeroes = heroes.filter((h) => !topHeroIds.includes(h.id));

// Create new ordered array
const reorderedHeroes = [...topHeroes, ...remainingHeroes];

// Save to file
fs.writeFileSync(heroesPath, JSON.stringify(reorderedHeroes, null, 2) + '\n');
console.log(`\n✅ Reordered heroes.json - moved ${topHeroes.length} heroes to top`);
