import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { MbtiGroups } from '@/constants/types';
import mbtiData from '@/data/mbti';
import { getMbtiGroupName, getMbtiShortName } from '@/utils/dataHelpers';

import { getMbtiGroupClasses } from '../../utils/mbtiColors';

interface HeroMbtiCardProps {
  mbtiId: number | null;
  mbtiGroupName: MbtiGroups;
}

const HeroMbtiCard = ({ mbtiId, mbtiGroupName }: HeroMbtiCardProps) => {
  const { t } = useTranslation();
  const colors = getMbtiGroupClasses(mbtiGroupName);
  const shortName = getMbtiShortName(mbtiId);
  const mbtiObj = mbtiData.find((m) => m.id === mbtiId);
  const longName = mbtiObj ? t(`data:mbti.${mbtiObj.keyName}`) : null;
  const groupName = mbtiObj ? getMbtiGroupName(mbtiObj.mbtiGroup, t) : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className={`mt-6 flex items-center gap-4 overflow-hidden rounded-lg border bg-card p-4 ${colors.border}`}
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white ${colors.bg}`}
      >
        {shortName || '?'}
      </div>
      <div className={'flex flex-col gap-0.5'}>
        <div className={'text-sm text-muted-foreground'}>{t('data:mbti.title')}</div>
        <div className={'text-base font-semibold capitalize'}>{longName || t('data:mbti.unknown')}</div>
        {groupName && (
          <div className={`text-xs font-medium capitalize ${colors.text}`}>{groupName}</div>
        )}
      </div>
    </motion.div>
  );
};

export default HeroMbtiCard;
