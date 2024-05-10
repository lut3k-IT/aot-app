import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AnyAction } from '@reduxjs/toolkit';

import { useToast } from '@/components/hooks/useToast';

import useAppDispatch from './useAppDispatch';

export const useToggleFavorite = (
  isCurrentlyFavorite: boolean,
  id: number | undefined,
  addFavoriteAction: (id: number) => AnyAction,
  removeFavoriteAction: (id: number) => AnyAction
) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { t } = useTranslation();

  if (!id) {
    throw new Error('This ID does not exist');
  }

  return useCallback(() => {
    const action = isCurrentlyFavorite ? removeFavoriteAction : addFavoriteAction;
    dispatch(action(id));
    toast({
      title: isCurrentlyFavorite
        ? t('notifications:common.removedFromFavorites')
        : t('notifications:common.addedToFavorites')
    });
  }, [isCurrentlyFavorite, dispatch, id, toast, t]);
};
