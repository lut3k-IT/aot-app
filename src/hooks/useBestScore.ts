import { useEffect,useState } from 'react';

import { LocalStorageKey } from '@/constants/enums';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/storageHelpers';

export const useBestScore = () => {
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const storedBestScore = getLocalStorageItem(LocalStorageKey.BEST_SCORE);
    if (storedBestScore) {
      setBestScore(storedBestScore);
    }
  }, []);

  const updateBestScore = (score: number) => {
    if (score > bestScore) {
      setBestScore(score);
      setLocalStorageItem(LocalStorageKey.BEST_SCORE, score);
    }
  };

  return { bestScore, updateBestScore };
};
