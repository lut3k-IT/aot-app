import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { Button } from './Button';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  className?: string;
}

const FavoriteButton = (props: FavoriteButtonProps) => {
  const { isFavorite, onToggleFavorite, className } = props;
  const { t } = useTranslation();

  return (
    <Button
      className={classNames(
        {
          'text-muted-foreground': !isFavorite
        },
        className
      )}
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
