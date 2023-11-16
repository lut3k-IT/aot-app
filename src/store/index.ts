import { configureStore } from '@reduxjs/toolkit';

import heroesSlice from './heroesSlice';
import quotationsSlice from './quotationsSlice';
import titansSlice from './titansSlice';

export const store = configureStore({
  reducer: {
    heroes: heroesSlice.reducer,
    titans: titansSlice.reducer,
    quotations: quotationsSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
