import { createSlice } from '@reduxjs/toolkit';

import { LocalStorageKey, PromiseStatus } from '@/constants/enums';
import { ErrorType, FavoriteType, HeroType } from '@/constants/types';
import heroes from '@/data/heroes';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/storageHelpers';

const savedFavoriteIds = getLocalStorageItem(LocalStorageKey.FAV_HEROES);
const initialFavoriteIds: FavoriteType[] = savedFavoriteIds ? JSON.parse(savedFavoriteIds) : [];

const heroesSlice = createSlice({
  name: 'heroes',
  initialState: {
    data: heroes as HeroType[],
    status: PromiseStatus.IDLE,
    error: undefined as ErrorType,
    favoriteIds: initialFavoriteIds
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
        setLocalStorageItem(LocalStorageKey.FAV_HEROES, JSON.stringify(state.favoriteIds));
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteIds = state.favoriteIds.filter((id: number) => id !== action.payload);
      setLocalStorageItem(LocalStorageKey.FAV_HEROES, JSON.stringify(state.favoriteIds));
    }
  }
});

export const { addFavorite, removeFavorite } = heroesSlice.actions;

export default heroesSlice;
