import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { ElementsIds } from '@/constants/enums';

import useIsMobile from '../hooks/useIsMobile';

interface PageHeadingProps {
  year?: number;
  className?: string;
}

const PageHeading = (props: PageHeadingProps) => {
  const { year = 854, className } = props;
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div
      className={classNames(
        'sticky mb-2 flex items-center justify-between bg-background py-4',
        {
          'dark:bg-card': !isMobile
        },
        className
      )}
    >
      <div className={'text-4xl font-bold leading-none tracking-wide text-muted2-foreground'}>
        {t('common:time.year.singular')} {year}
      </div>
      <div id={ElementsIds.PAGE_HEADING_OPTIONS} />
    </div>
  );
};

export default PageHeading;
