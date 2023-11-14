import ReactPaginate from 'react-paginate';
import { v4 } from 'uuid';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

interface PaginationProps {
  itemsCount: number;
  page: number;
  setPage: (v: number) => void;
  totalPages: number;
  pageSizeOptions?: number[];
  pageSize: number;
  setPageSize: (v: number) => void;
}

type ClickType = {
  selected: number;
};

export const DEFAULT_PAGE_SIZES = [50, 100, 200];

const Pagination = (props: PaginationProps) => {
  const { itemsCount, page, setPage, totalPages, pageSizeOptions = DEFAULT_PAGE_SIZES, pageSize, setPageSize } = props;

  const handlePageClick = ({ selected }: ClickType) => {
    if (selected + 1 < 1) return;
    setPage(selected + 1);
  };

  return (
    <div className={'flex gap-4 justify-between'}>
      <Select
        value={pageSize.toString()}
        onValueChange={(v: string) => setPageSize(+v || pageSizeOptions[0])}
      >
        <SelectTrigger className='w-20'>
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
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageClick}
        breakLabel='...'
        nextLabel={'>'}
        previousLabel={'<'}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
        // class names
        containerClassName='flex w-full gap-2'
        pageClassName='w-8 h-10 border rounded-md flex-center'
        previousClassName='w-8 border rounded-md flex-center'
        nextClassName='w-8 border rounded-md flex-center'
        pageLinkClassName=''
        previousLinkClassName=''
        nextLinkClassName=''
        breakClassName=''
        breakLinkClassName=''
        activeClassName=''
      />
    </div>
  );
};

export default Pagination;
