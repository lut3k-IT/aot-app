import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { toast } from './useToast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApiErrorToast = (fetchingError: any) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (fetchingError) {
      toast({
        variant: 'destructive',
        title: t('notifications:error.somethingWentWrong'),
        description: t('notifications:error.tryAgainLater')
      });
    }
  }, [fetchingError, t]);
};
