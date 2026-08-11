import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { Button } from './Button';
import HeartBurst from './HeartBurst';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  className?: string;
}

const FavoriteButton = (props: FavoriteButtonProps) => {
  const { isFavorite, onToggleFavorite, className } = props;
  const { t } = useTranslation();
  const [burstKey, setBurstKey] = useState(0);
  const wasFavoriteRef = useRef(isFavorite);

  // Efekt odpala sie wylacznie przy dodaniu do ulubionych, nigdy przy odjeciu.
  useEffect(() => {
    if (isFavorite && !wasFavoriteRef.current) {
      setBurstKey((previous) => previous + 1);
    }
    wasFavoriteRef.current = isFavorite;
  }, [isFavorite]);

  return (
    <Button
      className={classNames(
        'relative overflow-visible',
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
      <HeartBurst burstKey={burstKey} />
      {isFavorite ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
    </Button>
  );
};

export default FavoriteButton;
