import { SortDirection } from '@/constants/enums';
import { TitanSortOption } from '@/constants/types';

export const TITAN_SORT_OPTIONS: TitanSortOption[] = ['id', 'name', 'height'];

export const DEFAULT_TITAN_SORT: TitanSortOption = 'id';
export const DEFAULT_TITAN_SORT_DIRECTION = SortDirection.ASC;
