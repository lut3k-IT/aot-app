import { IconNames } from '@/components/ui/Icon';

import { RoutePath } from '../constants/enums';

export interface INavigationElement {
  id: number;
  name: string;
  route: string;
  iconName: IconNames;
}

export interface NavigationElementProps {
  data: INavigationElement;
}

export const navigationData: INavigationElement[] = [
  {
    id: 1,
    name: 'common:title.heroes',
    route: RoutePath.HEROES_GALLERY,
    iconName: 'user'
  },
  {
    id: 2,
    name: 'common:title.titans',
    route: RoutePath.TITANS,
    iconName: 'dna'
  },
  {
    id: 3,
    name: 'common:title.quotations',
    route: RoutePath.QUOTATIONS,
    iconName: 'quote'
  },
  {
    id: 4,
    name: 'common:title.quiz',
    route: RoutePath.QUIZ,
    iconName: 'penLine'
  }
];
