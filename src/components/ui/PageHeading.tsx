import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { YEAR } from '@/constants/constants';
import { ElementsIds } from '@/constants/enums';

import useIsLandscape from '../hooks/useIsLandscape';
import useIsMobileLandscape from '../hooks/useIsMobileLandscape';

interface PageHeadingProps {
  year?: number;
  className?: string;
}

const PageHeading = (props: PageHeadingProps) => {
  const { year = YEAR, className } = props;
  const { t } = useTranslation();
  const isMobileLandscape = useIsMobileLandscape();
  const isLandscape = useIsLandscape();

  return (
    <div
      className={classNames(
        'sticky mb-2 flex items-center justify-between bg-background py-4',
        {
          'md:dark:bg-card': !isMobileLandscape,
          '!py-2': isLandscape
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
