import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { useToast } from '@/components/hooks/useToast';
import { Device, LanguageShortName, LocalStorageKey } from '@/constants/enums';
import { LANGUAGE_OPTIONS } from '@/i18n/config';
import { loadLanguageResources } from '@/i18n/loadLanguage';
import { loadQuotations } from '@/store/quotationsSlice';
import { setLocalStorageItem } from '@/utils/storageHelpers';

import 'dayjs/locale/en';
import 'dayjs/locale/pl';

import useAppDispatch from '../hooks/useAppDispatch';
import { Button } from './Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './DropdownMenu';
import Icon from './Icon';

interface LanguageSwitcherProps {
  variant?: Device;
}

const LanguageSwitcher = (props: LanguageSwitcherProps) => {
  const { variant = Device.MOBILE } = props;
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [loadingLanguage, setLoadingLanguage] = useState<LanguageShortName | null>(null);

  const currentLanguage = (i18n.resolvedLanguage || i18n.language) as LanguageShortName;

  useEffect(() => {
    dispatch(loadQuotations());
  }, [i18n.language, dispatch]);

  useEffect(() => {
    if (typeof document !== 'undefined' && currentLanguage) {
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  const handleChangeLanguage = async (language: LanguageShortName) => {
    if (loadingLanguage || language === currentLanguage) return;

    setLoadingLanguage(language);

    try {
      await loadLanguageResources(language);
      await i18n.changeLanguage(language);
      dayjs.locale(language);
      setLocalStorageItem(LocalStorageKey.LANGUAGE, language);
    } catch {
      toast({ title: t('notifications:error.languageLoadFailed') });
    } finally {
      setLoadingLanguage(null);
    }
  };

  const currentLanguageName =
    LANGUAGE_OPTIONS.find((option) => option.id === currentLanguage)?.label || LANGUAGE_OPTIONS[0].label;

  const buttonProps =
    variant === Device.MOBILE
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
      <DropdownMenuContent
        align='center'
        className={'max-h-72 overflow-y-auto'}
      >
        {/* Biezacy jezyk jest pogrubiony, a nie usuwany z listy — przy dwunastu pozycjach
            ukrywanie jednej z nich dezorientuje. */}
        {LANGUAGE_OPTIONS.map((language) => (
          <DropdownMenuItem
            key={language.id}
            disabled={loadingLanguage !== null}
            onSelect={(event) => {
              event.preventDefault();
              handleChangeLanguage(language.id);
            }}
            className={language.id === currentLanguage ? 'font-semibold' : undefined}
          >
            <span className={'flex-1'}>{language.label}</span>
            {loadingLanguage === language.id && (
              <Icon
                name={'loader2'}
                size={'xs'}
                className={'ml-2 animate-spin'}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
