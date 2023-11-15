import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

import { Button } from './Button';
import Icon from './Icon';

interface PaginationProps {
  itemsCount: number;
  page: number;
  setPage: (v: number) => void;
  totalPages: number;
  pageSizeOptions?: number[];
  pageSize: number;
  setPageSize: (v: number) => void;
}

export const DEFAULT_PAGE_SIZES = [50, 100, 200];

const NewPagination = (props: PaginationProps) => {
  const { itemsCount, page, setPage, totalPages, pageSizeOptions = DEFAULT_PAGE_SIZES, pageSize, setPageSize } = props;
  const { t } = useTranslation();

  const firstElement = page * pageSize - pageSize + 1;
  const lastElement = page !== totalPages ? page * pageSize : itemsCount;

  const handleChangePage = (newPage: number) => {
    if (newPage < 1) {
      setPage(1);
      return;
    }
    if (newPage > totalPages) {
      setPage(totalPages);
      return;
    }

    setPage(newPage);
  };

  const handleChangePageSize = (v: string) => {
    setPage(1);
    setPageSize(+v || pageSizeOptions[0]);
  };

  return (
    <div className={'flex gap-4 justify-between items-center'}>
      <div className={'flex gap-2'}>
        <Select
          value={pageSize.toString()}
          onValueChange={(v: string) => handleChangePageSize(v)}
        >
          <SelectTrigger className='w-[72px] h-9'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {pageSizeOptions.map((size) => (
                <SelectItem
                  key={v4()}
                  value={size.toString()}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <p className={'text-sm'}>{`${firstElement}-${lastElement} ${t('common:preposition.of')} ${itemsCount}`}</p>
      <div className={'flex gap-1'}>
        <Button
          variant={'outline'}
          size={'icon'}
          className={'w-9 h-9'}
          iconName={'chevronFirst'}
          onClick={() => setPage(1)}
        />
        <Button
          variant={'outline'}
          size={'icon'}
          className={'w-9 h-9'}
          iconName={'chevronLeft'}
          onClick={() => handleChangePage(page - 1)}
        />
        <Button
          variant={'outline'}
          size={'icon'}
          className={'w-9 h-9'}
          iconName={'chevronRight'}
          onClick={() => handleChangePage(page + 1)}
        />
        <Button
          variant={'outline'}
          size={'icon'}
          className={'w-9 h-9'}
          iconName={'chevronLast'}
          onClick={() => setPage(totalPages)}
        />
      </div>
    </div>
  );
};

export default NewPagination;
