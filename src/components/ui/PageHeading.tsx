import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { YEAR } from '@/constants/constants';
import { ElementsIds } from '@/constants/enums';

import useIsLandscape from '../hooks/useIsLandscape';

interface PageHeadingProps {
  year?: number;
  className?: string;
}

/**
 * Rok i pasek filtrów stoją w jednym rzędzie na każdej szerokości. Wcześniej poniżej `md`
 * układ przechodził w kolumnę, przez co na telefonie rok zjadał cały wiersz, a filtry
 * spadały pod niego.
 *
 * Rząd jest kontenerem `heading`, więc rok skaluje się względem miejsca, które realnie ma,
 * a nie względem szerokości okna. To istotne, bo na desktopie treść dzieli miejsce
 * z panelem bocznym i samo okno nic o tym nie mówi.
 *
 * Kontener `bar` to już miejsce zostawione filtrom; to względem niego pasek decyduje,
 * które kontrolki pokazać w pełnej formie (patrz FilterToggle i HeroFilterBar).
 */
const PageHeading = (props: PageHeadingProps) => {
  const { year = YEAR, className } = props;
  const { t } = useTranslation();
  const isLandscape = useIsLandscape();

  return (
    <div
      className={classNames(
        '@container/heading sticky mb-2 flex items-center gap-3 bg-background py-2 md:py-4',
        {
          'gap-2! py-1!': isLandscape
        },
        className
      )}
    >
      {/*
        Poniżej 20rem rzędu rok znika. To ostatnia deska ratunku dla najwęższych telefonów:
        etykieta bierze tam 80 z 288 px i wyszukiwarce zostaje sama lupka. Rok jest ozdobnikiem,
        filtry są funkcją, więc w tym jednym przypadku ustępuje. Od 20rem w górę jest zawsze.
      */}
      <div
        suppressHydrationWarning
        className={
          'shrink-0 text-xl font-bold leading-none tracking-wide text-subtle-foreground @max-xs/heading:hidden @sm/heading:text-2xl @lg/heading:text-3xl @2xl/heading:text-4xl'
        }
      >
        {t('common:time.year.singular')} {year}
      </div>
      <div
        id={ElementsIds.PAGE_HEADING_OPTIONS}
        className={'@container/bar min-w-0 flex-1'}
      />
    </div>
  );
};

export default PageHeading;
