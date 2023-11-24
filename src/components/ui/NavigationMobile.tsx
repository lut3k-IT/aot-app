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
      className={'flex w-16 flex-col gap-1 pb-3 pt-4 align-middle'}
    >
      <div className={'relative flex justify-center'}>
        <Icon
          name={data.iconName}
          size={'sm'}
          className={classNames('z-30 text-muted-foreground', {
            '!text-primary-foreground': isActive
          })}
        />
        <div
          className={classNames('absolute -top-0.5 h-[24px] w-12 rounded-full bg-primary transition-all', {
            '!w-6 !bg-background': !isActive
          })}
        />
      </div>
      <div
        className={classNames('w-full text-center text-xs font-semibold leading-none text-muted-foreground', {
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
    <div className='fixed bottom-0 z-20 flex w-full justify-evenly border-t bg-background'>
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
