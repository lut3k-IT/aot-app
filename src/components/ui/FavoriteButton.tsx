import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { Button } from './Button';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const FavoriteButton = (props: FavoriteButtonProps) => {
  const { isFavorite, onToggleFavorite } = props;
  const { t } = useTranslation();

  return (
    <Button
      className={classNames('mt-8 w-full', {
        'text-muted-foreground': !isFavorite
      })}
      iconName={'heart'}
      variant={!isFavorite ? 'secondary' : 'defaultInvert'}
      iconProps={{
        isFilled: isFavorite,
        className: isFavorite ? 'text-red-500 fill-red-500' : 'text-muted-foreground'
      }}
      onClick={onToggleFavorite}
      aria-label={isFavorite ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
    >
      {isFavorite ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
    </Button>
  );
};

export default FavoriteButton;
