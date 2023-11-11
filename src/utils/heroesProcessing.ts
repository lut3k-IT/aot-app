import { HeroFilterNames, SortDirection } from '@/constants/enums';
import { HeroFilters, HeroType } from '@/constants/types';
import { DEFAULT_AGE } from '@/features/Heroes/components/HeroesGallery/components/Filter';

// status: StatusType[];
// age: number[];
// height: number[];
// weight: number[];
// mbti: MbtiType[];
// species: SpeciesType[];
// residences: ResidenceType[];
// hasAge: boolean;
// hasHeight: boolean;
// hasWeight: boolean;

export const getFilteredHeroes = (data: HeroType[], filters: HeroFilters) => {
  /* --------------------------------- Filter --------------------------------- */
  const filteredData = data.filter((hero) => {
    const matchHasAge = !(filters.filters.hasAge && !hero.age);
    const matchHasHeight = !(filters.filters.hasHeight && !hero.height);
    const matchHasWeight = !(filters.filters.hasWeight && !hero.weight);

    const isAgeFilterSameAsDefault =
      filters.filters.age[0] === DEFAULT_AGE[0] && filters.filters.age[1] === DEFAULT_AGE[1];
    const isHeightFilterSameAsDefault =
      filters.filters.age[0] === DEFAULT_AGE[0] && filters.filters.age[1] === DEFAULT_AGE[1];
    const isWeightFilterSameAsDefault =
      filters.filters.age[0] === DEFAULT_AGE[0] && filters.filters.age[1] === DEFAULT_AGE[1];

    // for not changing the slider, values with null will also appear
    const matchAge = !isAgeFilterSameAsDefault
      ? hero.age
        ? hero.age >= filters.filters.age[0] && hero.age <= filters.filters.age[1]
        : false
      : true;
    const matchHeight = isHeightFilterSameAsDefault
      ? hero.height
        ? hero.height >= filters.filters.height[0] && hero.height <= filters.filters.height[1]
        : false
      : true;
    const matchWeight = isWeightFilterSameAsDefault
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

    return (
      matchHasAge &&
      matchHasHeight &&
      matchHasWeight &&
      matchAge &&
      matchHeight &&
      matchWeight &&
      matchStatus &&
      matchMbti &&
      matchSpecies &&
      matchResidences
    );
  });

  /* ---------------------------------- Sort ---------------------------------- */

  const sortFilter = filters.sort;
  let sortBy: keyof HeroType;

  if (sortFilter) {
    switch (sortFilter) {
      case HeroFilterNames.AGE:
        sortBy = 'age';
        break;
      case HeroFilterNames.HEIGHT:
        sortBy = 'height';
        break;
      case HeroFilterNames.WEIGHT:
        sortBy = 'weight';
        break;
      case HeroFilterNames.STATUS:
        sortBy = 'status';
        break;
      case HeroFilterNames.MBTI:
        sortBy = 'mbti';
        break;
      case HeroFilterNames.SPECIES:
        sortBy = 'species';
        break;
      case HeroFilterNames.RESIDENCE:
        sortBy = 'residence';
        break;
      default:
        break;
    }
  }

  // const sortedData =
  //   sortFilter &&
  //   filteredData.sort((a, b) => {
  //     return filters.sortDirection === SortDirection.ASC ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
  //   });

  return filteredData;
};
