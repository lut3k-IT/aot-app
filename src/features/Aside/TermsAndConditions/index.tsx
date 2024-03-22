import { useTranslation } from 'react-i18next';

import useIsMobile from '@/components/hooks/useIsMobile';
import AppHelmet from '@/components/ui/AppHelmet';
import { LanguageShortName } from '@/constants/enums';

import TermsAndConditionsEN from './components/TermsAndConditionsEN';
import TermsAndConditionsPL from './components/TermsAndConditionsPL';

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? 'pt-body-start' : ''}>
      <AppHelmet title={t('common:title.termsAndConditions')} />
      {i18n.language === LanguageShortName.ENGLISH ? <TermsAndConditionsEN /> : <TermsAndConditionsPL />}
    </div>
  );
};

export default TermsAndConditions;
