import { useTranslation } from 'react-i18next';

import { ElementsIds } from '@/constants/enums';

interface PageHeadingProps {
  year?: number;
}

const PageHeading = (props: PageHeadingProps) => {
  const { year = 854 } = props;
  const { t } = useTranslation();

  return (
    <div className={'sticky mb-2 flex items-center justify-between bg-background py-4'}>
      <div className={'text-muted2-foreground text-4xl font-bold leading-none tracking-wide'}>
        {t('common:time.year.singular')} {year}
      </div>
      <div id={ElementsIds.PAGE_HEADING_OPTIONS} />
    </div>
  );
};

export default PageHeading;
