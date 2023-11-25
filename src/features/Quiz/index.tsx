import { useTranslation } from 'react-i18next';

import AppHelmet from '@/components/ui/AppHelmet';

const Quiz = () => {
  const { t } = useTranslation();
  return (
    <div
      className={
        'h-body-no-scroll flex w-full items-center justify-center pt-body-start text-7xl font-bold text-muted-foreground'
      }
    >
      <AppHelmet title={t('common:title.quiz')} />
      <div>Soon...</div>
      <div>
        <div className={'bg-muted text-muted-foreground'}>muted</div>
        <div className={'bg-accent text-accent-foreground'}>accent</div>
        <div className={'bg-card text-card-foreground'}>card</div>
        <div className={'bg-popover text-popover-foreground'}>popover</div>
        <div className={'bg-primary text-primary-foreground'}>primary</div>
        <div className={'bg-secondary text-secondary-foreground'}>secondary</div>
        <div className={'bg-destructive text-destructive-foreground'}>destructive</div>
      </div>
    </div>
  );
};

export default Quiz;
