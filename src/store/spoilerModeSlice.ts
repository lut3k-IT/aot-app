import { createSlice } from '@reduxjs/toolkit';

import { getLocalStorageItem, setLocalStorageItem } from '@/utils/storageHelpers';

import { Bool, LocalStorageKey } from './../constants/enums';

const spoilerModeSlice = createSlice({
  name: LocalStorageKey.SPOILER_MODE,
  initialState: getLocalStorageItem(LocalStorageKey.SPOILER_MODE) === Bool.TRUE ? true : false,
  reducers: {
    enableSpoilerMode: (state) => {
      setLocalStorageItem(LocalStorageKey.SPOILER_MODE, Bool.TRUE);
      return true;
    },
    disableSpoilerMode: (state) => {
      setLocalStorageItem(LocalStorageKey.SPOILER_MODE, Bool.FALSE);
      return false;
    }
  }
});

export const { enableSpoilerMode, disableSpoilerMode } = spoilerModeSlice.actions;

export default spoilerModeSlice;
