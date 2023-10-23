import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { RoutePath } from '@/constants';
import { useTranslation } from 'react-i18next';

interface ButtonGoBackProps {
  text?: string;
  className?: string;
  fallbackRoute?: RoutePath;
}

const ButtonGoBack = (props: ButtonGoBackProps) => {
  const { t } = useTranslation();
  const { text = t('common:navigation.goBack'), className, fallbackRoute = RoutePath.HEROES_GALLERY } = props;
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallbackRoute);
    }
  };

  return (
    <Button
      onClick={handleGoBack}
      className={cn('pl-2', className)}
      variant={'outline'}
      iconName={'chevronLeft'}
    >
      {text}
    </Button>
  );
};

export default ButtonGoBack;