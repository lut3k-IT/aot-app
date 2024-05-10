import { useReducer } from 'react';

import { SortDirection } from '@/constants/enums';
import { HeroSortOption } from '@/constants/types';
import { MbtiType } from '@/data/mbti';
import { ResidenceType } from '@/data/residences';
import { SpeciesType } from '@/data/species';
import { StatusType } from '@/data/statuses';

import { DEFAULT_AGE, DEFAULT_HEIGHT, DEFAULT_SORT, DEFAULT_SORT_DIRECTION, DEFAULT_WEIGHT } from '../utils';

type State = {
  selectedStatuses: StatusType[];
  selectedAge: number[];
  selectedHeight: number[];
  selectedWeight: number[];
  selectedMbti: MbtiType[];
  selectedSpecies: SpeciesType[];
  selectedResidence: ResidenceType[];
  hasAge: boolean;
  hasHeight: boolean;
  hasWeight: boolean;
  hasOnlyFavorites: boolean;
  sortBy: HeroSortOption;
  sortDirection: SortDirection;
  search: string;
};

type Action =
  | { type: 'SET_SELECTED_STATUSES'; payload: StatusType[] }
  | { type: 'SET_SELECTED_AGE'; payload: number[] }
  | { type: 'SET_SELECTED_HEIGHT'; payload: number[] }
  | { type: 'SET_SELECTED_WEIGHT'; payload: number[] }
  | { type: 'SET_SELECTED_MBTI'; payload: MbtiType[] }
  | { type: 'SET_SELECTED_SPECIES'; payload: SpeciesType[] }
  | { type: 'SET_SELECTED_RESIDENCE'; payload: ResidenceType[] }
  | { type: 'SET_HAS_AGE'; payload: boolean }
  | { type: 'SET_HAS_HEIGHT'; payload: boolean }
  | { type: 'SET_HAS_WEIGHT'; payload: boolean }
  | { type: 'SET_HAS_ONLY_FAVORITES'; payload: boolean }
  | { type: 'SET_SORT_BY'; payload: HeroSortOption }
  | { type: 'SET_SORT_DIRECTION'; payload: SortDirection }
  | { type: 'SET_SEARCH'; payload: string };

const initialState: State = {
  selectedStatuses: [],
  selectedAge: DEFAULT_AGE,
  selectedHeight: DEFAULT_HEIGHT,
  selectedWeight: DEFAULT_WEIGHT,
  selectedMbti: [],
  selectedSpecies: [],
  selectedResidence: [],
  hasAge: false,
  hasHeight: false,
  hasWeight: false,
  hasOnlyFavorites: false,
  sortBy: DEFAULT_SORT,
  sortDirection: DEFAULT_SORT_DIRECTION,
  search: ''
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SELECTED_STATUSES':
      return { ...state, selectedStatuses: action.payload };
    case 'SET_SELECTED_AGE':
      return { ...state, selectedAge: action.payload };
    case 'SET_SELECTED_HEIGHT':
      return { ...state, selectedHeight: action.payload };
    case 'SET_SELECTED_WEIGHT':
      return { ...state, selectedWeight: action.payload };
    case 'SET_SELECTED_MBTI':
      return { ...state, selectedMbti: action.payload };
    case 'SET_SELECTED_SPECIES':
      return { ...state, selectedSpecies: action.payload };
    case 'SET_SELECTED_RESIDENCE':
      return { ...state, selectedResidence: action.payload };
    case 'SET_HAS_AGE':
      return { ...state, hasAge: action.payload };
    case 'SET_HAS_HEIGHT':
      return { ...state, hasHeight: action.payload };
    case 'SET_HAS_WEIGHT':
      return { ...state, hasWeight: action.payload };
    case 'SET_HAS_ONLY_FAVORITES':
      return { ...state, hasOnlyFavorites: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_SORT_DIRECTION':
      return { ...state, sortDirection: action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    default:
      return state;
  }
}

export function useFilterReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch
  };
}
