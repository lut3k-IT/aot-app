import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LocalStorageKey, PromiseStatus } from '@/constants/enums';
import { ErrorType, FavoriteType, TitanType } from '@/constants/types';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/storageHelpers';

export const loadTitans = createAsyncThunk('titans/load', async () => {
  const response = await fetch('/data/titans.json');
  const data = await response.json();
  return data;
});

const savedFavoriteIds = getLocalStorageItem(LocalStorageKey.FAV_TITANS);
const initialFavoriteIds: FavoriteType[] = savedFavoriteIds ? JSON.parse(savedFavoriteIds) : [];

const titansSlice = createSlice({
  name: 'titans',
  initialState: {
    data: [] as TitanType[],
    status: PromiseStatus.IDLE,
    error: undefined as ErrorType,
    favoriteIds: initialFavoriteIds
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
        setLocalStorageItem(LocalStorageKey.FAV_TITANS, JSON.stringify(state.favoriteIds));
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteIds = state.favoriteIds.filter((id: number) => id !== action.payload);
      setLocalStorageItem(LocalStorageKey.FAV_TITANS, JSON.stringify(state.favoriteIds));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTitans.pending, (state) => {
        state.status = PromiseStatus.LOADING;
      })
      .addCase(loadTitans.fulfilled, (state, action) => {
        state.status = PromiseStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(loadTitans.rejected, (state, action) => {
        state.status = PromiseStatus.FAILED;
        state.error = action.error.message;
      });
  }
});

export const { addFavorite, removeFavorite } = titansSlice.actions;

export default titansSlice;
