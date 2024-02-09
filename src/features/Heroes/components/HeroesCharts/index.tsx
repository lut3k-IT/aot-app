import { useTranslation } from 'react-i18next';

import AppHelmet from '@/components/ui/AppHelmet';

const HeroesCharts = () => {
  const { t } = useTranslation();

  return (
    <div className={'flex w-full items-center justify-center text-7xl font-bold text-muted2-foreground'}>
      <AppHelmet title={`${t('common:title.heroes')} ${t('common:tab.charts')}`} />

      <div>{t('common:soon')}...</div>
    </div>
  );
};

export default HeroesCharts;
