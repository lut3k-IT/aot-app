import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PromiseStatus } from '@/constants/enums';
import { ErrorType, FavoriteType, QuotationType } from '@/constants/types';
import i18n from '@/i18n/i18n';

import type { RootState } from './index';

export const loadQuotations = createAsyncThunk('quotations/load', async () => {
  const quotations = i18n.getResourceBundle(i18n.language, 'quotations');
  const data = Object.entries(quotations).map(([id, text]) => ({ id: Number(id), text }) as QuotationType);
  return data;
});

interface QuotationsState {
  data: QuotationType[];
  status: PromiseStatus;
  error: ErrorType;
  favoriteIds: FavoriteType[];
}

const quotationsSlice = createSlice({
  name: 'quotations',
  initialState: {
    data: [] as QuotationType[],
    status: PromiseStatus.IDLE,
    error: undefined as ErrorType,
    favoriteIds: [] as FavoriteType[]
  } as QuotationsState,
  reducers: {
    setQuotationsFavoriteIds: (state, action: PayloadAction<FavoriteType[]>) => {
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
      .addCase(loadQuotations.pending, (state) => {
        state.status = PromiseStatus.LOADING;
      })
      .addCase(loadQuotations.fulfilled, (state, action) => {
        state.status = PromiseStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(loadQuotations.rejected, (state, action) => {
        state.status = PromiseStatus.FAILED;
        state.error = action.error.message;
      });
  }
});

// Selectors
export const selectQuotationsData = (state: RootState) => state.quotations.data;
export const selectQuotationsFavoriteIds = (state: RootState) => state.quotations.favoriteIds;
export const selectQuotationsStatus = (state: RootState) => state.quotations.status;
export const selectQuotationsError = (state: RootState) => state.quotations.error;

export const { setQuotationsFavoriteIds, addFavorite, removeFavorite } = quotationsSlice.actions;

export default quotationsSlice;
