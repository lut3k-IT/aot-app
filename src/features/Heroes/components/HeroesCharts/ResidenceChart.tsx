'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Param, RoutePath } from '@/constants/enums';
import heroes from '@/data/heroes';
import residences from '@/data/residences';

const residenceCounts = heroes.reduce(
  (acc, hero) => {
    if (hero.residence) {
      acc[hero.residence] = (acc[hero.residence] || 0) + 1;
    }
    return acc;
  },
  {} as Record<string, number>
);

const ResidenceChart = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const chartData = residences.map((residence) => ({
    name: t(`data:residence.${residence.keyName}`),
    count: residenceCounts[residence.id] || 0,
    keyName: residence.keyName
  }));

  const chartConfig = {
    count: {
      label: t('charts:residenceChart.count'),
      color: 'hsl(var(--primary))'
    }
  } satisfies ChartConfig;

  return (
    <div className='flex flex-col gap-4'>
      <div className='space-y-1'>
        <h2>{t('charts:residenceChart.title')}</h2>
        <p className='text-muted-foreground'>{t('charts:residenceChart.description')}</p>
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
            className='cursor-pointer'
            onClick={(data) => {
              router.push(`${RoutePath.HEROES}?${Param.RESIDENCE}=${data.keyName}`);
            }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ResidenceChart;
