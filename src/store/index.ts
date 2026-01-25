import { configureStore } from '@reduxjs/toolkit';

import { Bool, LocalStorageKey } from '@/constants/enums';
import { FavoriteType } from '@/constants/types';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/storageHelpers';

import heroesSlice, { setHeroesFavoriteIds } from './heroesSlice';
import quotationsSlice, { setQuotationsFavoriteIds } from './quotationsSlice';
import spoilerModeSlice, { setSpoilerMode } from './spoilerModeSlice';
import titansSlice, { setTitansFavoriteIds } from './titansSlice';

// Helper to parse JSON from localStorage safely
const parseLocalStorageFavorites = (key: LocalStorageKey): FavoriteType[] => {
  const saved = getLocalStorageItem(key);
  return saved ? JSON.parse(saved) : [];
};

export const store = configureStore({
  reducer: {
    heroes: heroesSlice.reducer,
    titans: titansSlice.reducer,
    quotations: quotationsSlice.reducer,
    spoilerMode: spoilerModeSlice.reducer
  }
});

// Hydrate state from localStorage (client-side only)
if (typeof window !== 'undefined') {
  store.dispatch(setHeroesFavoriteIds(parseLocalStorageFavorites(LocalStorageKey.FAV_HEROES)));
  store.dispatch(setTitansFavoriteIds(parseLocalStorageFavorites(LocalStorageKey.FAV_TITANS)));
  store.dispatch(setQuotationsFavoriteIds(parseLocalStorageFavorites(LocalStorageKey.FAV_QUOTATIONS)));
  store.dispatch(setSpoilerMode(getLocalStorageItem(LocalStorageKey.SPOILER_MODE) === Bool.TRUE));
}

// Subscribe to store changes and persist to localStorage
let previousState = store.getState();
store.subscribe(() => {
  const currentState = store.getState();

  // Persist heroes favorites
  if (currentState.heroes.favoriteIds !== previousState.heroes.favoriteIds) {
    setLocalStorageItem(LocalStorageKey.FAV_HEROES, JSON.stringify(currentState.heroes.favoriteIds));
  }

  // Persist titans favorites
  if (currentState.titans.favoriteIds !== previousState.titans.favoriteIds) {
    setLocalStorageItem(LocalStorageKey.FAV_TITANS, JSON.stringify(currentState.titans.favoriteIds));
  }

  // Persist quotations favorites
  if (currentState.quotations.favoriteIds !== previousState.quotations.favoriteIds) {
    setLocalStorageItem(LocalStorageKey.FAV_QUOTATIONS, JSON.stringify(currentState.quotations.favoriteIds));
  }

  // Persist spoiler mode
  if (currentState.spoilerMode !== previousState.spoilerMode) {
    setLocalStorageItem(LocalStorageKey.SPOILER_MODE, currentState.spoilerMode ? Bool.TRUE : Bool.FALSE);
  }

  previousState = currentState;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
