'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

import { RoutePath } from '@/constants/enums';
import { cn } from '@/lib/utils';

import { Button } from './Button';

interface ButtonGoBackProps {
  text?: string;
  className?: string;
  fallbackRoute?: RoutePath;
}

const ButtonGoBack = (props: ButtonGoBackProps) => {
  const { t } = useTranslation();
  const { text = t('common:navigation.goBack'), className, fallbackRoute = RoutePath.HEROES_GALLERY } = props;
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.state && window.history.state.idx > 0) {
      router.back();
    } else {
      router.push(fallbackRoute);
    }
  };

  return (
    <Button
      onClick={handleGoBack}
      className={cn('pl-2', className)}
      variant={'outline'}
      iconName={'chevronLeft'}
      aria-label={text}
    >
      {text}
    </Button>
  );
};

export default ButtonGoBack;
