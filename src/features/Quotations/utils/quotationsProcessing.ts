import { FavoriteType, QuotationFilters, QuotationType } from '@/constants/types';

export const filterQuotations = (
  data: QuotationType[],
  filters: QuotationFilters,
  favoriteIds?: FavoriteType[]
) => {
  const lowerCaseSearch = filters.search?.toLowerCase() ?? '';
  const favoriteIdsSet = new Set(favoriteIds);

  return data.filter((quotation) => {
    if (filters.hasOnlyFavorites && !favoriteIdsSet.has(quotation.id)) return false;

    if (lowerCaseSearch) {
      if (!quotation.text.toLowerCase().includes(lowerCaseSearch)) return false;
    }

    return true;
  });
};
