import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { v4 } from 'uuid';

import { RoutePath } from '@/constants';

import Icon, { IconNames } from './icon';

interface INavigationElement {
  name: string;
  route: string;
  iconName: IconNames;
}

interface NavigationElementProps {
  data: INavigationElement;
}

const navigationElements: INavigationElement[] = [
  {
    name: t('common:title.heroes'),
    route: RoutePath.HEROES_GALLERY,
    iconName: 'user'
  },
  {
    name: t('common:title.titans'),
    route: RoutePath.TITANS,
    iconName: 'dna'
  },
  {
    name: t('common:title.favorites'),
    route: RoutePath.FAVORITES,
    iconName: 'heart'
  },
  {
    name: t('common:title.quiz'),
    route: RoutePath.QUIZ,
    iconName: 'penLine'
  }
];

const NavigationElement = (props: NavigationElementProps) => {
  const { data } = props;

  return (
    <Link
      to={data.route}
      className='flex flex-col align-middle gap-1 pt-4 pb-3 min-w-[48px] text-muted-foreground'
    >
      <div className={'flex justify-center relative'}>
        <Icon
          name={data.iconName}
          size={'sm'}
          className={'z-10'}
        />
        <div className={'bg-primary rounded-full w-12 h-[22px] absolute -top-[1px]'} />
      </div>
      <div className={'text-xs leading-none text-center font-semibold w-full'}>{data.name}</div>
    </Link>
  );
};

const NavigationMobile = () => {
  return (
    <div className='w-full fixed bottom-0 px-page-mobile border-t border-accent flex justify-between'>
      {navigationElements.map((element) => {
        return (
          <NavigationElement
            key={v4()}
            data={element}
          />
        );
      })}
    </div>
  );
};

export default NavigationMobile;
