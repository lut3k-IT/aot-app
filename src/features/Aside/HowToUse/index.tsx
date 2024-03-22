import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { ExternalUrl } from '@/constants/enums';

const HowToUse = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          iconName={'helpCircle'}
          size={'icon'}
          variant={'ghost'}
          iconProps={{ variant: 'gray' }}
        />
      </DialogTrigger>
      <DialogContent className={'h-[37.5rem] max-h-[100svh]'}>
        <DialogHeader>
          <DialogTitle>{t('howToUse:dialog.title')}</DialogTitle>
          <DialogDescription>{t('howToUse:dialog.description')}</DialogDescription>
        </DialogHeader>
        <ScrollArea className={'-mx-2 -mr-4 h-full pr-2'}>
          <div className='article mx-2 py-4'>
            <div>
              <h2>{t('howToUse:spoilerMode.title')}</h2>
              <p>{t('howToUse:spoilerMode.description')}</p>
              <h2>{t('howToUse:actionYear.title')}</h2>
              <p>{t('howToUse:actionYear.description')}</p>
              <h2>{t('howToUse:details.title')}</h2>
              <p>{t('howToUse:details.description')}</p>
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
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default HowToUse;
