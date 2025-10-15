import { describe, it, expect } from 'vitest';
import { shuffle } from './helpers';

describe('shuffle', () => {
  it('should return an array with the same length', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(array);
    expect(shuffledArray).toHaveLength(array.length);
  });

  it('should return an array with the same elements', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(array);
    expect(shuffledArray.sort()).toEqual(array.sort());
  });

  it('should not return the same array', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffledArray = shuffle(array);
    expect(shuffledArray).not.toEqual(array);
  });

  it('should handle an empty array', () => {
    const array: [] = [];
    const shuffledArray = shuffle(array);
    expect(shuffledArray).toEqual([]);
  });

  it('should handle an array with a single element', () => {
    const array = [1];
    const shuffledArray = shuffle(array);
    expect(shuffledArray).toEqual([1]);
  });
});
