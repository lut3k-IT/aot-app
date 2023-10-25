export interface StatusType {
  id: number;
  keyName: string;
}

export default [
  {
    id: 1,
    keyName: 'alive'
  },
  {
    id: 2,
    keyName: 'dead'
  },
  {
    id: 3,
    keyName: 'unknown'
  }
] as StatusType[];
