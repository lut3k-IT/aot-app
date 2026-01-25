import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PromiseStatus } from '@/constants/enums';
import { ErrorType, FavoriteType, TitanType } from '@/constants/types';

import type { RootState } from './index';

export const loadTitans = createAsyncThunk('titans/load', async () => {
  const response = await fetch('/data/titans.json');
  const data = await response.json();
  return data;
});

interface TitansState {
  data: TitanType[];
  status: PromiseStatus;
  error: ErrorType;
  favoriteIds: FavoriteType[];
}

const titansSlice = createSlice({
  name: 'titans',
  initialState: {
    data: [] as TitanType[],
    status: PromiseStatus.IDLE,
    error: undefined as ErrorType,
    favoriteIds: [] as FavoriteType[]
  } as TitansState,
  reducers: {
    setTitansFavoriteIds: (state, action: PayloadAction<FavoriteType[]>) => {
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

// Selectors
export const selectTitansData = (state: RootState) => state.titans.data;
export const selectTitansFavoriteIds = (state: RootState) => state.titans.favoriteIds;
export const selectTitansStatus = (state: RootState) => state.titans.status;
export const selectTitansError = (state: RootState) => state.titans.error;

export const { setTitansFavoriteIds, addFavorite, removeFavorite } = titansSlice.actions;

export default titansSlice;
