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

  const buttonProps =
    variant === 'mobile'
      ? {
          variant: 'outline' as const,
          className: 'w-min'
        }
      : {
          variant: 'ghost' as const,
          className: 'w-28 text-sm'
        };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={currentLanguageName}
          {...buttonProps}
        >
          {currentLanguageName}
        </Button>
      </DropdownMenuTrigger>
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
