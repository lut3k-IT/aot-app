import { useTranslation } from 'react-i18next';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/AlertDialog';

const LaunchDialog = () => {
  const { t } = useTranslation();

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('notifications:launchDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('notifications:launchDialog.description1')}
            <br />
            <br />
            {t('notifications:launchDialog.description2')}
            <br />
            <br />
            {t('notifications:launchDialog.description3')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>{t('common:action.continue')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LaunchDialog;
