import { Link } from 'react-router-dom';
import { t } from 'i18next';

import { RoutePath } from '@/constants/enums';
import { cn } from '@/lib/utils';

import Icon from './Icon';

interface AotLogoProps {
  className?: string;
}

const AotLogo = (props: AotLogoProps) => {
  const { className } = props;

  return (
    <Link
      to={RoutePath.LANDING}
      className={cn(
        'flex gap-2 rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
    >
      <Icon
        name={'aotLg'}
        size={'lg'}
      />
      <div className='text-xl font-bold'>{t('common:brand')}</div>
    </Link>
  );
};

export default AotLogo;