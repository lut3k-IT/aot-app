'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useApiErrorToast } from '@/components/hooks/useApiErrorToast';
import useAppSelector from '@/components/hooks/useAppSelector';
import useIsLandscape from '@/components/hooks/useIsLandscape';
import DynamicTitle from '@/components/ui/DynamicTitle';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import Pagination from '@/components/ui/Pagination';
import { ElementsIds, Param } from '@/constants/enums';
import {
  selectQuotationsData,
  selectQuotationsError,
  selectQuotationsFavoriteIds,
  selectQuotationsStatus
} from '@/store/quotationsSlice';
import { paginate } from '@/utils/pagination';
import { getBooleanParam, getSafePageNumberFromSearchParam } from '@/utils/paramsHelpers';

import QuotationFilterBar from './components/QuotationFilterBar';
import RenderQuotations from './components/RenderQuotations';
import { filterQuotations } from './utils/quotationsProcessing';
import { QUOTATION_PAGE_SIZES } from './constants';

const Quotations = () => {
  const { t } = useTranslation();
  const isLandscape = useIsLandscape();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const quotations = useAppSelector(selectQuotationsData);
  const favoriteIds = useAppSelector(selectQuotationsFavoriteIds);
  const fetchingStatus = useAppSelector(selectQuotationsStatus);
  const fetchingError = useAppSelector(selectQuotationsError);
  const isLoading = fetchingStatus === 'loading';
  useApiErrorToast(fetchingError);

  const hasData = quotations.length > 0;

  /* --------------------------------- filters -------------------------------- */

  const filteredQuotations = useMemo(() => {
    const search = searchParams.get(Param.SEARCH);
    const hasOnlyFavorites = getBooleanParam(searchParams, Param.FAVORITES);

    return filterQuotations(quotations, { search, hasOnlyFavorites }, favoriteIds);
  }, [quotations, searchParams, favoriteIds]);

  const hasDataToShow = filteredQuotations.length > 0;

  /* ------------------------------- pagination ------------------------------- */

  const [paginatedQuotations, setPaginatedQuotations] = useState(quotations);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationDestination, setPaginationDestination] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPaginationDestination(document.getElementById(ElementsIds.PAGE_PAGINATION));
  }, []);

  useEffect(() => {
    const page = getSafePageNumberFromSearchParam(searchParams);
    const pageSize = Number(searchParams.get(Param.PAGE_SIZE)) || QUOTATION_PAGE_SIZES[0];

    const { items, totalPages } = paginate(filteredQuotations, page, pageSize);
    setPaginatedQuotations(items);
    setTotalPages(totalPages);
  }, [filteredQuotations, searchParams]);

  const createQueryString = useCallback(
    (params: { name: string; value: string | null }[]) => {
      const newParams = new URLSearchParams(searchParams.toString());
      params.forEach(({ name, value }) => {
        if (value === null) {
          newParams.delete(name);
        } else {
          newParams.set(name, value);
        }
      });
      return newParams.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const page = getSafePageNumberFromSearchParam(searchParams);
    const isPageParamOutOfRange = page > totalPages && totalPages !== 0 && filteredQuotations.length > 0;

    if (isPageParamOutOfRange) {
      router.push(pathname + '?' + createQueryString([{ name: Param.PAGE, value: null }]));
    }
  }, [searchParams, filteredQuotations, totalPages, router, pathname, createQueryString]);

  return (
    <>
      <DynamicTitle title={t('common:title.quotations')} />
      <MovingPanel className={isLandscape ? '' : 'md:pt-0'}>
        <PageHeading className={isLandscape ? '' : 'md:pt-0'} />
      </MovingPanel>
      <GalleryWrapper>
        <QuotationFilterBar />
        <RenderQuotations
          quotations={paginatedQuotations}
          favoriteIds={favoriteIds}
          isLoading={isLoading}
          hasData={hasData}
          hasDataToShow={hasDataToShow}
        />
      </GalleryWrapper>
      {hasDataToShow && !isLoading && paginationDestination && createPortal(
        <Pagination
          itemsCount={filteredQuotations.length}
          totalPages={totalPages}
          pageSizeOptions={QUOTATION_PAGE_SIZES}
        />,
        paginationDestination
      )}
    </>
  );
};

export default Quotations;
