'use client';

import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import heroes from '@/data/heroes';
import statuses from '@/data/statuses';

const statusCounts = heroes.reduce(
  (acc, hero) => {
    if (hero.status) {
      acc[hero.status] = (acc[hero.status] || 0) + 1;
    }
    return acc;
  },
  {} as Record<string, number>
);

const StatusChart = () => {
  const { t } = useTranslation();

  const chartData = statuses.map((status) => ({
    name: t(`data:status.${status.keyName}.short`),
    count: statusCounts[status.id] || 0
  }));

  const chartConfig = {
    count: {
      label: t('charts:statusChart.count'),
      color: 'hsl(var(--primary))'
    }
  } satisfies ChartConfig;

  return (
    <div className='flex flex-col gap-4'>
      <div className='space-y-1'>
        <h2>{t('charts:statusChart.title')}</h2>
        <p className='text-muted-foreground'>{t('charts:statusChart.description')}</p>
      </div>
      <ChartContainer
        config={chartConfig}
        className={'h-96 w-full'}
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
    </div>
  );
};

export default StatusChart;
