import { useTranslation } from 'react-i18next';

import { Textarea } from '@/components/ui/Textarea';
import { NOTE_MAX_LENGTH } from '@/store/notesSlice';

interface NoteEditorProps {
  value: string;
  isSaved: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const COUNTER_WARNING_THRESHOLD = 900;

const NoteEditor = ({ value, isSaved, onChange, onBlur }: NoteEditorProps) => {
  const { t } = useTranslation();

  return (
    <div className={'flex flex-col gap-2'}>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value.slice(0, NOTE_MAX_LENGTH))}
        onBlur={onBlur}
        maxLength={NOTE_MAX_LENGTH}
        placeholder={t('common:notes.placeholder')}
        className={'min-h-28 resize-y'}
        autoFocus={true}
      />
      <div className={'flex items-center justify-between text-xs text-muted-foreground'}>
        <span className={value.length >= COUNTER_WARNING_THRESHOLD ? 'text-destructive' : undefined}>
          {t('common:notes.counter', { current: value.length, max: NOTE_MAX_LENGTH })}
        </span>
        {isSaved && <span>{t('common:notes.saved')}</span>}
      </div>
      <p className={'text-xs text-muted-foreground'}>{t('common:notes.storageHint')}</p>
    </div>
  );
};

export default NoteEditor;
