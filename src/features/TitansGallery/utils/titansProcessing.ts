import { SortDirection } from '@/constants/enums';
import { FavoriteType, TitanFilters, TitanType } from '@/constants/types';

type SortType = number | string | null;

const sortWithNullsLast = (a: SortType, b: SortType) => {
  if (a === null) return 1;
  if (b === null) return -1;
  return a < b ? -1 : a > b ? 1 : 0;
};

const sortWithNullsLastDesc = (a: SortType, b: SortType) => {
  if (a === null) return 1;
  if (b === null) return -1;
  return a < b ? 1 : a > b ? -1 : 0;
};

export const filterTitans = (data: TitanType[], filters: TitanFilters, favoriteTitanIds?: FavoriteType[]) => {
  const lowerCaseSearch = filters.search?.toLowerCase() ?? '';
  const favoriteIdsSet = new Set(favoriteTitanIds);
  const allegianceFilter = new Set(filters.allegiance);

  const filteredData = data.filter((titan) => {
    if (filters.hasOnlyFavorites && !favoriteIdsSet.has(titan.id)) return false;

    if (lowerCaseSearch) {
      const searchableText = [titan.name, ...titan.otherNames].join(' ').toLowerCase();
      if (!searchableText.includes(lowerCaseSearch)) return false;
    }

    if (allegianceFilter.size > 0) {
      const hasMatchingAllegiance = titan.allegiance.some((a) => allegianceFilter.has(a));
      if (!hasMatchingAllegiance) return false;
    }

    return true;
  });

  /* ---------------------------------- Sort ---------------------------------- */
  const sort = filters.sort;
  const sortDirection = filters.sortDirection;

  const shouldSkipDefaultSort = sort === 'id' && sortDirection === SortDirection.ASC;

  if (shouldSkipDefaultSort) return filteredData;

  return [...filteredData].sort((a, b) =>
    sortDirection === SortDirection.ASC
      ? sortWithNullsLast(a[sort], b[sort])
      : sortWithNullsLastDesc(a[sort], b[sort])
  );
};
