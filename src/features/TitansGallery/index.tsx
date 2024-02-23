import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useAppSelector from '@/components/hooks/useAppSelector';
import { useToast } from '@/components/hooks/useToast';
import AppHelmet from '@/components/ui/AppHelmet';
import CharacterCardSkeleton from '@/components/ui/CharacterCardSkeleton';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import NoResults from '@/components/ui/NoResults';
import PageHeading from '@/components/ui/PageHeading';
import TitanCard from '@/components/ui/TitanCard';
import { CARD_SKELETONS } from '@/constants/constants';

// @todo DRY this up
const SkeletonCards = () => Array.from({ length: CARD_SKELETONS }, (_, index) => <CharacterCardSkeleton key={index} />);

const TitansGallery = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const originalTitans = useAppSelector((state) => state.titans.data);
  const originalHeroes = useAppSelector((state) => state.heroes.data);

  const favoriteTitansIds = useAppSelector((state) => state.titans.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.titans.status);
  const fetchingError = useAppSelector((state) => state.titans.error);
  const isLoading = fetchingStatus === 'loading';

  // @todo remove this states and use the ones from the store because there won't be any filtering or pagination
  const [filteredTitans, setFilteredTitans] = useState(originalTitans);
  const [paginatedTitans, setPaginatedTitans] = useState(originalTitans);

  const hasData = originalTitans.length > 0;
  const hasDataToShow = paginatedTitans.length > 0;

  useEffect(() => {
    setFilteredTitans(originalTitans);
    setPaginatedTitans(originalTitans);
  }, [originalTitans]);

  // @todo DRY this up
  /* ------------------------------- error toast ------------------------------- */

  useEffect(() => {
    if (fetchingError) {
      toast({
        variant: 'destructive',
        title: t('notifications:error.somethingWentWrong'),
        description: t('notifications:error.tryAgainLater')
      });
    }
  }, [fetchingError]);

  return (
    <>
      <AppHelmet title={`${t('common:title.titans')} ${t('common:tab.gallery')}`} />
      <MovingPanel className={'md:pt-0'}>
        <PageHeading className={'md:pt-0'} />
      </MovingPanel>
      <GalleryWrapper>
        {hasData && !isLoading ? (
          hasDataToShow ? (
            paginatedTitans.map((titan) => (
              <TitanCard
                data={titan}
                favorites={favoriteTitansIds}
                heroesData={originalHeroes}
                key={titan.id}
              />
            ))
          ) : (
            <NoResults />
          )
        ) : (
          <SkeletonCards />
        )}
      </GalleryWrapper>
    </>
  );
};

export default TitansGallery;
