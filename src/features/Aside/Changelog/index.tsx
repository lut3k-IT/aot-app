import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import remarkGfm from 'remark-gfm';

import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';

const MAX_VERSIONS_TO_SHOW = 5;

const Changelog = () => {
  const [changelogContent, setChangelogContent] = useState('');
  const isMobileLandscape = useIsMobileOrLandscape();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const url = new URL('/CHANGELOG.md', import.meta.url).toString();
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Could not fetch changelog data');
        }

        const text = await res.text();
        setChangelogContent(text);
      } catch (error) {
        console.error('Error loading changelog:', error);
      }
    };

    fetchChangelog();
  }, []);

  const versions = changelogContent.split('\n## ');
  const latestVersions = versions
    .slice(0, MAX_VERSIONS_TO_SHOW)
    .map((version, index) => (index === 0 ? version : `## ${version}`))
    .join('');

  return (
    <div>
      <div
        className={classNames('article', {
          'pt-body-start': isMobileLandscape
        })}
      >
        <h1>{t('common:title.changelog')}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{latestVersions}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Changelog;
