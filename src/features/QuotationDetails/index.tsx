import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import useAppSelector from '@/components/hooks/useAppSelector';
import useIsLandscape from '@/components/hooks/useIsLandscape';
import useIsMobile from '@/components/hooks/useIsMobile';
import { useToggleFavorite } from '@/components/hooks/useToggleFavorite';
import useValidateIdFromParam from '@/components/hooks/useValidateIdFromParam';
import AppHelmet from '@/components/ui/AppHelmet';
import ButtonGoBack from '@/components/ui/ButtonGoBack';
import { Card } from '@/components/ui/Card';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { RoutePath } from '@/constants/enums';
import { addFavorite, removeFavorite } from '@/store/quotationsSlice';
import { isInFavorites } from '@/utils/dataHelpers';

const QuotationDetails = () => {
  const { id } = useParams();

  const isMobile = useIsMobile();
  const isLandscape = useIsLandscape();

  const paramQuotationId = useValidateIdFromParam(id);

  const quotations = useAppSelector((state) => state.quotations.data);
  const favoriteQuotationsId = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);

  const quotation = quotations.find((quotation) => quotation.id === paramQuotationId);
  const isFavorite = isInFavorites(paramQuotationId, favoriteQuotationsId);

  const toggleFavorite = useToggleFavorite(isFavorite, paramQuotationId, addFavorite, removeFavorite);

  // @audit this should be handled by the custom hook
  if (!quotation && quotations.length > 0) throw new Error('Quotation with this ID does not exist.');
  if (!quotation) return;

  return (
    <div
      className={classNames({
        'pt-body-pad-start': isMobile,
        'pt-16': isLandscape
      })}
    >
      <ButtonGoBack fallbackRoute={RoutePath.QUOTATIONS} />
      <AppHelmet title={`${quotation.text.substring(0, 20)}${quotation.text.length > 20 ? '...' : ''}`} />
      <Card className={'mt-8 p-4'}>
        <p>{quotation.text}</p>
      </Card>
      <FavoriteButton
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default QuotationDetails;
