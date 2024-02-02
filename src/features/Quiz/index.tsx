import { useTranslation } from 'react-i18next';

import AppHelmet from '@/components/ui/AppHelmet';

const Quiz = () => {
  const { t } = useTranslation();

  return (
    <div
      className={
        'h-body-no-scroll flex w-full items-center justify-center pt-body-start text-7xl font-bold text-muted-foreground'
      }
    >
      <AppHelmet title={t('common:title.quiz')} />
      <div>{t('common:soon')}...</div>
    </div>
  );
};

export default Quiz;
