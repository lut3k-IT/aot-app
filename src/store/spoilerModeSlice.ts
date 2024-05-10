import { createSlice } from '@reduxjs/toolkit';

import { getLocalStorageItem, setLocalStorageItem } from '@/utils/storageHelpers';

import { Bool, LocalStorageKey } from './../constants/enums';

const spoilerModeSlice = createSlice({
  name: LocalStorageKey.SPOILER_MODE,
  initialState: getLocalStorageItem(LocalStorageKey.SPOILER_MODE) === Bool.TRUE ? true : false,
  reducers: {
    enableSpoilerMode: () => {
      setLocalStorageItem(LocalStorageKey.SPOILER_MODE, Bool.TRUE);
      return true;
    },
    disableSpoilerMode: () => {
      setLocalStorageItem(LocalStorageKey.SPOILER_MODE, Bool.FALSE);
      return false;
    }
  }
});

export const { enableSpoilerMode, disableSpoilerMode } = spoilerModeSlice.actions;

export default spoilerModeSlice;
