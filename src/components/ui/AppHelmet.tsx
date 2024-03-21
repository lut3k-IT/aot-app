import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

type AppHelmetProps = {
  title?: string;
  forceTitle?: string;
  description?: string;
  children?: React.ReactNode;
};

const AppHelmet = (props: AppHelmetProps) => {
  const { title, forceTitle, description, children } = props;

  const { t } = useTranslation();

  const descriptionFallback = description || t('common:description');

  return (
    <Helmet>
      <title>
        {!title || title?.trim()?.length === 0
          ? t('common:brand')
          : forceTitle
            ? `${title}`
            : `${title} - ${t('common:brand')}`}
      </title>
      <meta
        name='description'
        content={descriptionFallback}
      />
      {children}
    </Helmet>
  );
};

export default AppHelmet;
