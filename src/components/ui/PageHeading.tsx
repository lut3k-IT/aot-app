import { useTranslation } from 'react-i18next';

import { YEAR } from '@/constants/constants';
import { ElementsIds } from '@/constants/enums';
import { cn } from '@/lib/utils';

interface PageHeadingProps {
  year?: number;
  className?: string;
}

const PageHeading = (props: PageHeadingProps) => {
  const { year = YEAR, className } = props;
  const { t } = useTranslation();

  return (
    <div className={cn('sticky mb-2 flex items-center justify-between bg-background py-4 md:dark:bg-card', className)}>
      <div className={'text-4xl font-bold leading-none tracking-wide text-muted2-foreground'}>
        {t('common:time.year.singular')} {year}
      </div>
      <div id={ElementsIds.PAGE_HEADING_OPTIONS} />
    </div>
  );
};

export default PageHeading;
