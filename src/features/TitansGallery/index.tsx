import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useAppSelector from '@/components/hooks/useAppSelector';
import useIsMobile from '@/components/hooks/useIsMobile';
import AppHelmet from '@/components/ui/AppHelmet';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import TitanCard from '@/components/ui/TitanCard';

const TitansGallery = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const originalTitans = useAppSelector((state) => state.titans.data);
  const originalHeroes = useAppSelector((state) => state.heroes.data);

  const favoriteTitansIds = useAppSelector((state) => state.titans.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.titans.status);
  const fetchingError = useAppSelector((state) => state.titans.error);

  const [filteredTitans, setFilteredTitans] = useState(originalTitans);
  const [paginatedTitans, setPaginatedTitans] = useState(originalTitans);

  useEffect(() => {
    setFilteredTitans(originalTitans);
    setPaginatedTitans(originalTitans);
  }, [originalTitans]);

  return (
    <>
      <AppHelmet title={`${t('common:title.titans')} ${t('common:tab.gallery')}`} />
      <MovingPanel className={!isMobile ? '!pt-0' : ''}>
        <PageHeading className={!isMobile ? '!pt-0' : ''} />
      </MovingPanel>
      <GalleryWrapper>
        {paginatedTitans.map((titan) => (
          <TitanCard
            data={titan}
            favorites={favoriteTitansIds}
            heroesData={originalHeroes}
            key={titan.id}
          />
        ))}
      </GalleryWrapper>
    </>
  );
};

export default TitansGallery;
