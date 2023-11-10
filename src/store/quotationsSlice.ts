import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LocalStorageKey, PromiseStatus } from '@/constants/enums';
import { ErrorType, FavoriteType, QuotationType } from '@/constants/types';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/storageHelpers';

export const loadQuotations = createAsyncThunk('quotations/load', async () => {
  const response = await fetch('/data/quotations.json');
  const data = await response.json();
  return data;
});

const savedFavoriteIds = getLocalStorageItem(LocalStorageKey.FAV_QUOTATIONS);
const initialFavoriteIds: FavoriteType[] = savedFavoriteIds ? JSON.parse(savedFavoriteIds) : [];

const quotationsSlice = createSlice({
  name: 'quotations',
  initialState: {
    data: [] as QuotationType[],
    status: PromiseStatus.IDLE,
    error: undefined as ErrorType,
    favoriteIds: initialFavoriteIds
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
        setLocalStorageItem(LocalStorageKey.FAV_QUOTATIONS, JSON.stringify(state.favoriteIds));
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteIds = state.favoriteIds.filter((id: number) => id !== action.payload);
      setLocalStorageItem(LocalStorageKey.FAV_QUOTATIONS, JSON.stringify(state.favoriteIds));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadQuotations.pending, (state) => {
        state.status = PromiseStatus.LOADING;
      })
      .addCase(loadQuotations.fulfilled, (state, action) => {
        state.status = PromiseStatus.SUCCEDED;
        state.data = action.payload;
      })
      .addCase(loadQuotations.rejected, (state, action) => {
        state.status = PromiseStatus.FAILED;
        state.error = action.error.message;
      });
  }
});

export const { addFavorite, removeFavorite } = quotationsSlice.actions;

export default quotationsSlice;
