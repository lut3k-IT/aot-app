import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PromiseStatus } from '@/constants/enums';
import { ErrorType, FavoriteType, HeroType } from '@/constants/types';
import heroes from '@/data/heroes';

import type { RootState } from './index';

interface HeroesState {
  data: HeroType[];
  status: PromiseStatus;
  error: ErrorType;
  favoriteIds: FavoriteType[];
}

const heroesSlice = createSlice({
  name: 'heroes',
  initialState: {
    data: heroes as HeroType[],
    status: PromiseStatus.IDLE,
    error: undefined as ErrorType,
    favoriteIds: [] as FavoriteType[]
  } as HeroesState,
  reducers: {
    setHeroesFavoriteIds: (state, action: PayloadAction<FavoriteType[]>) => {
      state.favoriteIds = action.payload;
    },
    addFavorite: (state, action: PayloadAction<number>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
    }
  }
});

// Selectors
export const selectHeroesData = (state: RootState) => state.heroes.data;
export const selectHeroesFavoriteIds = (state: RootState) => state.heroes.favoriteIds;
export const selectHeroesStatus = (state: RootState) => state.heroes.status;
export const selectHeroesError = (state: RootState) => state.heroes.error;

export const { setHeroesFavoriteIds, addFavorite, removeFavorite } = heroesSlice.actions;

export default heroesSlice;
