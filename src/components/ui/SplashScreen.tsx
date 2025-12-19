import { Loader2 } from 'lucide-react';

import { Theme } from '@/constants/enums';
import { cn } from '@/lib/utils';

import Icon from './Icon';
import { useTheme } from './ThemeProvider';

interface SplashScreenProps {
  className?: string;
}

const SplashScreen = ({ className }: SplashScreenProps) => {
  const { theme } = useTheme();
  const isDark = theme === Theme.DARK;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500',
        'bg-background',
        className
      )}
    >
      <div className='flex flex-col items-center gap-10'>
        <div className='flex items-center gap-4'>
          <Icon
            name='aot'
            className={cn('h-16 w-16 sm:h-20 sm:w-20', isDark ? 'text-primary' : 'text-primary')}
          />
          <div
            className={cn(
              'mt-2 h-10 font-vector text-6xl leading-none sm:h-12 sm:text-7xl',
              isDark ? 'text-white' : 'text-foreground'
            )}
          >
            AOT APP
          </div>
        </div>
        <Loader2 className={cn('h-10 w-10 animate-spin', isDark ? 'text-white' : 'text-foreground')} />
      </div>
    </div>
  );
};

export default SplashScreen;
