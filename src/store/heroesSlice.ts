import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LocalStorageKey, PromiseStatus } from '@/constants/enums';
import { ErrorType, FavoriteType, HeroType } from '@/constants/types';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/storage';

export const loadHeroes = createAsyncThunk('heroes/load', async () => {
  const response = await fetch('/src/data/heroes.json');
  const data = await response.json();
  return data;
});

const savedFavoriteIds = getLocalStorageItem(LocalStorageKey.FAV_HEROES);
const initialFavoriteIds: FavoriteType[] = savedFavoriteIds ? JSON.parse(savedFavoriteIds) : [];

const heroesSlice = createSlice({
  name: 'heroes',
  initialState: {
    data: [] as HeroType[],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHeroes.pending, (state) => {
        state.status = PromiseStatus.LOADING;
      })
      .addCase(loadHeroes.fulfilled, (state, action) => {
        state.status = PromiseStatus.SUCCEDED;
        state.data = action.payload;
      })
      .addCase(loadHeroes.rejected, (state, action) => {
        state.status = PromiseStatus.FAILED;
        state.error = action.error.message;
      });
  }
});

export const { addFavorite, removeFavorite } = heroesSlice.actions;

export default heroesSlice;
