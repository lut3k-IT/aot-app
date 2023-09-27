import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OutsideClickHandler from 'react-outside-click-handler';
import dayjs from 'dayjs';

import { LanguageName, LanguageShortName, LocalStorageKey } from '@/constants';

import 'dayjs/locale/en';
import 'dayjs/locale/pl';

import useIsMobile from 'src/components/hooks/useIsMobile';
import { setLocalStorageItem } from 'src/utils/storage';

interface Language {
  id: LanguageShortName;
  label: LanguageName;
}

const availableLanguages: Language[] = [
  {
    id: LanguageShortName.ENGLISH,
    label: LanguageName.ENGLISH
  },
  {
    id: LanguageShortName.POLISH,
    label: LanguageName.POLISH
  }
];

const LanguageSwitcher = () => {
  const [isSelectionActive, setIsSelectionActive] = useState(false);
  const { i18n } = useTranslation();
  const isMobile = useIsMobile();

  const handleChangeLanguage = (lang: LanguageShortName) => {
    i18n.changeLanguage(lang);
    dayjs.locale(lang);
    setLocalStorageItem(LocalStorageKey.LANGUAGE_KEY, lang);
    setIsSelectionActive(false);
  };

  const handleToggleSelectionActive = () => {
    setIsSelectionActive((prev) => !prev);
  };

  return (
    <div>
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsSelectionActive(false);
        }}
        display={'contents'}
      >
        <div onClick={handleToggleSelectionActive}>{!isMobile && <div>{i18n.language}</div>}</div>

        <div>
          {availableLanguages
            .filter((lang) => lang.id !== i18n.language)
            .map((lang) => (
              <div
                onClick={() => handleChangeLanguage(lang.id)}
                key={lang.id}
              >
                <div>{lang.label}</div>
              </div>
            ))}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default LanguageSwitcher;
