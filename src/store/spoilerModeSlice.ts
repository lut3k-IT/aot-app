import { createSlice } from '@reduxjs/toolkit';

import { getLocalStorageItem, setLocalStorageItem } from '@/utils/storageHelpers';

import { Bool } from './../constants/enums';

const spoilerModeSlice = createSlice({
  name: 'spoilerMode',
  initialState: getLocalStorageItem('spoilerMode') === Bool.TRUE ? true : false,
  reducers: {
    enableSpoilerMode: (state) => {
      setLocalStorageItem('spoilerMode', Bool.TRUE);
      return true;
    },
    disableSpoilerMode: (state) => {
      setLocalStorageItem('spoilerMode', Bool.FALSE);
      return false;
    }
  }
});

export const { enableSpoilerMode, disableSpoilerMode } = spoilerModeSlice.actions;

export default spoilerModeSlice;
