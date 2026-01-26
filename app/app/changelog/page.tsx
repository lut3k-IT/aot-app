import { promises as fs } from 'fs';
import path from 'path';

import Changelog from '@/features/Aside/Changelog';

export default async function ChangelogPage() {
  const filePath = path.join(process.cwd(), 'CHANGELOG.md');
  let changelogContent = '';

  try {
    changelogContent = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error('Failed to read CHANGELOG.md', error);
  }

  return <Changelog initialContent={changelogContent} />;
}
