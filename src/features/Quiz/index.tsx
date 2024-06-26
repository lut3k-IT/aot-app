import { useTranslation } from 'react-i18next';

import AppHelmet from '@/components/ui/AppHelmet';

const Quiz = () => {
  const { t } = useTranslation();

  return (
    <div className={'flex w-full items-center justify-center pt-body-start text-7xl font-bold text-muted2-foreground'}>
      <AppHelmet title={t('common:title.quiz')} />
      <div className={'mt-32'}>{t('common:soon')}...</div>
    </div>
  );
};

export default Quiz;
