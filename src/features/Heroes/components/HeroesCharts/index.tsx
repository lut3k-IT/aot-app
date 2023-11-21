import { useTranslation } from 'react-i18next';

import AppHelmet from '@/components/ui/AppHelmet';

const HeroesCharts = () => {
  const { t } = useTranslation();
  return (
    <div className={'w-full flex justify-center items-center text-7xl font-bold text-muted-foreground'}>
      <AppHelmet title={`${t('common:title.heroes')} ${t('common:tab.charts')}`} />

      <div>Soon...</div>
    </div>
  );
};

export default HeroesCharts;
