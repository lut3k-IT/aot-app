import { SortDirection } from '@/constants/enums';
import { HeroFilters, HeroType } from '@/constants/types';
import {
  DEFAULT_AGE,
  DEFAULT_HEIGHT,
  DEFAULT_WEIGHT
} from '@/features/Heroes/components/HeroesGallery/components/Filter/helpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortWithNullsLast = (a: any, b: any) => {
  if (a === null) return 1;
  if (b === null) return -1;
  return a < b ? -1 : a > b ? 1 : 0;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortWithNullsLastDesc = (a: any, b: any) => {
  if (a === null) return 1;
  if (b === null) return -1;
  return a < b ? 1 : a > b ? -1 : 0;
};

export const getFilteredHeroes = (data: HeroType[], filters: HeroFilters) => {
  /* --------------------------------- Filter --------------------------------- */
  const filteredData = data.filter((hero) => {
    const isAgeFilterSameAsDefault =
      filters.filters.age[0] === DEFAULT_AGE[0] && filters.filters.age[1] === DEFAULT_AGE[1];
    const isHeightFilterSameAsDefault =
      filters.filters.height[0] === DEFAULT_HEIGHT[0] && filters.filters.height[1] === DEFAULT_HEIGHT[1];
    const isWeightFilterSameAsDefault =
      filters.filters.weight[0] === DEFAULT_WEIGHT[0] && filters.filters.weight[1] === DEFAULT_WEIGHT[1];

    // for not changing the slider, values with null will also appear
    const matchAge = !isAgeFilterSameAsDefault
      ? hero.age
        ? hero.age >= filters.filters.age[0] && hero.age <= filters.filters.age[1]
        : false
      : true;
    const matchHeight = !isHeightFilterSameAsDefault
      ? hero.height
        ? hero.height >= filters.filters.height[0] && hero.height <= filters.filters.height[1]
        : false
      : true;
    const matchWeight = !isWeightFilterSameAsDefault
      ? hero.weight
        ? hero.weight >= filters.filters.weight[0] && hero.weight <= filters.filters.weight[1]
        : false
      : true;

    const matchStatus =
      filters.filters.status.length > 0 ? !!filters.filters.status.find((status) => status.id === hero.status) : true;
    const matchMbti =
      filters.filters.mbti.length > 0 ? !!filters.filters.mbti.find((mbti) => mbti.id === hero.mbti) : true;
    const matchSpecies =
      filters.filters.species.length > 0
        ? !!filters.filters.species.find((species) => species.id === hero.species)
        : true;
    const matchResidences =
      filters.filters.residences.length > 0
        ? !!filters.filters.residences.find((residences) => residences.id === hero.residence)
        : true;

    const matchHasAge = !(filters.filters.hasAge && !hero.age);
    const matchHasHeight = !(filters.filters.hasHeight && !hero.height);
    const matchHasWeight = !(filters.filters.hasWeight && !hero.weight);

    return (
      matchAge &&
      matchHeight &&
      matchWeight &&
      matchStatus &&
      matchMbti &&
      matchSpecies &&
      matchResidences &&
      matchHasAge &&
      matchHasHeight &&
      matchHasWeight
    );
  });

  /* ---------------------------------- Sort ---------------------------------- */
  const sort = filters.sort;
  const sortDirection = filters.sortDirection;

  const sortedData =
    sort === 'id'
      ? filteredData.sort((a, b) =>
          sortDirection === SortDirection.ASC
            ? sortWithNullsLast(a[sort], b[sort])
            : sortWithNullsLastDesc(a[sort], b[sort])
        )
      : filteredData;

  return sortedData;
};
