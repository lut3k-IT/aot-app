import { SortDirection } from '@/constants/enums';
import { HeroSortOption } from '@/constants/types';

export const sortOptions: HeroSortOption[] = [
  'id',
  'firstName',
  'lastName',
  'status',
  'age',
  'height',
  'weight',
  'mbti',
  'species',
  'residence'
];

export const DEFAULT_AGE = [0, 75];
export const DEFAULT_HEIGHT = [100, 700];
export const DEFAULT_WEIGHT = [40, 150];
export const DEFAULT_SORT = sortOptions[0];
export const DEFAULT_SORT_DIRECTION = SortDirection.ASC;
