import { useTranslation } from 'react-i18next';

import useIsMobile from '@/components/hooks/useIsMobile';
import AppHelmet from '@/components/ui/AppHelmet';
import { LanguageShortName } from '@/constants/enums';

import AboutEN from './components/AboutEN';
import AboutPL from './components/AboutPL';

const About = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? 'pt-body-start' : ''}>
      <AppHelmet title={t('common:title.about')} />
      {i18n.language === LanguageShortName.ENGLISH ? <AboutEN /> : <AboutPL />}
    </div>
  );
};

export default About;
