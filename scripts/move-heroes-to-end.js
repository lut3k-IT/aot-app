const fs = require('fs');
const path = require('path');

const heroesPath = path.join(__dirname, '..', 'public', 'data', 'heroes.json');
const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf-8'));

// Find heroes to move to the end
const namesToMove = ['Buchwald', 'Charrette', 'Varis'];
const heroesToMove = [];
const remainingHeroes = [];

heroes.forEach((hero) => {
  if (namesToMove.includes(hero.firstName)) {
    console.log(`Moving to end: ${hero.firstName} (ID: ${hero.id})`);
    heroesToMove.push(hero);
  } else {
    remainingHeroes.push(hero);
  }
});

// Create new ordered array with moved heroes at the end
const reorderedHeroes = [...remainingHeroes, ...heroesToMove];

// Save to file
fs.writeFileSync(heroesPath, JSON.stringify(reorderedHeroes, null, 2) + '\n');
console.log(`\n✅ Moved ${heroesToMove.length} heroes to the end`);
