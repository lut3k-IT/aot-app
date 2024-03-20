import React from 'react';
import { useTranslation } from 'react-i18next';

import { Switch } from '@/components/ui/Switch';

interface SwitchFavoritesProps {
  shouldShowFavorites: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const SwitchFavorites: React.FC<SwitchFavoritesProps> = ({ shouldShowFavorites, onCheckedChange }) => {
  const { t } = useTranslation();

  return (
    <div className='flex-center gap-2'>
      <span className='text-sm font-medium text-muted-foreground'>{t('common:favorites')}</span>

      <Switch
        checked={shouldShowFavorites}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};

export default SwitchFavorites;
