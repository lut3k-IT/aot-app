'use client';

import { useTranslation } from 'react-i18next';

import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';
import { LanguageShortName } from '@/constants/enums';

import TermsAndConditionsEN from './components/TermsAndConditionsEN';
import TermsAndConditionsPL from './components/TermsAndConditionsPL';

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isMobileLandscape = useIsMobileOrLandscape();

  return (
    <div className={isMobileLandscape ? 'pt-body-start' : ''}>
      {(i18n.resolvedLanguage || i18n.language) === LanguageShortName.ENGLISH ? (
        <TermsAndConditionsEN />
      ) : (
        <TermsAndConditionsPL />
      )}
    </div>
  );
};

export default TermsAndConditions;
