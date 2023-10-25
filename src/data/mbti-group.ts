export interface MbtiGroupType {
  id: number;
  keyName: string;
}

export default [
  {
    id: 1,
    keyName: 'analysts'
  },
  {
    id: 2,
    keyName: 'diplomats'
  },
  {
    id: 3,
    keyName: 'sentinels'
  },
  {
    id: 4,
    keyName: 'explorers'
  }
] as MbtiGroupType[];
