import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { useToast } from '@/components/hooks/useToast';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { Switch } from '@/components/ui/Switch';
import { Param, SortDirection } from '@/constants/enums';
import { HeroSortOption } from '@/constants/types';
import mbti, { MbtiType } from '@/data/mbti';
import residences from '@/data/residences';
import species, { SpeciesType } from '@/data/species';
import statuses, { StatusType } from '@/data/statuses';
import {
  findHeroSortBy,
  findSortDirection,
  getMbtiByShortName,
  getResidenceByKeyName,
  getSpeciesByKeyName,
  getStatusByKeyName,
  toggleDataById
} from '@/utils/dataHelpers';
import { filterArrayFromNullish } from '@/utils/helpers';
import {
  getBooleanParam,
  getNumberParam,
  updateSearchParams,
  UpdateSearchParamsParameters
} from '@/utils/paramsHelpers';

import FilterButton from './components/FilterButton';
import FilterSegment from './components/FilterSegment';
import Indicator from './components/Indicator';
import { useFilterReducer } from './hooks/useFilterReducer';
import {
  DEFAULT_AGE,
  DEFAULT_HEIGHT,
  DEFAULT_SORT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_WEIGHT,
  sortOptions
} from './utils';

const Filter = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const { state, dispatch } = useFilterReducer();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // to display a dot indicator if any filter is active
  const isFilterActive =
    state.selectedStatuses.length > 0 ||
    state.selectedAge[0] !== DEFAULT_AGE[0] ||
    state.selectedAge[1] !== DEFAULT_AGE[1] ||
    state.selectedHeight[0] !== DEFAULT_HEIGHT[0] ||
    state.selectedHeight[1] !== DEFAULT_HEIGHT[1] ||
    state.selectedWeight[0] !== DEFAULT_WEIGHT[0] ||
    state.selectedWeight[1] !== DEFAULT_WEIGHT[1] ||
    state.selectedMbti.length > 0 ||
    state.selectedSpecies.length > 0 ||
    state.selectedResidence.length > 0 ||
    state.hasAge ||
    state.hasHeight ||
    state.hasWeight ||
    state.sortBy !== DEFAULT_SORT ||
    state.sortDirection !== DEFAULT_SORT_DIRECTION ||
    state.hasOnlyFavorites ||
    state.search !== '';

  /* -------------------------------- handlers -------------------------------- */

  const handleResetAll = () => {
    dispatch({ type: 'SET_SELECTED_STATUSES', payload: [] });
    dispatch({ type: 'SET_SELECTED_AGE', payload: DEFAULT_AGE });
    dispatch({ type: 'SET_SELECTED_HEIGHT', payload: DEFAULT_HEIGHT });
    dispatch({ type: 'SET_SELECTED_WEIGHT', payload: DEFAULT_WEIGHT });
    dispatch({ type: 'SET_SELECTED_MBTI', payload: [] });
    dispatch({ type: 'SET_SELECTED_SPECIES', payload: [] });
    dispatch({ type: 'SET_SELECTED_RESIDENCE', payload: [] });
    dispatch({ type: 'SET_HAS_AGE', payload: false });
    dispatch({ type: 'SET_HAS_HEIGHT', payload: false });
    dispatch({ type: 'SET_HAS_WEIGHT', payload: false });
    dispatch({ type: 'SET_SORT_BY', payload: DEFAULT_SORT });
    dispatch({ type: 'SET_SORT_DIRECTION', payload: DEFAULT_SORT_DIRECTION });
    dispatch({ type: 'SET_HAS_ONLY_FAVORITES', payload: false });
    dispatch({ type: 'SET_SEARCH', payload: '' });
  };

  const handleResetSorting = () => {
    dispatch({ type: 'SET_SORT_BY', payload: DEFAULT_SORT });
    dispatch({ type: 'SET_SORT_DIRECTION', payload: DEFAULT_SORT_DIRECTION });
  };

  const handleSetStatuses = (status: StatusType) => {
    const selectedStatuses = toggleDataById(status, state.selectedStatuses);
    dispatch({ type: 'SET_SELECTED_STATUSES', payload: selectedStatuses });
  };

  const handleSetMbti = (mbti: MbtiType) => {
    const selectedMbti = toggleDataById(mbti, state.selectedMbti);
    dispatch({ type: 'SET_SELECTED_MBTI', payload: selectedMbti });
  };

  const handleSetSpecies = (species: SpeciesType) => {
    const selectedSpecies = toggleDataById(species, state.selectedSpecies);
    dispatch({ type: 'SET_SELECTED_SPECIES', payload: selectedSpecies });
  };

  const handleSetResidences = (residences: SpeciesType) => {
    const selectedResidence = toggleDataById(residences, state.selectedResidence);
    dispatch({ type: 'SET_SELECTED_RESIDENCE', payload: selectedResidence });
  };

  const handleToggleSortDirection = () => {
    dispatch({
      type: 'SET_SORT_DIRECTION',
      payload: state.sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
    });
  };

  /* --------------------------------- params --------------------------------- */

  // set params from state
  const handleApplyFilters = () => {
    const parameters: UpdateSearchParamsParameters = [
      [Param.STATUS, state.selectedStatuses.map((x) => x.keyName)],
      [Param.AGE_MIN, state.selectedAge[0] !== DEFAULT_AGE[0] ? state.selectedAge[0].toString() : null],
      [Param.AGE_MAX, state.selectedAge[1] !== DEFAULT_AGE[1] ? state.selectedAge[1].toString() : null],
      [Param.HEIGHT_MIN, state.selectedHeight[0] !== DEFAULT_HEIGHT[0] ? state.selectedHeight[0].toString() : null],
      [Param.HEIGHT_MAX, state.selectedHeight[1] !== DEFAULT_HEIGHT[1] ? state.selectedHeight[1].toString() : null],
      [Param.WEIGHT_MIN, state.selectedWeight[0] !== DEFAULT_WEIGHT[0] ? state.selectedWeight[0].toString() : null],
      [Param.WEIGHT_MAX, state.selectedWeight[1] !== DEFAULT_WEIGHT[1] ? state.selectedWeight[1].toString() : null],
      [Param.MBTI, state.selectedMbti.map((x) => x.shortName)],
      [Param.SPECIES, state.selectedSpecies.map((x) => x.keyName)],
      [Param.RESIDENCE, state.selectedResidence.map((x) => x.keyName)],
      [Param.HAS_AGE, state.hasAge ? state.hasAge.toString() : null],
      [Param.HAS_HEIGHT, state.hasHeight ? state.hasHeight.toString() : null],
      [Param.HAS_WEIGHT, state.hasWeight ? state.hasWeight.toString() : null],
      [Param.SORT, state.sortBy !== DEFAULT_SORT ? state.sortBy.toString() : null],
      [Param.SORT_DIRECTION, state.sortDirection !== DEFAULT_SORT_DIRECTION ? state.sortDirection.toString() : null],
      [Param.FAVORITES, state.hasOnlyFavorites ? state.hasOnlyFavorites.toString() : null],
      [Param.SEARCH, state.search.trim() || null]
    ];

    dispatch({ type: 'SET_SEARCH', payload: state.search.trim() });

    setSearchParams((searchParams) => {
      updateSearchParams(searchParams, parameters);
      return searchParams;
    });

    toast({
      title: t('notifications:common.filtersApplied')
    });

    setIsModalOpen(false);
  };

  // set states from params on mount
  useEffect(() => {
    const statuses = searchParams.getAll(Param.STATUS).map((param) => getStatusByKeyName(param));
    const ageMin = getNumberParam(searchParams, Param.AGE_MIN, DEFAULT_AGE[0]);
    const ageMax = getNumberParam(searchParams, Param.AGE_MAX, DEFAULT_AGE[1]);
    const heightMin = getNumberParam(searchParams, Param.HEIGHT_MIN, DEFAULT_HEIGHT[0]);
    const heightMax = getNumberParam(searchParams, Param.HEIGHT_MAX, DEFAULT_HEIGHT[1]);
    const weightMin = getNumberParam(searchParams, Param.WEIGHT_MIN, DEFAULT_WEIGHT[0]);
    const weightMax = getNumberParam(searchParams, Param.WEIGHT_MAX, DEFAULT_WEIGHT[1]);
    const mbti = searchParams.getAll(Param.MBTI).map((param) => getMbtiByShortName(param));
    const species = searchParams.getAll(Param.SPECIES).map((param) => getSpeciesByKeyName(param));
    const residences = searchParams.getAll(Param.RESIDENCE).map((param) => getResidenceByKeyName(param));
    const hasAge = getBooleanParam(searchParams, Param.HAS_AGE);
    const hasHeight = getBooleanParam(searchParams, Param.HAS_HEIGHT);
    const hasWeight = getBooleanParam(searchParams, Param.HAS_WEIGHT);
    const sortBy = findHeroSortBy(searchParams.get(Param.SORT)) || DEFAULT_SORT;
    const sortDirection = findSortDirection(searchParams.get(Param.SORT_DIRECTION)) || DEFAULT_SORT_DIRECTION;
    const hasOnlyFavorites = getBooleanParam(searchParams, Param.FAVORITES);
    const search = searchParams.get(Param.SEARCH) || '';

    dispatch({ type: 'SET_SELECTED_STATUSES', payload: filterArrayFromNullish(statuses) });
    dispatch({ type: 'SET_SELECTED_AGE', payload: [ageMin, ageMax] });
    dispatch({ type: 'SET_SELECTED_HEIGHT', payload: [heightMin, heightMax] });
    dispatch({ type: 'SET_SELECTED_WEIGHT', payload: [weightMin, weightMax] });
    dispatch({ type: 'SET_SELECTED_MBTI', payload: filterArrayFromNullish(mbti) });
    dispatch({ type: 'SET_SELECTED_SPECIES', payload: filterArrayFromNullish(species) });
    dispatch({ type: 'SET_SELECTED_RESIDENCE', payload: filterArrayFromNullish(residences) });
    dispatch({ type: 'SET_HAS_AGE', payload: hasAge });
    dispatch({ type: 'SET_HAS_HEIGHT', payload: hasHeight });
    dispatch({ type: 'SET_HAS_WEIGHT', payload: hasWeight });
    dispatch({ type: 'SET_SORT_BY', payload: sortBy });
    dispatch({ type: 'SET_SORT_DIRECTION', payload: sortDirection });
    dispatch({ type: 'SET_HAS_ONLY_FAVORITES', payload: hasOnlyFavorites });
    dispatch({ type: 'SET_SEARCH', payload: search });
  }, [searchParams]);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <DialogTrigger asChild>
        <Button
          iconSize={'xs'}
          iconPosition={'right'}
          iconName={'filter'}
          variant={'outline'}
          className={'relative text-muted-foreground hover:text-muted-foreground'}
          size={'sm'}
          iconProps={{ className: 'text-muted-foreground' }}
          aria-label={t('common:filter.title')}
        >
          {t('common:filter.title')}
          {isFilterActive && <Indicator />}
        </Button>
      </DialogTrigger>
      <DialogContent className={'h-[37.5rem] max-h-[100svh]'}>
        <DialogHeader>
          <DialogTitle>
            {t('common:filter.title')} {t('common:title.heroes')}
          </DialogTitle>
          <DialogDescription>{t('common:filter.heroesDesc')}</DialogDescription>
        </DialogHeader>
        <ScrollArea className={'scroll-area'}>
          <div className='mx-2 grid gap-6 py-4'>
            <FilterSegment
              title={t('common:filter.sortBy')}
              onReset={handleResetSorting}
            >
              <div className={'flex gap-2'}>
                <Select
                  value={state.sortBy}
                  onValueChange={(v: HeroSortOption) => dispatch({ type: 'SET_SORT_BY', payload: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('common:filter.sortBy')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {sortOptions.map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                        >
                          {t(`common:sort.value.${option}`)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  variant={'outline'}
                  iconName={state.sortDirection === SortDirection.ASC ? 'arrowDownNarrowWide' : 'arrowDownWideNarrow'}
                  iconPosition={'right'}
                  className={'w-32 hover:bg-background'}
                  onClick={handleToggleSortDirection}
                  aria-label={t('common:sort.direction.toggle')}
                >
                  {t(`common:sort.direction.${state.sortDirection}.short`)}
                </Button>
              </div>
            </FilterSegment>
            <FilterSegment title={t('common:filter.search')}>
              <Input
                placeholder={t('common:filter.searchPlaceholder')}
                className={'w-full'}
                value={state.search}
                onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              />
            </FilterSegment>
            <FilterSegment
              title={t('data:status.title')}
              onReset={() => dispatch({ type: 'SET_SELECTED_STATUSES', payload: [] })}
            >
              <div className={'flex flex-1 gap-2'}>
                {statuses.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      isActive={state.selectedStatuses.some((selected) => selected.id === data.id)}
                      onClick={() => handleSetStatuses(data)}
                      aria-label={t(`data:status.${data.keyName}.long`)}
                    >
                      {t(`data:status.${data.keyName}.long`)}
                    </FilterButton>
                  );
                })}
              </div>
            </FilterSegment>
            <FilterSegment
              title={t('data:age.title')}
              onReset={() => dispatch({ type: 'SET_SELECTED_AGE', payload: DEFAULT_AGE })}
            >
              <div className={'flex justify-between gap-2'}>
                <Input
                  type={'number'}
                  className={'max-w-[6.25rem]'}
                  min={DEFAULT_AGE[0]}
                  max={DEFAULT_AGE[1]}
                  value={state.selectedAge[0]}
                  onChange={(e) =>
                    dispatch({ type: 'SET_SELECTED_AGE', payload: [+e.target.value, state.selectedAge[1]] })
                  }
                />
                <Input
                  type={'number'}
                  className={'max-w-[6.25rem]'}
                  min={DEFAULT_AGE[0]}
                  max={DEFAULT_AGE[1]}
                  value={state.selectedAge[1]}
                  onChange={(e) =>
                    dispatch({ type: 'SET_SELECTED_AGE', payload: [state.selectedAge[0], +e.target.value] })
                  }
                />
              </div>
              <Slider
                defaultValue={DEFAULT_AGE}
                value={state.selectedAge}
                onValueChange={(v: number[]) => dispatch({ type: 'SET_SELECTED_AGE', payload: v })}
                min={DEFAULT_AGE[0]}
                max={DEFAULT_AGE[1]}
                step={1}
                minStepsBetweenThumbs={1}
                className={'py-2'}
              />
            </FilterSegment>
            <FilterSegment
              title={`${t('data:height.title')} (cm)`}
              onReset={() => dispatch({ type: 'SET_SELECTED_HEIGHT', payload: DEFAULT_HEIGHT })}
            >
              <div className={'flex justify-between gap-2'}>
                <Input
                  type={'number'}
                  className={'max-w-[6.25rem]'}
                  min={DEFAULT_HEIGHT[0]}
                  max={DEFAULT_HEIGHT[1]}
                  value={state.selectedHeight[0]}
                  onChange={(e) =>
                    dispatch({ type: 'SET_SELECTED_HEIGHT', payload: [+e.target.value, state.selectedHeight[1]] })
                  }
                />
                <Input
                  type={'number'}
                  className={'max-w-[6.25rem]'}
                  min={DEFAULT_HEIGHT[0]}
                  max={DEFAULT_HEIGHT[1]}
                  value={state.selectedHeight[1]}
                  onChange={(e) =>
                    dispatch({ type: 'SET_SELECTED_HEIGHT', payload: [state.selectedHeight[0], +e.target.value] })
                  }
                />
              </div>
              <Slider
                defaultValue={DEFAULT_HEIGHT}
                value={state.selectedHeight}
                onValueChange={(v: number[]) => dispatch({ type: 'SET_SELECTED_HEIGHT', payload: v })}
                min={DEFAULT_HEIGHT[0]}
                max={DEFAULT_HEIGHT[1]}
                step={1}
                minStepsBetweenThumbs={1}
                className={'py-2'}
              />
            </FilterSegment>
            <FilterSegment
              title={`${t('data:weight.title')} (kg)`}
              onReset={() => dispatch({ type: 'SET_SELECTED_WEIGHT', payload: DEFAULT_WEIGHT })}
            >
              <div className={'flex justify-between gap-2'}>
                <Input
                  type={'number'}
                  className={'max-w-[6.25rem]'}
                  min={DEFAULT_WEIGHT[0]}
                  max={DEFAULT_WEIGHT[1]}
                  value={state.selectedWeight[0]}
                  onChange={(e) =>
                    dispatch({ type: 'SET_SELECTED_WEIGHT', payload: [+e.target.value, state.selectedWeight[1]] })
                  }
                />
                <Input
                  type={'number'}
                  className={'max-w-[6.25rem]'}
                  min={DEFAULT_WEIGHT[0]}
                  max={DEFAULT_WEIGHT[1]}
                  value={state.selectedWeight[1]}
                  onChange={(e) =>
                    dispatch({ type: 'SET_SELECTED_WEIGHT', payload: [state.selectedWeight[0], +e.target.value] })
                  }
                />
              </div>
              <Slider
                defaultValue={DEFAULT_WEIGHT}
                value={state.selectedWeight}
                onValueChange={(v: number[]) => dispatch({ type: 'SET_SELECTED_WEIGHT', payload: v })}
                min={DEFAULT_WEIGHT[0]}
                max={DEFAULT_WEIGHT[1]}
                step={1}
                minStepsBetweenThumbs={1}
                className={'py-2'}
              />
            </FilterSegment>
            <FilterSegment
              title={t('data:mbti.title')}
              onReset={() => dispatch({ type: 'SET_SELECTED_MBTI', payload: [] })}
            >
              <div className={'grid grid-cols-4 gap-2'}>
                {mbti.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      isActive={state.selectedMbti.some((selected) => selected.id === data.id)}
                      onClick={() => handleSetMbti(data)}
                      aria-label={data.shortName}
                    >
                      {data.shortName}
                    </FilterButton>
                  );
                })}
              </div>
            </FilterSegment>
            <FilterSegment
              title={t('data:species.title')}
              onReset={() => dispatch({ type: 'SET_SELECTED_SPECIES', payload: [] })}
            >
              <div className={'grid grid-cols-2 gap-2'}>
                {species.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      isActive={state.selectedSpecies.some((selected) => selected.id === data.id)}
                      onClick={() => handleSetSpecies(data)}
                      aria-label={t(`data:species.${data.keyName}`)}
                    >
                      {t(`data:species.${data.keyName}`)}
                    </FilterButton>
                  );
                })}
              </div>
            </FilterSegment>
            <FilterSegment
              title={t('data:residence.title')}
              onReset={() => dispatch({ type: 'SET_SELECTED_RESIDENCE', payload: [] })}
            >
              <div className={'grid grid-cols-2 gap-2 sm:grid-cols-3'}>
                {residences.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      isActive={state.selectedResidence.some((selected) => selected.id === data.id)}
                      onClick={() => handleSetResidences(data)}
                      aria-label={t(`data:residence.${data.keyName}`)}
                    >
                      {t(`data:residence.${data.keyName}`)}
                    </FilterButton>
                  );
                })}
              </div>
            </FilterSegment>
            <FilterSegment
              title={t('common:filter.hasInfoAbout')}
              onReset={() => {
                dispatch({ type: 'SET_HAS_AGE', payload: false });
                dispatch({ type: 'SET_HAS_HEIGHT', payload: false });
                dispatch({ type: 'SET_HAS_WEIGHT', payload: false });
              }}
            >
              <div className={'grid grid-cols-3 gap-2'}>
                <FilterButton
                  isActive={state.hasAge}
                  onClick={() => dispatch({ type: 'SET_HAS_AGE', payload: !state.hasAge })}
                  aria-label={t('data:age.title')}
                >
                  {t('data:age.title')}
                </FilterButton>
                <FilterButton
                  isActive={state.hasHeight}
                  onClick={() => dispatch({ type: 'SET_HAS_HEIGHT', payload: !state.hasHeight })}
                  aria-label={t('data:height.title')}
                >
                  {t('data:height.title')}
                </FilterButton>
                <FilterButton
                  isActive={state.hasWeight}
                  onClick={() => dispatch({ type: 'SET_HAS_WEIGHT', payload: !state.hasWeight })}
                  aria-label={t('data:weight.title')}
                >
                  {t('data:weight.title')}
                </FilterButton>
              </div>
            </FilterSegment>
            <FilterSegment title={t('common:filter.showOnlyFavorites')}>
              <Switch
                id='show-only-favorites'
                checked={state.hasOnlyFavorites}
                onCheckedChange={(v) => dispatch({ type: 'SET_HAS_ONLY_FAVORITES', payload: v })}
              />
            </FilterSegment>
          </div>
        </ScrollArea>
        <DialogFooter className={'flex flex-auto flex-row gap-3'}>
          <Button
            className={'w-full'}
            variant={'destructiveInvert'}
            onClick={handleResetAll}
            aria-label={t('common:action.resetAll')}
          >
            {t('common:action.resetAll')}
          </Button>
          <Button
            type='submit'
            className={'w-full'}
            onClick={handleApplyFilters}
            aria-label={t('common:action.saveChanges')}
          >
            {t('common:action.saveChanges')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Filter;
