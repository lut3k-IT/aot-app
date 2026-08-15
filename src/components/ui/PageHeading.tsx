import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { useLayoutVariant } from '@/components/providers/LayoutVariantProvider';
import { YEAR } from '@/constants/constants';
import { ElementsIds } from '@/constants/enums';
import { isOpenShellVariant } from '@/constants/layoutVariants';

import useIsLandscape from '../hooks/useIsLandscape';
import useIsMobileOrLandscape from '../hooks/useIsMobileOrLandscape';

interface PageHeadingProps {
  year?: number;
  className?: string;
}

const PageHeading = (props: PageHeadingProps) => {
  const { year = YEAR, className } = props;
  const { t } = useTranslation();
  const isMobileLandscape = useIsMobileOrLandscape();
  const isLandscape = useIsLandscape();

  const { variant } = useLayoutVariant();
  const isOpenShell = isOpenShellVariant(variant);

  return (
    <div
      className={classNames(
        'sticky mb-2 flex flex-col gap-3 bg-background py-2 md:flex-row md:items-center md:justify-between md:py-4',
        {
          // Tło karty tylko wtedy, gdy treść faktycznie leży na karcie.
          'md:dark:bg-card': !isMobileLandscape && !isOpenShell,
          '!gap-1 !py-1': isLandscape
        },
        className
      )}
    >
      <div
        suppressHydrationWarning
        className={'text-4xl font-bold leading-none tracking-wide text-subtle-foreground'}
      >
        {t('common:time.year.singular')} {year}
      </div>
      <div id={ElementsIds.PAGE_HEADING_OPTIONS} />
    </div>
  );
};

export default PageHeading;
