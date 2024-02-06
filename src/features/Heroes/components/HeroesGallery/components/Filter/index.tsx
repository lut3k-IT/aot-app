import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

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
import { Param, SortDirection } from '@/constants/enums';
import { HeroSortOption } from '@/constants/types';
import mbti, { MbtiType } from '@/data/mbti';
import residences, { ResidenceType } from '@/data/residences';
import species, { SpeciesType } from '@/data/species';
import statuses, { StatusType } from '@/data/statuses';
import {
  findHeroSortBy,
  findSortDirection,
  getMbtiByShortName,
  getResidenceByKeyName,
  getSpeciesByKeyName,
  getStatusByKeyName,
  toggleStateDataById
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
import {
  DEFAULT_AGE,
  DEFAULT_HEIGHT,
  DEFAULT_SORT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_WEIGHT,
  sortOptions
} from './helpers';

const Filter = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([]);
  const [selectedAge, setSelectedAge] = useState(DEFAULT_AGE);
  const [selectedHeight, setSelectedHeight] = useState(DEFAULT_HEIGHT);
  const [selectedWeight, setSelectedWeight] = useState(DEFAULT_WEIGHT);
  const [selectedMbti, setSelectedMbti] = useState<MbtiType[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesType[]>([]);
  const [selectedResidence, setSelectedResidence] = useState<ResidenceType[]>([]);
  const [hasAge, setHasAge] = useState(false);
  const [hasHeight, setHasHeight] = useState(false);
  const [hasWeight, setHasWeight] = useState(false);

  const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  const [sortDirection, setSortDirection] = useState(DEFAULT_SORT_DIRECTION);

  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    setIsFilterActive(
      selectedStatuses.length > 0 ||
        selectedAge[0] !== DEFAULT_AGE[0] ||
        selectedAge[1] !== DEFAULT_AGE[1] ||
        selectedHeight[0] !== DEFAULT_HEIGHT[0] ||
        selectedHeight[1] !== DEFAULT_HEIGHT[1] ||
        selectedWeight[0] !== DEFAULT_WEIGHT[0] ||
        selectedWeight[1] !== DEFAULT_WEIGHT[1] ||
        selectedMbti.length > 0 ||
        selectedSpecies.length > 0 ||
        selectedResidence.length > 0 ||
        hasAge ||
        hasHeight ||
        hasWeight ||
        sortBy !== DEFAULT_SORT ||
        sortDirection !== DEFAULT_SORT_DIRECTION
    );
  }, [
    selectedStatuses,
    selectedAge,
    selectedHeight,
    selectedWeight,
    selectedMbti,
    selectedSpecies,
    selectedResidence,
    hasAge,
    hasWeight,
    hasWeight,
    sortBy,
    sortDirection
  ]);

  /* -------------------------------- handlers -------------------------------- */

  const handleResetAll = () => {
    setSelectedStatuses([]);
    setSelectedAge(DEFAULT_AGE);
    setSelectedHeight(DEFAULT_HEIGHT);
    setSelectedWeight(DEFAULT_WEIGHT);
    setSelectedMbti([]);
    setSelectedSpecies([]);
    setSelectedResidence([]);
    setHasAge(false);
    setHasHeight(false);
    setHasWeight(false);
    setSortBy(DEFAULT_SORT);
    setSortDirection(DEFAULT_SORT_DIRECTION);
  };

  const handleResetSorting = () => {
    setSortBy(DEFAULT_SORT);
    setSortDirection(DEFAULT_SORT_DIRECTION);
  };

  const handleSetStatuses = (status: StatusType) => {
    toggleStateDataById(status, setSelectedStatuses);
  };

  const handleSetMbti = (mbti: MbtiType) => {
    toggleStateDataById(mbti, setSelectedMbti);
  };

  const handleSetSpecies = (species: SpeciesType) => {
    toggleStateDataById(species, setSelectedSpecies);
  };

  const handleSetResidences = (residences: SpeciesType) => {
    toggleStateDataById(residences, setSelectedResidence);
  };

  const handleToggleSortDirection = () => {
    setSortDirection((prev) => (prev === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC));
  };

  /* --------------------------------- params --------------------------------- */

  // set params from state
  const handleApplyFilters = () => {
    const parameters: UpdateSearchParamsParameters = [
      [Param.STATUS, selectedStatuses.map((x) => x.keyName)],
      [Param.AGE_MIN, selectedAge[0] !== DEFAULT_AGE[0] ? selectedAge[0].toString() : null],
      [Param.AGE_MAX, selectedAge[1] !== DEFAULT_AGE[1] ? selectedAge[1].toString() : null],
      [Param.HEIGHT_MIN, selectedHeight[0] !== DEFAULT_HEIGHT[0] ? selectedHeight[0].toString() : null],
      [Param.HEIGHT_MAX, selectedHeight[1] !== DEFAULT_HEIGHT[1] ? selectedHeight[1].toString() : null],
      [Param.WEIGHT_MIN, selectedWeight[0] !== DEFAULT_WEIGHT[0] ? selectedWeight[0].toString() : null],
      [Param.WEIGHT_MAX, selectedWeight[1] !== DEFAULT_WEIGHT[1] ? selectedWeight[1].toString() : null],
      [Param.MBTI, selectedMbti.map((x) => x.shortName)],
      [Param.SPECIES, selectedSpecies.map((x) => x.keyName)],
      [Param.RESIDENCE, selectedResidence.map((x) => x.keyName)],
      [Param.HAS_AGE, hasAge ? hasAge.toString() : null],
      [Param.HAS_HEIGHT, hasHeight ? hasHeight.toString() : null],
      [Param.HAS_WEIGHT, hasWeight ? hasWeight.toString() : null],
      [Param.SORT, sortBy !== DEFAULT_SORT ? sortBy.toString() : null],
      [Param.SORT_DIRECTION, sortDirection !== DEFAULT_SORT_DIRECTION ? sortDirection.toString() : null]
    ];

    setSearchParams((searchParams) => {
      updateSearchParams(searchParams, parameters);
      return searchParams;
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

    setSelectedStatuses(filterArrayFromNullish(statuses));
    setSelectedAge([ageMin, ageMax]);
    setSelectedHeight([heightMin, heightMax]);
    setSelectedWeight([weightMin, weightMax]);
    setSelectedMbti(filterArrayFromNullish(mbti));
    setSelectedSpecies(filterArrayFromNullish(species));
    setSelectedResidence(filterArrayFromNullish(residences));
    setHasAge(hasAge);
    setHasHeight(hasHeight);
    setHasWeight(hasWeight);
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  }, []);

  // todo: prompt: try to move as much to separate components for better readability
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
          className={'relative text-muted-foreground'}
          size={'sm'}
          iconProps={{ className: 'text-muted-foreground' }}
        >
          {t('common:filter.title')}
          {isFilterActive && <Indicator />}
        </Button>
      </DialogTrigger>
      <DialogContent className={'h-[37.5rem] max-h-[100vh]'}>
        <DialogHeader>
          <DialogTitle>
            {t('common:filter.title')} {t('common:title.heroes')}
          </DialogTitle>
          <DialogDescription>{t('common:filter.heroesDesc')}</DialogDescription>
        </DialogHeader>
        <ScrollArea className={'-mx-2 -mr-4 h-full pr-2'}>
          <div className='mx-2 grid gap-6 py-4'>
            <FilterSegment
              title={t('common:filter.sortBy')}
              onReset={handleResetSorting}
            >
              <div className={'flex gap-2'}>
                <Select
                  value={sortBy}
                  onValueChange={(v: HeroSortOption) => setSortBy(v)}
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
                  iconName={sortDirection === SortDirection.ASC ? 'arrowDownNarrowWide' : 'arrowDownWideNarrow'}
                  iconPosition={'right'}
                  className={'w-32 hover:bg-background'}
                  onClick={handleToggleSortDirection}
                >
                  {t(`common:sort.direction.${sortDirection}.short`)}
                </Button>
              </div>
            </FilterSegment>
            <FilterSegment
              title={t('data:status.title')}
              onReset={() => setSelectedStatuses([])}
            >
              <div className={'flex flex-1 gap-2'}>
                {statuses.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      isActive={selectedStatuses.some((selected) => selected.id === data.id)}
                      onClick={() => handleSetStatuses(data)}
                    >
                      {t(`data:status.${data.keyName}.long`)}
                    </FilterButton>
                  );
                })}
              </div>
            </FilterSegment>
            <FilterSegment
              title={t('data:age.title')}
              onReset={() => setSelectedAge(DEFAULT_AGE)}
            >
              <div className={'flex justify-between gap-2'}>
                <Input
                  className={'max-w-[6.25rem]'}
                  value={selectedAge[0]}
                  onChange={(e) => setSelectedAge((prev) => [+e.target.value, prev[1]])}
                />
                <Input
                  className={'max-w-[6.25rem]'}
                  value={selectedAge[1]}
                  onChange={(e) => setSelectedAge((prev) => [prev[0], +e.target.value])}
                />
              </div>
              <Slider
                defaultValue={DEFAULT_AGE}
                value={selectedAge}
                onValueChange={(v: number[]) => setSelectedAge(v)}
                min={0}
                max={75}
                step={1}
                minStepsBetweenThumbs={1}
                className={'py-2'}
              />
            </FilterSegment>
            <FilterSegment
              title={`${t('data:height.title')} (cm)`}
              onReset={() => setSelectedHeight(DEFAULT_HEIGHT)}
            >
              <div className={'flex justify-between gap-2'}>
                <Input
                  className={'max-w-[6.25rem]'}
                  value={selectedHeight[0]}
                  onChange={(e) => setSelectedHeight((prev) => [+e.target.value, prev[1]])}
                />
                <Input
                  className={'max-w-[6.25rem]'}
                  value={selectedHeight[1]}
                  onChange={(e) => setSelectedHeight((prev) => [prev[0], +e.target.value])}
                />
              </div>
              <Slider
                defaultValue={DEFAULT_HEIGHT}
                value={selectedHeight}
                onValueChange={(v: number[]) => setSelectedHeight(v)}
                min={100}
                max={700}
                step={1}
                minStepsBetweenThumbs={1}
                className={'py-2'}
              />
            </FilterSegment>
            <FilterSegment
              title={`${t('data:weight.title')} (kg)`}
              onReset={() => setSelectedWeight(DEFAULT_WEIGHT)}
            >
              <div className={'flex justify-between gap-2'}>
                <Input
                  className={'max-w-[6.25rem]'}
                  value={selectedWeight[0]}
                  onChange={(e) => setSelectedWeight((prev) => [+e.target.value, prev[1]])}
                />
                <Input
                  className={'max-w-[6.25rem]'}
                  value={selectedWeight[1]}
                  onChange={(e) => setSelectedWeight((prev) => [prev[0], +e.target.value])}
                />
              </div>
              <Slider
                defaultValue={DEFAULT_WEIGHT}
                value={selectedWeight}
                onValueChange={(v: number[]) => setSelectedWeight(v)}
                min={40}
                max={150}
                step={1}
                minStepsBetweenThumbs={1}
                className={'py-2'}
              />
            </FilterSegment>
            <FilterSegment
              title={t('data:mbti.title')}
              onReset={() => setSelectedMbti([])}
            >
              <div className={'grid grid-cols-4 gap-2'}>
                {mbti.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      isActive={selectedMbti.some((selected) => selected.id === data.id)}
                      onClick={() => handleSetMbti(data)}
                    >
                      {data.shortName}
                    </FilterButton>
                  );
                })}
              </div>
            </FilterSegment>
            <FilterSegment
              title={t('data:species.title')}
              onReset={() => setSelectedSpecies([])}
            >
              <div className={'grid grid-cols-2 gap-2'}>
                {species.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      isActive={selectedSpecies.some((selected) => selected.id === data.id)}
                      onClick={() => handleSetSpecies(data)}
                    >
                      {t(`data:species.${data.keyName}`)}
                    </FilterButton>
                  );
                })}
              </div>
            </FilterSegment>
            <FilterSegment
              title={t('data:residence.title')}
              onReset={() => setSelectedResidence([])}
            >
              <div className={'grid grid-cols-2 gap-2 sm:grid-cols-3'}>
                {residences.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      isActive={selectedResidence.some((selected) => selected.id === data.id)}
                      onClick={() => handleSetResidences(data)}
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
                setHasAge(false);
                setHasHeight(false);
                setHasWeight(false);
              }}
            >
              <div className={'grid grid-cols-3 gap-2'}>
                <FilterButton
                  isActive={hasAge}
                  onClick={() => setHasAge((prev) => !prev)}
                >
                  {t('data:age.title')}
                </FilterButton>
                <FilterButton
                  isActive={hasHeight}
                  onClick={() => setHasHeight((prev) => !prev)}
                >
                  {t('data:height.title')}
                </FilterButton>
                <FilterButton
                  isActive={hasWeight}
                  onClick={() => setHasWeight((prev) => !prev)}
                >
                  {t('data:weight.title')}
                </FilterButton>
              </div>
            </FilterSegment>
          </div>
        </ScrollArea>
        <DialogFooter className={'flex flex-auto flex-row gap-3'}>
          <Button
            className={'w-fit'}
            variant={'destructiveLite'}
            onClick={handleResetAll}
          >
            {t('common:action.resetAll')}
          </Button>
          <Button
            type='submit'
            className={'w-full'}
            onClick={handleApplyFilters}
          >
            {t('common:action.saveChanges')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Filter;
