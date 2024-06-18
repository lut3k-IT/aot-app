import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea';
import { ExternalUrl, RoutePath } from '@/constants/enums';
import HowToUse from '@/features/Aside/HowToUse';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <ScrollArea className={'h-5 w-full whitespace-nowrap px-4'}>
      <footer
        className={
          'mx-auto flex w-full items-center justify-center gap-8 [&>*:hover]:underline [&>*]:text-sm [&>*]:text-muted-foreground'
        }
      >
        <HowToUse variant={'text'} />
        <Link to={RoutePath.ABOUT}>{t('common:title.about')}</Link>
        <Link to={RoutePath.CHANGELOG}>{t('common:title.changelog')}</Link>
        <Link to={RoutePath.TERMS_OF_SERVICE}>{t('common:title.termsAndConditions')}</Link>
        <a
          href={ExternalUrl.PORTFOLIO}
          target='_blank'
          rel='noreferrer'
          className={'text-sm hover:underline'}
        >
          {t('common:title.portfolio')}
        </a>
      </footer>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
};

export default Footer;
