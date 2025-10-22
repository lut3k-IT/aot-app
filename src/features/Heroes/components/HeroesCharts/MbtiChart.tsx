import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import heroes from '@/data/heroes';
import mbtiData from '@/data/mbti';

const chartConfig = {
  count: {
    label: 'Count',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

const MbtiChart = () => {
  const mbtiCounts = heroes.reduce(
    (acc, hero) => {
      if (hero.mbti) {
        acc[hero.mbti] = (acc[hero.mbti] || 0) + 1;
      }
      return acc;
    },
    {} as Record<number, number>
  );

  const chartData = mbtiData.map((mbti) => ({
    name: mbti.shortName,
    count: mbtiCounts[mbti.id] || 0,
    fill: 'var(--color-count)'
  }));

  return (
    <div>
      <h2 className={'text-xl font-bold'}>MBTI Personality Types Distribution</h2>
      <p>A chart showing the distribution of MBTI personality types among the characters.</p>
      <ChartContainer
        config={chartConfig}
        className={'mt-8 h-96 w-full'}
      >
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
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
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default MbtiChart;
