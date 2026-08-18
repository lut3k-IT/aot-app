/**
 * Kontrola kursora na elementach klikalnych.
 *
 * Tailwind 3 ustawial `cursor: pointer` na kazdym <button> w swoim resecie. Tailwind 4
 * juz tego nie robi, przez co po migracji lapka zniknela z calej aplikacji. Regula
 * bazowa w src/index.css przywraca ja raz dla wszystkich przyciskow i rol interaktywnych,
 * ale klasa uzytkowa `cursor-default` w komponencie wygrywa z warstwa bazowa i cicho
 * ja wylacza. Wlasnie tak przychodza komponenty shadcn/ui (Select, DropdownMenu, Command).
 *
 * Ten skrypt pilnuje dwoch rzeczy:
 *  - zadnego `cursor-default` w komponentach; menu i listy maja byc klikalne lapka,
 *  - obecnosci samej reguly bazowej, zeby nie zniknela przy porzadkach w index.css.
 *
 * `cursor-not-allowed` jest dozwolony, bo opisuje stan wylaczony, a nie klikalny.
 *
 * Uruchomienie: npm run check:cursors
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SOURCE_DIR = join(process.cwd(), 'src');
const GLOBAL_STYLESHEET = join(process.cwd(), 'src', 'index.css');
const BANNED_CLASS = 'cursor-default';
const EXTENSIONS = ['.tsx', '.ts', '.css'];

const collectFiles = (directory) => {
  const found = [];
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) {
      found.push(...collectFiles(path));
      continue;
    }
    if (EXTENSIONS.some((extension) => entry.endsWith(extension))) found.push(path);
  }
  return found;
};

const errors = [];

for (const path of collectFiles(SOURCE_DIR)) {
  const lines = readFileSync(path, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    if (!line.includes(BANNED_CLASS)) return;
    const relative = path.replace(process.cwd() + '\\', '').replace(process.cwd() + '/', '');
    errors.push(
      `${relative}:${index + 1} — klasa \`${BANNED_CLASS}\` na elemencie klikalnym. ` +
        'Uzyj `cursor-pointer`; `cursor-not-allowed` zostaw dla stanu wylaczonego.'
    );
  });
}

const stylesheet = readFileSync(GLOBAL_STYLESHEET, 'utf8');
if (!/button:not\(:disabled\)/.test(stylesheet)) {
  errors.push(
    'src/index.css — brak reguly bazowej przywracajacej `cursor: pointer` przyciskom. ' +
      'Tailwind 4 nie ustawia jej sam, wiec bez niej lapka znika z calej aplikacji.'
  );
}

if (errors.length > 0) {
  errors.forEach((error) => console.error(`BLAD: ${error}`));
  console.error(`\nNiepowodzenie: ${errors.length} problemow.`);
  process.exit(1);
}

console.log('Kontrola kursorow zakonczona bez bledow.');
