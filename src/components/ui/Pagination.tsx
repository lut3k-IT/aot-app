import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Param } from '@/constants/enums';
import { cn } from '@/lib/utils';
import { scrollToTop } from '@/utils/helpers';
import { deleteSomeSearchParams, getSafePageNumberFromSearchParam } from '@/utils/paramsHelpers';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const page = getSafePageNumberFromSearchParam(searchParams);
  const pageSize = Number(searchParams.get(Param.PAGE_SIZE)) || DEFAULT_PAGE_SIZES[0];

  const firstElement = page * pageSize - pageSize + 1;
  const lastElement = page !== totalPages ? page * pageSize : itemsCount;

  /* -------------------------------- handlers -------------------------------- */

  const handleChangePage = (newPage: number) => {
    if (newPage <= 1) {
      deleteSomeSearchParams(setSearchParams, [Param.PAGE]);
      return;
    }
    if (newPage > totalPages) {
      setSearchParams((searchParams) => {
        searchParams.set(Param.PAGE, totalPages.toString());
        return searchParams;
      });
      return;
    }
    page !== newPage && scrollToTop();
    setSearchParams((searchParams) => {
      searchParams.set(Param.PAGE, newPage.toString());
      return searchParams;
    });
  };

  const handleChangePageSize = (pageSize: string) => {
    setSearchParams((searchParams) => {
      searchParams.delete(Param.PAGE);
      +pageSize !== DEFAULT_PAGE_SIZES[0]
        ? searchParams.set(Param.PAGE_SIZE, pageSize)
        : searchParams.delete(Param.PAGE_SIZE);
      return searchParams;
    });
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
