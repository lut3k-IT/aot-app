import { useTranslation } from 'react-i18next';

import AppHelmet from '@/components/ui/AppHelmet';

import MbtiChart from './MbtiChart';

const HeroesCharts = () => {
  const { t } = useTranslation();

  return (
    <div>
      <AppHelmet title={`${t('common:title.heroes')} ${t('common:tab.charts')}`} />
      <MbtiChart />
    </div>
  );
};

export default HeroesCharts;
