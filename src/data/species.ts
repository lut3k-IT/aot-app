export interface SpeciesType {
  id: number;
  keyName: string;
}

export default [
  {
    id: 1,
    keyName: 'horse'
  },
  {
    id: 2,
    keyName: 'human'
  },
  {
    id: 3,
    keyName: 'humanTitan'
  },
  {
    id: 4,
    keyName: 'titanHuman'
  },
  {
    id: 5,
    keyName: 'titan'
  },
  {
    id: 6,
    keyName: 'unknown'
  }
] as SpeciesType[];
