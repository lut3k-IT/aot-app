import MbtiChart from './MbtiChart';
import ResidenceChart from './ResidenceChart';
import StatusChart from './StatusChart';

const HeroesCharts = () => {
  return (
    <div className='flex flex-col gap-8'>
      <MbtiChart />
      <ResidenceChart />
      <StatusChart />
    </div>
  );
};

export default HeroesCharts;
