import { useTranslation } from 'react-i18next';

const NoResults = () => {
  const { t } = useTranslation();

  return (
    <div className='flex-center flex-col gap-1 rounded-md bg-primary/10 py-4 dark:bg-primary/20'>
      <h2 className={'text-lg font-bold'}>{t('notifications:error.noResults')}</h2>
      <p>{t('notifications:error.tryDifferentSettings')}</p>
    </div>
  );
};

export default NoResults;
