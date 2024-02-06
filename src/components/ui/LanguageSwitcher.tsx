import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { LanguageName, LanguageShortName, LocalStorageKey } from '@/constants/enums';
import { DeviceType } from '@/constants/types';
import { setLocalStorageItem } from '@/utils/storageHelpers';

import 'dayjs/locale/en';
import 'dayjs/locale/pl';

import { Button } from './Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './DropdownMenu';

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

interface LanguageSwitcherProps {
  variant?: DeviceType;
}

const LanguageSwitcher = (props: LanguageSwitcherProps) => {
  const { variant = 'mobile' } = props;
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lang: LanguageShortName) => {
    i18n.changeLanguage(lang);
    dayjs.locale(lang);
    setLocalStorageItem(LocalStorageKey.LANGUAGE, lang);
  };

  const currentLanguageName = availableLanguages.find((obj) => obj.id === i18n.language)?.label;

  const MobileButton = (
    <Button
      variant='outline'
      className={'w-min'}
    >
      {currentLanguageName}
    </Button>
  );

  const DesktopButton = (
    <Button
      variant='ghost'
      className={'w-28 text-sm'}
    >
      {currentLanguageName}
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{variant === 'mobile' ? MobileButton : DesktopButton}</DropdownMenuTrigger>
      <DropdownMenuContent align='center'>
        {availableLanguages
          .filter((lang) => lang.id !== i18n.language)
          .map((lang) => (
            <DropdownMenuItem
              key={lang.id}
              onClick={() => handleChangeLanguage(lang.id)}
            >
              {lang.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
