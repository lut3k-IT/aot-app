import { useTranslation } from 'react-i18next';

import AppHelmet from '@/components/ui/AppHelmet';

const Quiz = () => {
  const { t } = useTranslation();
  return (
    <div
      className={
        'w-full h-body-no-scroll pt-body-start flex justify-center items-center text-7xl font-bold text-muted-foreground'
      }
    >
      <AppHelmet title={t('common:title.quiz')} />
      <div>Soon...</div>
    </div>
  );
};

export default Quiz;
