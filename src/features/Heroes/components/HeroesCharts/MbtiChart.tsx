import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import heroes from '@/data/heroes';
import mbtiData from '@/data/mbti';

const MbtiChart = () => {
  const { t } = useTranslation();

  const chartConfig = {
    count: {
      label: t('charts:mbtiChart.count'),
      color: 'hsl(var(--primary))'
    }
  } satisfies ChartConfig;

  const mbtiCounts = heroes.reduce(
    (acc, hero) => {
      if (hero.mbti) {
        acc[hero.mbti] = (acc[hero.mbti] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = mbtiData.map((mbti) => ({
    name: mbti.shortName,
    count: mbtiCounts[mbti.id] || 0
  }));

  return (
    <>
      <h2>{t('charts:mbtiChart.title')}</h2>
      <p>{t('charts:mbtiChart.description')}</p>
      <ChartContainer
        config={chartConfig}
        className={'mt-8 h-96 w-full'}
      >
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: -30,
            bottom: 5
          }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray='3 3'
          />
          <XAxis
            dataKey='name'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey='count'
            radius={4}
            fill='var(--color-count)'
          />
        </BarChart>
      </ChartContainer>
    </>
  );
};

export default MbtiChart;
