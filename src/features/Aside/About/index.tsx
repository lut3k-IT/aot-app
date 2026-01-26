'use client';

import { useTranslation } from 'react-i18next';

import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';
import DynamicTitle from '@/components/ui/DynamicTitle';
import { LanguageShortName } from '@/constants/enums';

import AboutEN from './components/AboutEN';
import AboutPL from './components/AboutPL';

const About = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isMobileLandscape = useIsMobileOrLandscape();

  return (
    <div className={isMobileLandscape ? 'pt-body-start' : ''}>
      <DynamicTitle title={t('common:title.about')} />
      {(i18n.resolvedLanguage || i18n.language) === LanguageShortName.ENGLISH ? <AboutEN /> : <AboutPL />}
    </div>
  );
};

export default About;
