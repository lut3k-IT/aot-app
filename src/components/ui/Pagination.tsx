'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Param } from '@/constants/enums';
import { cn } from '@/lib/utils';
import { scrollToTop } from '@/utils/helpers';
import { getSafePageNumberFromSearchParam } from '@/utils/paramsHelpers';

import { Button } from './Button';

interface PaginationProps {
  itemsCount: number;
  totalPages: number;
  pageSizeOptions?: number[];
  className?: string;
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZES = [50, 100, 200];

const Pagination = (props: PaginationProps) => {
  const { itemsCount, totalPages, pageSizeOptions = DEFAULT_PAGE_SIZES, className } = props;

  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = getSafePageNumberFromSearchParam(searchParams);
  const pageSize = Number(searchParams.get(Param.PAGE_SIZE)) || DEFAULT_PAGE_SIZES[0];

  const firstElement = page * pageSize - pageSize + 1;
  const lastElement = page !== totalPages ? page * pageSize : itemsCount;

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

  /* -------------------------------- handlers -------------------------------- */

  const handleChangePage = (newPage: number) => {
    if (newPage <= 1) {
      router.push(pathname + '?' + createQueryString([{ name: Param.PAGE, value: null }]));
      return;
    }
    if (newPage > totalPages) {
      router.push(pathname + '?' + createQueryString([{ name: Param.PAGE, value: totalPages.toString() }]));
      return;
    }
    page !== newPage && scrollToTop();
    router.push(pathname + '?' + createQueryString([{ name: Param.PAGE, value: newPage.toString() }]));
  };

  const handleChangePageSize = (pageSize: string) => {
    const params: { name: string; value: string | null }[] = [{ name: Param.PAGE, value: null }];
    if (+pageSize !== DEFAULT_PAGE_SIZES[0]) {
      params.push({ name: Param.PAGE_SIZE, value: pageSize });
    } else {
      params.push({ name: Param.PAGE_SIZE, value: null });
    }
    router.push(pathname + '?' + createQueryString(params));
  };

  return (
    <div className={cn('mt-2 flex h-9 items-center justify-between gap-4', className)}>
      <div className={'flex gap-2'}>
        <Select
          value={pageSize.toString()}
          onValueChange={(v: string) => handleChangePageSize(v)}
        >
          <SelectTrigger className='h-9 w-[4.5rem]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {pageSizeOptions.map((size, i) => (
                <SelectItem
                  key={i}
                  value={size.toString()}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <p className={'text-sm'}>{`${firstElement}–${lastElement} ${t('common:preposition.of')} ${itemsCount}`}</p>
      <div className={'flex gap-1'}>
        <Button
          variant={'outline'}
          size={'icon'}
          className={'h-9 w-9'}
          iconName={'chevronFirst'}
          onClick={() => {
            page !== 1 && scrollToTop();
            handleChangePage(1);
          }}
          aria-label={t('common:ui.pagination.firstPage')}
        />
        <Button
          variant={'outline'}
          size={'icon'}
          className={'h-9 w-9'}
          iconName={'chevronLeft'}
          onClick={() => handleChangePage(page - 1)}
          aria-label={t('common:ui.pagination.previousPage')}
        />
        <Button
          variant={'outline'}
          size={'icon'}
          className={'h-9 w-9'}
          iconName={'chevronRight'}
          onClick={() => handleChangePage(page + 1 < totalPages ? page + 1 : totalPages)}
          aria-label={t('common:ui.pagination.nextPage')}
        />
        <Button
          variant={'outline'}
          size={'icon'}
          className={'h-9 w-9'}
          iconName={'chevronLast'}
          onClick={() => {
            page !== totalPages && scrollToTop();
            handleChangePage(totalPages);
          }}
          aria-label={t('common:ui.pagination.lastPage')}
        />
      </div>
    </div>
  );
};

export default Pagination;
