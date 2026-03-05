import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import SpoilerContent from '@/components/ui/SpoilerContent';
import { TitanType } from '@/constants/types';
import { getAllegianceNames } from '@/utils/dataHelpers';

import TitanStatTile from './TitanStatTile';

interface TitanStatsGridProps {
  titan: TitanType;
  currentInheritor: string;
  formerInheritors: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const TitanStatsGrid = ({ titan, currentInheritor, formerInheritors }: TitanStatsGridProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className={'mt-4 grid grid-cols-2 gap-3 md:grid-cols-3'}
      variants={containerVariants}
      initial={'hidden'}
      animate={'visible'}
    >
      <motion.div variants={itemVariants}>
        <TitanStatTile
          icon={'ruler'}
          label={t('data:height.title')}
          value={titan.height ? `${titan.height} cm` : '—'}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <TitanStatTile
          icon={'shield'}
          label={t('data:allegiance.title')}
          value={getAllegianceNames(titan.allegiance, t).join(', ') || '—'}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <TitanStatTile
          icon={'user'}
          label={t('data:currentInheritor')}
          value={<SpoilerContent>{currentInheritor}</SpoilerContent>}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <TitanStatTile
          icon={'users'}
          label={t('data:formerInheritors')}
          value={<SpoilerContent>{formerInheritors}</SpoilerContent>}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <TitanStatTile
          icon={'tag'}
          label={t('data:otherNames')}
          value={titan.otherNames.length > 0 ? titan.otherNames.join(', ') : '—'}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <TitanStatTile
          icon={'zap'}
          label={t('data:abilities')}
          value={titan.abilities.length > 0 ? titan.abilities.join(', ') : '—'}
        />
      </motion.div>
    </motion.div>
  );
};

export default TitanStatsGrid;
