import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/react';

import { useToast } from '../hooks/useToast';
import { ToastAction } from './Toast';

const ReloadPrompt = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    needRefresh: [shouldReload, setShouldReload],
    updateServiceWorker
  } = useRegisterSW({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRegistered(r: any) {
      console.log('SW Registered: ' + r);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRegisterError(error: any) {
      console.log('SW registration error', error);
    }
  });

  useEffect(() => {
    if (shouldReload) {
      toast({
        title: t('common:brand'),
        description: t('common:pwa.updateAvailable'),
        action: (
          <ToastAction
            altText={t('common:pwa.reload')}
            onClick={() => {
              updateServiceWorker(true);
              setShouldReload(false);
            }}
          >
            {t('common:pwa.reload')}
          </ToastAction>
        ),
        duration: Infinity
      });
    }
  }, [shouldReload, setShouldReload, t, toast, updateServiceWorker]);

  return null;
};

export default ReloadPrompt;
