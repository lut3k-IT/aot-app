import { useTranslation } from 'react-i18next';

import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';
import AppHelmet from '@/components/ui/AppHelmet';
import { LanguageShortName } from '@/constants/enums';

import TermsAndConditionsEN from './components/TermsAndConditionsEN';
import TermsAndConditionsPL from './components/TermsAndConditionsPL';

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isMobileLandscape = useIsMobileOrLandscape();

  return (
    <div className={isMobileLandscape ? 'pt-body-start' : ''}>
      <AppHelmet title={t('common:title.termsAndConditions')} />
      {i18n.language === LanguageShortName.ENGLISH ? <TermsAndConditionsEN /> : <TermsAndConditionsPL />}
    </div>
  );
};

export default TermsAndConditions;
