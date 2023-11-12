import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import useAppSelector from '@/components/hooks/useAppSelector';
import AppHelmet from '@/components/ui/AppHelmet';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import HeroCard from '@/components/ui/HeroCard';
import { ElementsIds, Param, SortDirection } from '@/constants/enums';
import { HeroFilterCriteria, HeroFilters, HeroSortOption } from '@/constants/types';
import {
  getMbtiByShortName,
  getResidenceByKeyName,
  getSpeciesByKeyName,
  getStatusByKeyName
} from '@/utils/dataHelpers';
import { filterArrayFromNullish } from '@/utils/helpers';
import { getFilteredHeroes } from '@/utils/heroesProcessing';

import Filter from './components/Filter';
import {
  DEFAULT_AGE,
  DEFAULT_HEIGHT,
  DEFAULT_SORT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_WEIGHT,
  sortOptions
} from './components/Filter/helpers';

const PER_PAGE = 30;

const HeroesGallery = () => {
  const { t } = useTranslation();
  // TODO: move filters here, but make a hook from it called useHeroFilterParams
  // FIXME: sometimes it doesn't show
  const filterDestination = document.getElementById(ElementsIds.PAGE_HEADING_OPTIONS);

  const [searchParams, setSearchParams] = useSearchParams();

  const originalHeroes = useAppSelector((state) => state.heroes.data);
  const favoriteHeroesIds = useAppSelector((state) => state.heroes.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.heroes.status);
  const fetchingError = useAppSelector((state) => state.heroes.error);

  const [filteredHeroes, setFilteredHeroes] = useState(originalHeroes);
  const [paginatedHeroes, setpaginatedHeroes] = useState(originalHeroes);

  // ? temporary — transform it to paginate later
  useEffect(() => {
    setpaginatedHeroes(filteredHeroes);
  }, [filteredHeroes]);

  useEffect(() => {
    // TODO: skip if there is no search params

    // get params
    const statuses = searchParams.getAll(Param.STATUS).map((param) => getStatusByKeyName(param));
    const ageMin = searchParams.get(Param.AGE_MIN) || DEFAULT_AGE[0];
    const ageMax = searchParams.get(Param.AGE_MAX) || DEFAULT_AGE[1];
    const heightMin = searchParams.get(Param.HEIGHT_MIN) || DEFAULT_HEIGHT[0];
    const heightMax = searchParams.get(Param.HEIGHT_MAX) || DEFAULT_HEIGHT[1];
    const weightMin = searchParams.get(Param.WEIGHT_MIN) || DEFAULT_WEIGHT[0];
    const weightMax = searchParams.get(Param.WEIGHT_MAX) || DEFAULT_WEIGHT[1];
    const mbti = searchParams.getAll(Param.MBTI).map((param) => getMbtiByShortName(param));
    const species = searchParams.getAll(Param.SPECIES).map((param) => getSpeciesByKeyName(param));
    const residences = searchParams.getAll(Param.RESIDENCE).map((param) => getResidenceByKeyName(param));
    const hasAge = !!searchParams.get(Param.HAS_AGE);
    const hasHeight = !!searchParams.get(Param.HAS_HEIGHT);
    const hasWeight = !!searchParams.get(Param.HAS_WEIGHT);
    const sortBy = (searchParams.get(Param.SORT) as HeroSortOption) || DEFAULT_SORT;
    const sortDirection = (searchParams.get(Param.SORT_DIRECTION) as SortDirection) || DEFAULT_SORT_DIRECTION;

    // set filters
    const filters: HeroFilters = {
      search: undefined,
      sort: sortBy,
      sortDirection: sortDirection,
      filters: {
        status: filterArrayFromNullish(statuses),
        age: [+ageMin, +ageMax],
        height: [+heightMin, +heightMax],
        weight: [+weightMin, +weightMax],
        mbti: filterArrayFromNullish(mbti),
        species: filterArrayFromNullish(species),
        residences: filterArrayFromNullish(residences),
        hasAge: hasAge,
        hasHeight: hasHeight,
        hasWeight: hasWeight
      }
    };

    // filter and paginate
    setFilteredHeroes(getFilteredHeroes(originalHeroes, filters));
  }, [originalHeroes, searchParams]);

  return (
    <GalleryWrapper>
      <AppHelmet title={`${t('common:title.heroes')} ${t('common:tab.gallery')}`} />
      {filterDestination && createPortal(<Filter />, filterDestination)}
      {paginatedHeroes.map((hero) => (
        <HeroCard
          data={hero}
          favorites={favoriteHeroesIds}
          key={hero.id}
        />
      ))}
    </GalleryWrapper>
  );
};

export default HeroesGallery;
