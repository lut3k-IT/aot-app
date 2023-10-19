import { useEffect } from 'react';

import AppHelmet from '@/components/ui/AppHelmet';
import { LocalStorageKey } from '@/constants';
import i18n from '@/i18n/i18n';
import { getLocalStorageItem } from '@/utils/storage';

// perform code once the app is loaded

const Init = () => {
  // useEffect(() => {
  //   handleInit();
  // }, []);

  // const handleInit = () => {
  //   i18n.changeLanguage(String(getLocalStorageItem(LocalStorageKey.LANGUAGE)));
  // };

  return (
    <>
      <AppHelmet />
    </>
  );
};

export default Init;
