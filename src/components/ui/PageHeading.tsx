import { Button } from './Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './dropdown-menu';

interface PageHeadingProps {}

const PageHeading = (props: PageHeadingProps) => {
  const {} = props;

  return (
    <div className={'flex justify-between items-center sticky py-3 mb-2'}>
      <div className={'font-bold text-4xl text-neutral-300 leading-none tracking-wide'}>Year 956</div>
      <div
        id={'page-heading-options'}
        className={''}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size={'icon'}
              iconName={'filter'}
              variant={'outline'}
              // iconProps={{ className: 'text-neutral-300' }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align={'end'}>
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
            // checked={showStatusBar}
            // onCheckedChange={setShowStatusBar}
            >
              Alive
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Dead</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Residence</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem>Wall Rose</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>In favorites</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
            // value={position}
            // onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value='all'>All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='favorites'>Favorites</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='noFavorites'>Not favorites</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PageHeading;
