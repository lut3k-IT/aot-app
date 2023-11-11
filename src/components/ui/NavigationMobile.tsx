import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { v4 } from 'uuid';

import { RoutePath } from '@/constants/enums';
import { getFirstSegmentFromCurrentRoute } from '@/utils/helpers';

import Icon, { IconNames } from './Icon';

interface INavigationElement {
  name: string;
  route: string;
  iconName: IconNames;
}

interface NavigationElementProps {
  data: INavigationElement;
}

const NavigationElement = (props: NavigationElementProps) => {
  const { data } = props;

  useLocation();
  const currentRoute = getFirstSegmentFromCurrentRoute();
  const isActive = data.route.split('/')[1] === currentRoute;

  return (
    <Link
      to={data.route}
      className={'flex flex-col align-middle gap-1 pt-4 pb-3 min-w-[48px]'}
    >
      <div className={'flex justify-center relative'}>
        <Icon
          name={data.iconName}
          size={'sm'}
          className={classNames('z-10 text-muted-foreground', {
            '!text-primary-foreground': isActive
          })}
        />
        <div
          className={classNames('bg-primary rounded-full w-12 h-[24px] absolute -top-0.5 transition-all', {
            '!w-6 !bg-background': !isActive
          })}
        />
      </div>
      <div
        className={classNames('text-xs leading-none text-center font-semibold w-full text-muted-foreground', {
          '!text-foreground': isActive
        })}
      >
        {data.name}
      </div>
    </Link>
  );
};

const NavigationMobile = () => {
  const { t } = useTranslation();

  const navigationData: INavigationElement[] = [
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
      name: t('common:title.quotations'),
      route: RoutePath.QUOTATIONS,
      iconName: 'quote'
    },
    {
      name: t('common:title.quiz'),
      route: RoutePath.QUIZ,
      iconName: 'penLine'
    }
  ];

  return (
    <div className='w-full fixed bottom-0 bg-background border-t flex justify-evenly z-20'>
      {navigationData.map((element) => {
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
