import { useCallback, useEffect, useState } from 'react';
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
  getMbtiByShortName,
  getResidenceByKeyName,
  getSpeciesByKeyName,
  getStatusByKeyName,
  toggleStateDataById
} from '@/utils/dataHelpers';
import { filterArrayFromNullish } from '@/utils/helpers';

import FilterButton from './components/FilterButton';
import FilterSegment from './components/FilterSegment';
import {
  DEFAULT_AGE,
  DEFAULT_HEIGHT,
  DEFAULT_SORT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_WEIGHT,
  sortOptions
} from './helpers';

// TODO: make an indicator to show filtering is active

const Filter = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const hasParams = searchParams.size > 0;

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

  const handleResetAll = useCallback(() => {
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
  }, []);

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

  // apply params
  const handleApplyFilters = () => {
    setSearchParams({
      [Param.STATUS]: selectedStatuses.map((x) => x.keyName),
      ...(selectedAge[0] !== DEFAULT_AGE[0] ? { [Param.AGE_MIN]: selectedAge[0].toString() } : {}),
      ...(selectedAge[1] !== DEFAULT_AGE[1] ? { [Param.AGE_MAX]: selectedAge[1].toString() } : {}),
      ...(selectedHeight[0] !== DEFAULT_HEIGHT[0] ? { [Param.HEIGHT_MIN]: selectedHeight[0].toString() } : {}),
      ...(selectedHeight[1] !== DEFAULT_HEIGHT[1] ? { [Param.HEIGHT_MAX]: selectedHeight[1].toString() } : {}),
      ...(selectedWeight[0] !== DEFAULT_WEIGHT[0] ? { [Param.WEIGHT_MIN]: selectedWeight[0].toString() } : {}),
      ...(selectedWeight[1] !== DEFAULT_WEIGHT[1] ? { [Param.WEIGHT_MAX]: selectedWeight[1].toString() } : {}),
      [Param.MBTI]: selectedMbti.map((x) => x.shortName),
      [Param.SPECIES]: selectedSpecies.map((x) => x.keyName),
      [Param.RESIDENCE]: selectedResidence.map((x) => x.keyName),
      ...(hasAge ? { [Param.HAS_AGE]: hasAge.toString() } : {}),
      ...(hasHeight ? { [Param.HAS_HEIGHT]: hasHeight.toString() } : {}),
      ...(hasWeight ? { [Param.HAS_WEIGHT]: hasWeight.toString() } : {}),
      ...(sortBy !== DEFAULT_SORT ? { [Param.SORT]: sortBy.toString() } : {}),
      ...(sortDirection !== DEFAULT_SORT_DIRECTION ? { [Param.SORT_DIRECTION]: sortDirection.toString() } : {})
    });

    setIsModalOpen(false);
  };

  // set state from params on mount
  useEffect(() => {
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

    setSelectedStatuses(filterArrayFromNullish(statuses));
    setSelectedAge([+ageMin, +ageMax]);
    setSelectedHeight([+heightMin, +heightMax]);
    setSelectedWeight([+weightMin, +weightMax]);
    setSelectedMbti(filterArrayFromNullish(mbti));
    setSelectedSpecies(filterArrayFromNullish(species));
    setSelectedResidence(filterArrayFromNullish(residences));
    setHasAge(hasAge);
    setHasHeight(hasHeight);
    setHasWeight(hasWeight);
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  }, []);

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
          className={'text-muted-foreground relative'}
          size={'sm'}
          iconProps={{ className: 'text-muted-foreground' }}
        >
          {t('common:filter.title')}
          {hasParams && (
            <div className={'absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-300 dark:bg-red-900 rounded-full'} />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className={'h-[600px] max-h-[100vh]'}>
        <DialogHeader>
          <DialogTitle>
            {t('common:filter.title')} {t('common:title.heroes')}
          </DialogTitle>
          <DialogDescription>{t('common:filter.heroesDesc')}</DialogDescription>
        </DialogHeader>
        <ScrollArea className={'h-full -mx-2 -mr-4 pr-2'}>
          <div className='grid gap-6 mx-2 py-4'>
            <FilterSegment title={t('common:filter.sortBy')}>
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
                  className={'w-32'}
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
              <div className={'flex gap-2 justify-between'}>
                <Input
                  className={'max-w-[100px]'}
                  value={selectedAge[0]}
                  onChange={(e) => setSelectedAge((prev) => [+e.target.value, prev[1]])}
                />
                <Input
                  className={'max-w-[100px]'}
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
              <div className={'flex gap-2 justify-between'}>
                <Input
                  className={'max-w-[100px]'}
                  value={selectedHeight[0]}
                  onChange={(e) => setSelectedHeight((prev) => [+e.target.value, prev[1]])}
                />
                <Input
                  className={'max-w-[100px]'}
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
              <div className={'flex gap-2 justify-between'}>
                <Input
                  className={'max-w-[100px]'}
                  value={selectedWeight[0]}
                  onChange={(e) => setSelectedWeight((prev) => [+e.target.value, prev[1]])}
                />
                <Input
                  className={'max-w-[100px]'}
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
            className={'w-fit whitespace-nowrap text-destructive bg-destructive-foreground'}
            variant={'secondary'}
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
