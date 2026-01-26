import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { Link as LinkIcon } from 'lucide-react';
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
        const res = await fetch('/CHANGELOG.md');

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

  // Remove the first line (# Changelog) to avoid duplicate title
  const contentWithoutTitle = changelogContent.replace(/^# Changelog\r?\n\r?\n?/, '');

  const versions = contentWithoutTitle.split('\n## ');
  const latestVersions = versions
    .slice(0, MAX_VERSIONS_TO_SHOW)
    .map((version, index) => (index === 0 ? version : `## ${version}`))
    .join('');

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const CustomH2 = ({ children, ...props }: any) => {
    // Extract href from the first child if it's a link, to make the icon clickable as well
    const firstChild = props.node?.children?.[0];
    const url = firstChild?.tagName === 'a' ? firstChild.properties?.href : undefined;

    return (
      <h2
        {...props}
        className='group flex items-center gap-2'
      >
        {children}
        {url ? (
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center opacity-40 transition-opacity group-hover:opacity-100'
          >
            <LinkIcon className='h-5 w-5' />
          </a>
        ) : (
          <LinkIcon className='h-5 w-5 opacity-40 transition-opacity group-hover:opacity-100' />
        )}
      </h2>
    );
  };

  return (
    <div>
      <div
        className={classNames('article', {
          'pt-body-start': isMobileLandscape
        })}
      >
        <h1>{t('common:title.changelog')}</h1>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: CustomH2
          }}
        >
          {latestVersions}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Changelog;
