import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './index';

const spoilerModeSlice = createSlice({
  name: 'spoilerMode',
  initialState: false,
  reducers: {
    setSpoilerMode: (_state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
    enableSpoilerMode: () => {
      return true;
    },
    disableSpoilerMode: () => {
      return false;
    }
  }
});

// Selector
export const selectSpoilerMode = (state: RootState) => state.spoilerMode;

export const { setSpoilerMode, enableSpoilerMode, disableSpoilerMode } = spoilerModeSlice.actions;

export default spoilerModeSlice;
