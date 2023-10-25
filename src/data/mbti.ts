export interface MbtiType {
  id: number;
  shortName: string;
  keyName: string;
  mbtiGroup: number;
}

export default [
  {
    id: 1,
    shortName: 'INTJ',
    keyName: 'architect',
    mbtiGroup: 1
  },
  {
    id: 2,
    shortName: 'INTP',
    keyName: 'logician',
    mbtiGroup: 1
  },
  {
    id: 3,
    shortName: 'ENTJ',
    keyName: 'commander',
    mbtiGroup: 1
  },
  {
    id: 4,
    shortName: 'ENTP',
    keyName: 'debater',
    mbtiGroup: 1
  },
  {
    id: 5,
    shortName: 'INFJ',
    keyName: 'advocate',
    mbtiGroup: 2
  },
  {
    id: 6,
    shortName: 'INFP',
    keyName: 'mediator',
    mbtiGroup: 2
  },
  {
    id: 7,
    shortName: 'ENFJ',
    keyName: 'protagonist',
    mbtiGroup: 2
  },
  {
    id: 8,
    shortName: 'ENFP',
    keyName: 'campaigner',
    mbtiGroup: 2
  },
  {
    id: 9,
    shortName: 'ISTJ',
    keyName: 'logistician',
    mbtiGroup: 3
  },
  {
    id: 10,
    shortName: 'ISFJ',
    keyName: 'defender',
    mbtiGroup: 3
  },
  {
    id: 11,
    shortName: 'ESTJ',
    keyName: 'executive',
    mbtiGroup: 3
  },
  {
    id: 12,
    shortName: 'ESFJ',
    keyName: 'consul',
    mbtiGroup: 3
  },
  {
    id: 13,
    shortName: 'ISTP',
    keyName: 'virtuoso',
    mbtiGroup: 4
  },
  {
    id: 14,
    shortName: 'ISFP',
    keyName: 'adventurer',
    mbtiGroup: 4
  },
  {
    id: 15,
    shortName: 'ESTP',
    keyName: 'entrepreneur',
    mbtiGroup: 4
  },
  {
    id: 16,
    shortName: 'ESFP',
    keyName: 'entertainer',
    mbtiGroup: 4
  }
] as MbtiType[];
