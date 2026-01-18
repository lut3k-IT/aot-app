import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import CharacterPicture from '@/components/ui/CharacterPicture';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog';
import MbtiFrame from '@/components/ui/MbtiFrame';
import { ScrollArea } from '@/components/ui/ScrollArea';
import SwitchSpoilerMode from '@/components/ui/SwitchSpoilerMode';
import { YEAR } from '@/constants/constants';
import { ExternalUrl, RoutePath } from '@/constants/enums';

interface ExampleSectionProps {
  children: React.ReactNode;
}

const ExampleSection = ({ children }: ExampleSectionProps) => {
  return <div className={'my-4 w-full rounded-md border-2 border-dashed p-6'}>{children}</div>;
};

interface HowToUseProps {
  variant?: 'icon' | 'text';
}

const HowToUse = ({ variant = 'icon' }: HowToUseProps) => {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === 'icon' ? (
          <Button
            iconName={'helpCircle'}
            size={'icon'}
            variant={'ghost'}
            iconProps={{ variant: 'gray' }}
            aria-label={t('common:howToUse')}
          />
        ) : (
          <a suppressHydrationWarning>{t('common:howToUse')}</a>
        )}
      </DialogTrigger>
      <DialogContent className={'h-[37.5rem] max-h-[100svh]'}>
        <DialogHeader>
          <DialogTitle>{t('howToUse:dialog.title')}</DialogTitle>
          <DialogDescription>{t('howToUse:dialog.description')}</DialogDescription>
        </DialogHeader>
        <ScrollArea className={'scroll-area'}>
          <div className='article'>
            <h2>{t('howToUse:spoilerMode.title')}</h2>
            <p>{t('howToUse:spoilerMode.description')}</p>
            <div className={'mb-4'}>
              <ExampleSection>
                <SwitchSpoilerMode />
              </ExampleSection>
            </div>
            <h2>{t('howToUse:actionYear.title')}</h2>
            <p>{t('howToUse:actionYear.description')}</p>
            <ExampleSection>
              <div className={'text-4xl font-bold leading-none tracking-wide text-muted2-foreground'}>
                {t('common:time.year.singular')} {YEAR}
              </div>
            </ExampleSection>
            <h2>{t('howToUse:details.title')}</h2>
            <p>{t('howToUse:details.description')}</p>
            <ExampleSection>
              <Link
                href={`${RoutePath.HERO_DETAILS}/armin-arlelt`}
                className={'rounded-md'}
              >
                <MbtiFrame mbtiId={5}>
                  <CharacterPicture
                    imgSource={'/assets/img/heroes/armin-arlelt.jpg'}
                    variant={'roundedBtm'}
                  />
                </MbtiFrame>
              </Link>
            </ExampleSection>
            <h2>{t('howToUse:mbti.title')}</h2>
            <p>{t('howToUse:mbti.description')}</p>
            {/* <h3>{t('howToUse:mbti.sourceTitle')}</h3> */}
            <ul>
              <li>
                <strong>{t('howToUse:mbti.source')}:&nbsp;</strong>
                <a href={ExternalUrl.PERSONALITY_DATABASE}>{ExternalUrl.PERSONALITY_DATABASE}</a>
              </li>
              <li>
                <strong>{t('howToUse:mbti.updateDate.title')}:</strong> {t('howToUse:mbti.updateDate.date')}
              </li>
            </ul>
            <h3>{t('howToUse:mbti.types.title')}</h3>
            <h4>{t('howToUse:mbti.types.analysts.title')}</h4>
            <ul>
              <li>{t('howToUse:mbti.types.analysts.intj')}</li>
              <li>{t('howToUse:mbti.types.analysts.intp')}</li>
              <li>{t('howToUse:mbti.types.analysts.entj')}</li>
              <li>{t('howToUse:mbti.types.analysts.entp')}</li>
            </ul>
            <h4>{t('howToUse:mbti.types.diplomats.title')}</h4>
            <ul>
              <li>{t('howToUse:mbti.types.diplomats.infj')}</li>
              <li>{t('howToUse:mbti.types.diplomats.infp')}</li>
              <li>{t('howToUse:mbti.types.diplomats.enfj')}</li>
              <li>{t('howToUse:mbti.types.diplomats.enfp')}</li>
            </ul>
            <h4>{t('howToUse:mbti.types.sentinels.title')}</h4>
            <ul>
              <li>{t('howToUse:mbti.types.sentinels.istj')}</li>
              <li>{t('howToUse:mbti.types.sentinels.isfj')}</li>
              <li>{t('howToUse:mbti.types.sentinels.estj')}</li>
              <li>{t('howToUse:mbti.types.sentinels.esfj')}</li>
            </ul>
            <h4>{t('howToUse:mbti.types.explorers.title')}</h4>
            <ul>
              <li>{t('howToUse:mbti.types.explorers.istp')}</li>
              <li>{t('howToUse:mbti.types.explorers.isfp')}</li>
              <li>{t('howToUse:mbti.types.explorers.estp')}</li>
              <li>{t('howToUse:mbti.types.explorers.esfp')}</li>
            </ul>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default HowToUse;
