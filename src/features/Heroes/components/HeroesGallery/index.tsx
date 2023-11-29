import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import useAppSelector from '@/components/hooks/useAppSelector';
import AppHelmet from '@/components/ui/AppHelmet';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import HeroCard from '@/components/ui/HeroCard';
import NewPagination, { DEFAULT_PAGE, DEFAULT_PAGE_SIZES } from '@/components/ui/NewPagination';
import { ElementsIds, Param, SortDirection } from '@/constants/enums';
import { HeroFilters, HeroSortOption } from '@/constants/types';
import {
  getMbtiByShortName,
  getResidenceByKeyName,
  getSpeciesByKeyName,
  getStatusByKeyName
} from '@/utils/dataHelpers';
import { filterArrayFromNullish } from '@/utils/helpers';
import { filterHeroes, paginateHeroes } from '@/utils/heroesProcessing';
import { deleteSomeSearchParams, getSafePageNumberFromSearchParam } from '@/utils/paramsHelpers';

import Filter from './components/Filter';
import {
  DEFAULT_AGE,
  DEFAULT_HEIGHT,
  DEFAULT_SORT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_WEIGHT
} from './components/Filter/helpers';

// todo: save pagesize in local storage
// fixme: when on page 2 and in hero details, when go back the page 1 is shown but page 2 in params

const HeroesGallery = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterDestination = document.getElementById(ElementsIds.PAGE_HEADING_OPTIONS);

  const [totalPages, setTotalPages] = useState(DEFAULT_PAGE);

  const originalHeroes = useAppSelector((state) => state.heroes.data);
  const favoriteHeroesIds = useAppSelector((state) => state.heroes.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.heroes.status);
  const fetchingError = useAppSelector((state) => state.heroes.error);

  const [filteredHeroes, setFilteredHeroes] = useState(originalHeroes);
  const [paginatedHeroes, setPaginatedHeroes] = useState(originalHeroes);

  // todo: if there is no data and there is no error and fetching, show an announcement to try other filters
  const hasData = paginatedHeroes.length > 0;

  /* ----------------------------- data management ---------------------------- */

  // filter heroes on redux or param change
  useEffect(() => {
    const statuses = searchParams.getAll(Param.STATUS).map((param) => getStatusByKeyName(param));
    const ageMin = Number(searchParams.get(Param.AGE_MIN)) || DEFAULT_AGE[0];
    const ageMax = Number(searchParams.get(Param.AGE_MAX)) || DEFAULT_AGE[1];
    const heightMin = Number(searchParams.get(Param.HEIGHT_MIN)) || DEFAULT_HEIGHT[0];
    const heightMax = Number(searchParams.get(Param.HEIGHT_MAX)) || DEFAULT_HEIGHT[1];
    const weightMin = Number(searchParams.get(Param.WEIGHT_MIN)) || DEFAULT_WEIGHT[0];
    const weightMax = Number(searchParams.get(Param.WEIGHT_MAX)) || DEFAULT_WEIGHT[1];
    const mbti = searchParams.getAll(Param.MBTI).map((param) => getMbtiByShortName(param));
    const species = searchParams.getAll(Param.SPECIES).map((param) => getSpeciesByKeyName(param));
    const residences = searchParams.getAll(Param.RESIDENCE).map((param) => getResidenceByKeyName(param));
    const hasAge = !!searchParams.get(Param.HAS_AGE);
    const hasHeight = !!searchParams.get(Param.HAS_HEIGHT);
    const hasWeight = !!searchParams.get(Param.HAS_WEIGHT);
    const sortBy = (searchParams.get(Param.SORT) as HeroSortOption) || DEFAULT_SORT;
    const sortDirection = (searchParams.get(Param.SORT_DIRECTION) as SortDirection) || DEFAULT_SORT_DIRECTION;

    const filters: HeroFilters = {
      search: undefined,
      sort: sortBy,
      sortDirection: sortDirection,
      filters: {
        status: filterArrayFromNullish(statuses),
        age: [ageMin, ageMax],
        height: [heightMin, heightMax],
        weight: [weightMin, weightMax],
        mbti: filterArrayFromNullish(mbti),
        species: filterArrayFromNullish(species),
        residences: filterArrayFromNullish(residences),
        hasAge: hasAge,
        hasHeight: hasHeight,
        hasWeight: hasWeight
      }
    };

    setFilteredHeroes(filterHeroes(originalHeroes, filters));
  }, [originalHeroes, searchParams]);

  // paginate heroes
  useEffect(() => {
    const page = getSafePageNumberFromSearchParam(searchParams);
    const pageSize = Number(searchParams.get(Param.PAGE_SIZE)) || DEFAULT_PAGE_SIZES[0];

    // todo: create a pagesize util that will only apply available page size

    const { paginatedHeroes, totalPages } = paginateHeroes(filteredHeroes, page, pageSize);
    setPaginatedHeroes(paginatedHeroes);
    setTotalPages(totalPages);
  }, [filteredHeroes]);

  /* --------------------------------- params --------------------------------- */

  // go back to page 1 if page param is higher than the total page count
  useEffect(() => {
    const page = getSafePageNumberFromSearchParam(searchParams);
    const isPageParamOutOfRange = page > totalPages && totalPages !== 0 && filteredHeroes.length > 0;

    if (isPageParamOutOfRange) {
      deleteSomeSearchParams(setSearchParams, [Param.PAGE]);
    }
  }, [searchParams, filteredHeroes, totalPages]);

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
      {hasData && (
        <NewPagination
          itemsCount={filteredHeroes.length}
          totalPages={totalPages}
        />
      )}
    </GalleryWrapper>
  );
};

export default HeroesGallery;
