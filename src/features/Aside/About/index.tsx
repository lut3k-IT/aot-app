import { useTranslation } from 'react-i18next';

import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';
import AppHelmet from '@/components/ui/AppHelmet';
import { LanguageShortName } from '@/constants/enums';

import AboutEN from './components/AboutEN';
import AboutPL from './components/AboutPL';

const About = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isMobileLandscape = useIsMobileOrLandscape();

  return (
    <div className={isMobileLandscape ? 'pt-body-start' : ''}>
      <AppHelmet title={t('common:title.about')} />
      {i18n.language === LanguageShortName.ENGLISH ? <AboutEN /> : <AboutPL />}
    </div>
  );
};

export default About;
