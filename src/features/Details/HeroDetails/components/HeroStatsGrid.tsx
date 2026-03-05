import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import HeroStatus from '@/components/ui/HeroStatus';
import SpoilerContent from '@/components/ui/SpoilerContent';
import { HeroType } from '@/constants/types';
import { getResidenceName, getSpeciesName } from '@/utils/dataHelpers';

import HeroStatTile from './HeroStatTile';

interface HeroStatsGridProps {
  hero: HeroType;
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

const HeroStatsGrid = ({ hero }: HeroStatsGridProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className={'mt-4 grid grid-cols-2 gap-3 md:grid-cols-3'}
      variants={containerVariants}
      initial={'hidden'}
      animate={'visible'}
    >
      <motion.div variants={itemVariants}>
        <HeroStatTile
          icon={'dna'}
          label={t('data:species.title')}
          value={<SpoilerContent>{getSpeciesName(hero.species, t)}</SpoilerContent>}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <HeroStatTile
          icon={'penLine'}
          label={t('data:status.title')}
          value={
            <SpoilerContent>
              <HeroStatus
                statusId={hero.status}
                textAbbreviation={'long'}
              />
            </SpoilerContent>
          }
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <HeroStatTile
          icon={'mapPin'}
          label={t('data:residence.title')}
          value={
            <SpoilerContent>
              <span>{getResidenceName(hero.residence, t) || '—'}</span>
            </SpoilerContent>
          }
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <HeroStatTile
          icon={'calendar'}
          label={t('data:age.title')}
          value={hero.age ?? '—'}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <HeroStatTile
          icon={'ruler'}
          label={t('data:height.title')}
          value={hero.height ? `${hero.height} cm` : '—'}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <HeroStatTile
          icon={'scale'}
          label={t('data:weight.title')}
          value={hero.weight ? `${hero.weight} kg` : '—'}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroStatsGrid;
