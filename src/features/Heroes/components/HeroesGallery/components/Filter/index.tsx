import React, { Key, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { ObjectKeys } from 'node_modules/react-hook-form/dist/types/path/common';

import { Button, ButtonProps } from '@/components/ui/Button';
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
import { Slider } from '@/components/ui/Slider';
import { Param } from '@/constants/enums';
import mbti, { MbtiType } from '@/data/mbti';
import residences, { ResidenceType } from '@/data/residences';
import species, { SpeciesType } from '@/data/species';
import statuses, { StatusType } from '@/data/statuses';
import { cn } from '@/lib/utils';
import {
  getMbtiByShortName,
  getResidenceByKeyName,
  getSpeciesByKeyName,
  getStatusByKeyName,
  toggleStatePropertyArrayById
} from '@/utils/dataProcessing';
import { filterArrayFromNullish } from '@/utils/helpers';

interface FilterProps {}

interface FilterSegmentProps {
  title: string;
  children: React.ReactNode;
  onReset?: () => void;
}

interface FilterButtonProps extends ButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

export interface HeroFilters {
  selectedStatuses: StatusType[];
  selectedAge: number[];
  selectedHeight: number[];
  selectedWeight: number[];
  selectedMbti: MbtiType[];
  selectedSpecies: SpeciesType[];
  selectedResidence: ResidenceType[];
  hasAge: boolean;
  hasHeight: boolean;
  hasWeight: boolean;
}

const FilterSegment = (props: FilterSegmentProps) => {
  const { title, children, onReset } = props;
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex gap-2 justify-between items-center h-8'}>
        <h3 className={'font-semibold'}>{title}</h3>
        {onReset && (
          <Button
            variant={'link'}
            className={'h-full p-0 px-3'}
            onClick={() => onReset()}
          >
            Reset
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

const FilterButton = (props: FilterButtonProps) => {
  const { children, isActive, className, ...rest } = props;
  return (
    <Button
      variant={'outline'}
      className={cn(
        'w-full h-auto py-1 px-2 whitespace-normal hover:bg-inherit',
        className,
        isActive ? 'border-primary !text-primary' : ''
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

// TODO: make an indicator to show filtering is active

const DEFAULT_AGE = [0, 75];
const DEFAULT_HEIGHT = [100, 700];
const DEFAULT_WEIGHT = [40, 150];

const Filter = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  // const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([]);
  // const [selectedAge, setSelectedAge] = useState<number[]>(DEFAULT_AGE);
  // const [selectedHeight, setSelectedHeight] = useState<number[]>(DEFAULT_HEIGHT);
  // const [selectedWeight, setSelectedWeight] = useState<number[]>(DEFAULT_WEIGHT);
  // const [selectedMbti, setSelectedMbti] = useState<MbtiType[]>([]);
  // const [selectedSpecies, setSelectedSpecies] = useState<SpeciesType[]>([]);
  // const [selectedResidence, setSelectedResidence] = useState<ResidenceType[]>([]);
  // const [hasAge, setHasAge] = useState<boolean>(false);
  // const [hasHeight, setHasHeight] = useState<boolean>(false);
  // const [hasWeight, setHasWeight] = useState<boolean>(false);

  const [filters, setFilters] = useState<HeroFilters>({
    selectedStatuses: [],
    selectedAge: DEFAULT_AGE,
    selectedHeight: DEFAULT_HEIGHT,
    selectedWeight: DEFAULT_WEIGHT,
    selectedMbti: [],
    selectedSpecies: [],
    selectedResidence: [],
    hasAge: false,
    hasHeight: false,
    hasWeight: false
  });

  // const handleResetAll = useCallback(() => {
  //   setSelectedStatuses([]);
  //   setSelectedAge(DEFAULT_AGE);
  //   setSelectedHeight(DEFAULT_HEIGHT);
  //   setSelectedWeight(DEFAULT_WEIGHT);
  //   setSelectedMbti([]);
  //   setSelectedSpecies([]);
  //   setSelectedResidence([]);
  //   setHasAge(false);
  //   setHasHeight(false);
  //   setHasWeight(false);
  // }, []);

  const handleResetAll = useCallback(() => {
    setFilters((prevState) => ({
      ...prevState,
      selectedStatuses: [],
      selectedAge: DEFAULT_AGE,
      selectedHeight: DEFAULT_HEIGHT,
      selectedWeight: DEFAULT_WEIGHT,
      selectedMbti: [],
      selectedSpecies: [],
      selectedResidence: [],
      hasAge: false,
      hasHeight: false,
      hasWeight: false
    }));
  }, []);

  const handleSetStatuses = (status: StatusType) => {
    // toggleStateDataById(status, setSelectedStatuses);
    // setFilters((prev) =>
    //   prev.selectedStatuses.some((selected) => selected.id === status.id)
    //     ? { ...prev, selectedStatuses: prev.selectedStatuses.filter((selected) => selected.id !== status.id) }
    //     : { ...prev, selectedStatuses: [...prev.selectedStatuses] }
    // );
    setFilters((prev) => ({
      ...prev,
      selectedStatuses: toggleStatePropertyArrayById(status, prev.selectedStatuses)
    }));
  };

  const handleSetMbti = (mbti: MbtiType) => {
    // toggleStateDataById(mbti, setSelectedMbti);
    setFilters((prev) => ({
      ...prev,
      selectedMbti: toggleStatePropertyArrayById(mbti, prev.selectedMbti)
    }));
  };

  const handleSetSpecies = (species: SpeciesType) => {
    // toggleStateDataById(species, setSelectedSpecies);
    setFilters((prev) => ({
      ...prev,
      selectedSpecies: toggleStatePropertyArrayById(species, prev.selectedSpecies)
    }));
  };

  const handleSetResidences = (residences: SpeciesType) => {
    // toggleStateDataById(residences, setSelectedResidence);
    setFilters((prev) => ({
      ...prev,
      selectedResidence: toggleStatePropertyArrayById(residences, prev.selectedResidence)
    }));
  };

  /* --------------------------------- params --------------------------------- */

  const setParamIfDiffersFromDefault = (paramName: Param, currentState: number, defaultState: number) =>
    currentState !== defaultState ? { [paramName]: currentState.toString() } : {};

  // apply params
  // const handleApplyFilters = () => {
  //   setSearchParams({
  //     [Param.STATUS]: selectedStatuses.map((x) => x.keyName),
  //     ...setParamIfDiffersFromDefault(Param.AGE_MIN, selectedAge[0], DEFAULT_AGE[0]),
  //     ...setParamIfDiffersFromDefault(Param.AGE_MAX, selectedAge[1], DEFAULT_AGE[1]),
  //     ...setParamIfDiffersFromDefault(Param.HEIGHT_MIN, selectedHeight[0], DEFAULT_HEIGHT[0]),
  //     ...setParamIfDiffersFromDefault(Param.HEIGHT_MAX, selectedHeight[1], DEFAULT_HEIGHT[1]),
  //     ...setParamIfDiffersFromDefault(Param.WEIGHT_MIN, selectedWeight[0], DEFAULT_WEIGHT[0]),
  //     ...setParamIfDiffersFromDefault(Param.WEIGHT_MAX, selectedWeight[1], DEFAULT_WEIGHT[1]),
  //     [Param.MBTI]: selectedMbti.map((x) => x.shortName),
  //     [Param.SPECIES]: selectedSpecies.map((x) => x.keyName),
  //     [Param.RESIDENCE]: selectedResidence.map((x) => x.keyName),
  //     ...(hasAge ? { [Param.HAS_AGE]: hasAge.toString() } : {}),
  //     ...(hasHeight ? { [Param.HAS_HEIGHT]: hasHeight.toString() } : {}),
  //     ...(hasWeight ? { [Param.HAS_WEIGHT]: hasWeight.toString() } : {})
  //   });
  // };
  const handleApplyFilters = () => {
    setSearchParams({
      [Param.STATUS]: filters.selectedStatuses.map((x) => x.keyName),
      ...setParamIfDiffersFromDefault(Param.AGE_MIN, filters.selectedAge[0], DEFAULT_AGE[0]),
      ...setParamIfDiffersFromDefault(Param.AGE_MAX, filters.selectedAge[1], DEFAULT_AGE[1]),
      ...setParamIfDiffersFromDefault(Param.HEIGHT_MIN, filters.selectedHeight[0], DEFAULT_HEIGHT[0]),
      ...setParamIfDiffersFromDefault(Param.HEIGHT_MAX, filters.selectedHeight[1], DEFAULT_HEIGHT[1]),
      ...setParamIfDiffersFromDefault(Param.WEIGHT_MIN, filters.selectedWeight[0], DEFAULT_WEIGHT[0]),
      ...setParamIfDiffersFromDefault(Param.WEIGHT_MAX, filters.selectedWeight[1], DEFAULT_WEIGHT[1]),
      [Param.MBTI]: filters.selectedMbti.map((x) => x.shortName),
      [Param.SPECIES]: filters.selectedSpecies.map((x) => x.keyName),
      [Param.RESIDENCE]: filters.selectedResidence.map((x) => x.keyName),
      ...(filters.hasAge ? { [Param.HAS_AGE]: filters.hasAge.toString() } : {}),
      ...(filters.hasHeight ? { [Param.HAS_HEIGHT]: filters.hasHeight.toString() } : {}),
      ...(filters.hasWeight ? { [Param.HAS_WEIGHT]: filters.hasWeight.toString() } : {})
    });
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

    // setSelectedStatuses(filterArrayFromNullish(statuses));
    // setSelectedAge([+ageMin, +ageMax]);
    // setSelectedHeight([+heightMin, +heightMax]);
    // setSelectedWeight([+weightMin, +weightMax]);
    // setSelectedMbti(filterArrayFromNullish(mbti));
    // setSelectedSpecies(filterArrayFromNullish(species));
    // setSelectedResidence(filterArrayFromNullish(residences));

    setFilters((prevState) => ({
      ...prevState,
      selectedStatuses: filterArrayFromNullish(statuses),
      selectedAge: [+ageMin, +ageMax],
      selectedHeight: [+heightMin, +heightMax],
      selectedWeight: [+weightMin, +weightMax],
      selectedMbti: filterArrayFromNullish(mbti),
      selectedSpecies: filterArrayFromNullish(species),
      selectedResidence: filterArrayFromNullish(residences),
      hasAge: hasAge,
      hasHeight: hasHeight,
      hasWeight: hasWeight
    }));
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          iconSize={'xs'}
          iconPosition={'right'}
          iconName={'filter'}
          variant={'outline'}
          className={'text-muted-foreground'}
          size={'sm'}
          iconProps={{ className: 'text-muted-foreground' }}
        >
          {t('common:filter.title')}
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
            <FilterSegment
              title={t('data:status.title')}
              // onReset={() => setSelectedStatuses([])}
              onReset={() => setFilters((prev) => ({ ...prev, selectedStatuses: [] }))}
            >
              <div className={'flex flex-1 gap-2'}>
                {statuses.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      isActive={filters.selectedStatuses.some((selected) => selected.id === data.id)}
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
              // onReset={() => setSelectedAge(DEFAULT_AGE)}
              onReset={() => setFilters((prev) => ({ ...prev, selectedAge: DEFAULT_AGE }))}
            >
              <div className={'flex gap-2 justify-between'}>
                <Input
                  className={'max-w-[100px]'}
                  value={filters.selectedAge[0]}
                  // onChange={(e) => setSelectedAge((prev) => [+e.target.value, prev[1]])}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, selectedAge: [+e.target.value, prev.selectedAge[1]] }))
                  }
                />
                <Input
                  className={'max-w-[100px]'}
                  value={filters.selectedAge[1]}
                  // onChange={(e) => setSelectedAge((prev) => [prev[0], +e.target.value])}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, selectedAge: [prev.selectedAge[0], +e.target.value] }))
                  }
                />
              </div>
              <Slider
                defaultValue={DEFAULT_AGE}
                value={filters.selectedAge}
                // onValueChange={(v: number[]) => setSelectedAge(v)}
                onValueChange={(v: number[]) => setFilters((prev) => ({ ...prev, selectedAge: v }))}
                min={0}
                max={75}
                step={1}
                minStepsBetweenThumbs={1}
                className={'py-2'}
              />
            </FilterSegment>
            <FilterSegment
              title={`${t('data:height.title')} (cm)`}
              // onReset={() => setSelectedHeight(DEFAULT_HEIGHT)}
              onReset={() => setFilters((prev) => ({ ...prev, selectedHeight: DEFAULT_HEIGHT }))}
            >
              <div className={'flex gap-2 justify-between'}>
                <Input
                  className={'max-w-[100px]'}
                  value={filters.selectedHeight[0]}
                  // onChange={(e) => setSelectedHeight((prev) => [+e.target.value, prev[1]])}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, selectedHeight: [+e.target.value, prev.selectedHeight[1]] }))
                  }
                />
                <Input
                  className={'max-w-[100px]'}
                  value={filters.selectedHeight[1]}
                  // onChange={(e) => setSelectedHeight((prev) => [prev[0], +e.target.value])}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, selectedHeight: [prev.selectedHeight[1], +e.target.value] }))
                  }
                />
              </div>
              <Slider
                defaultValue={DEFAULT_HEIGHT}
                value={filters.selectedHeight}
                // onValueChange={(v: number[]) => setSelectedHeight(v)}
                onValueChange={(v: number[]) => setFilters((prev) => ({ ...prev, selectedHeight: v }))}
                min={100}
                max={700}
                step={1}
                minStepsBetweenThumbs={1}
                className={'py-2'}
              />
            </FilterSegment>
            <FilterSegment
              title={`${t('data:weight.title')} (kg)`}
              // onReset={() => setSelectedWeight(DEFAULT_WEIGHT)}
              onReset={() => setFilters((prev) => ({ ...prev, selectedWeight: DEFAULT_WEIGHT }))}
            >
              <div className={'flex gap-2 justify-between'}>
                <Input
                  className={'max-w-[100px]'}
                  value={filters.selectedWeight[0]}
                  // onChange={(e) => setSelectedWeight((prev) => [+e.target.value, prev[1]])}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, selectedWeight: [+e.target.value, prev.selectedWeight[1]] }))
                  }
                />
                <Input
                  className={'max-w-[100px]'}
                  value={filters.selectedWeight[1]}
                  // onChange={(e) => setSelectedWeight((prev) => [prev[0], +e.target.value])}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, selectedWeight: [prev.selectedWeight[0], +e.target.value] }))
                  }
                />
              </div>
              <Slider
                defaultValue={DEFAULT_WEIGHT}
                value={filters.selectedWeight}
                // onValueChange={(v: number[]) => setSelectedWeight(v)}
                onValueChange={(v: number[]) => setFilters((prev) => ({ ...prev, selectedWeight: v }))}
                min={40}
                max={150}
                step={1}
                minStepsBetweenThumbs={1}
                className={'py-2'}
              />
            </FilterSegment>
            <FilterSegment
              title={t('data:mbti.title')}
              // onReset={() => setSelectedMbti([])}
              onReset={() => setFilters((prev) => ({ ...prev, selectedMbti: [] }))}
            >
              <div className={'grid grid-cols-4 gap-2'}>
                {mbti.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      // isActive={selectedMbti.some((selected) => selected.id === data.id)}
                      isActive={filters.selectedMbti.some((selected) => selected.id === data.id)}
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
              // onReset={() => setSelectedSpecies([])}
              onReset={() => setFilters((prev) => ({ ...prev, selectedSpecies: [] }))}
            >
              <div className={'grid grid-cols-2 gap-2'}>
                {species.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      isActive={filters.selectedSpecies.some((selected) => selected.id === data.id)}
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
              // onReset={() => setSelectedResidence([])}
              onReset={() => setFilters((prev) => ({ ...prev, selectedResidence: [] }))}
            >
              <div className={'grid grid-cols-2 gap-2 sm:grid-cols-3'}>
                {residences.map((data) => {
                  return (
                    <FilterButton
                      key={data.id}
                      isActive={filters.selectedResidence.some((selected) => selected.id === data.id)}
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
                // setHasAge(false);
                // setHasHeight(false);
                // setHasWeight(false);
                () => setFilters((prev) => ({ ...prev, hasAge: false, hasHeight: false, hasWeight: false }));
              }}
            >
              <div className={'grid grid-cols-3 gap-2'}>
                <FilterButton
                  isActive={filters.hasAge}
                  // onClick={() => setHasAge((prev) => !prev)}
                  onClick={() => setFilters((prev) => ({ ...prev, hasAge: !prev.hasAge }))}
                >
                  {t('data:age.title')}
                </FilterButton>
                <FilterButton
                  isActive={filters.hasHeight}
                  // onClick={() => setHasHeight((prev) => !prev)}
                  onClick={() => setFilters((prev) => ({ ...prev, hasHeight: !prev.hasHeight }))}
                >
                  {t('data:height.title')}
                </FilterButton>
                <FilterButton
                  isActive={filters.hasWeight}
                  // onClick={() => setHasWeight((prev) => !prev)}
                  onClick={() => setFilters((prev) => ({ ...prev, hasWeight: !prev.hasWeight }))}
                >
                  {t('data:weight.title')}
                </FilterButton>
              </div>
            </FilterSegment>
          </div>
        </ScrollArea>
        <DialogFooter className={'flex flex-auto flex-row gap-3'}>
          <Button
            className={'w-fit whitespace-nowrap'}
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
