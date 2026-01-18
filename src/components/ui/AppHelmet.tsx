'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type AppHelmetProps = {
  title?: string;
  forceTitle?: string;
  description?: string;
};

/**
 * Client-side document title manager for Next.js
 * Note: For SEO purposes, use Next.js metadata API in page/layout files
 * This component provides client-side title updates for dynamic content
 */
const AppHelmet = (props: AppHelmetProps) => {
  const { title, forceTitle } = props;

  const { t } = useTranslation();

  useEffect(() => {
    const computedTitle =
      !title || title?.trim()?.length === 0
        ? t('common:brand')
        : forceTitle
          ? `${title}`
          : `${title} - ${t('common:brand')}`;

    document.title = computedTitle;
  }, [title, forceTitle, t]);

  return null;
};

export default AppHelmet;
