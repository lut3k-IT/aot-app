'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import useAppSelector from '@/components/hooks/useAppSelector';
import { useToast } from '@/components/hooks/useToast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { fadeInUp } from '@/constants/motion';
import { NoteEntity } from '@/constants/types';
import { removeNote, selectNoteFor, setNote } from '@/store/notesSlice';

import NoteEditor from './NoteEditor';

const SAVE_DEBOUNCE_MS = 600;

interface CharacterNoteProps {
  entity: NoteEntity;
  id: number;
}

const CharacterNote = ({ entity, id }: CharacterNoteProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const note = useAppSelector(selectNoteFor(entity, id));

  const [draft, setDraft] = useState(note?.text || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isConfirmingRemoval, setIsConfirmingRemoval] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Przejscie na inna postac musi wczytac jej wlasna notatke.
  // Celowo zalezy wylacznie od tozsamosci postaci — dopisanie `note` nadpisywaloby
  // tekst w trakcie pisania, bo kazdy zapis tworzy nowy obiekt notatki.
  useEffect(() => {
    setDraft(note?.text || '');
    setIsEditing(false);
    setIsSaved(false);
  }, [entity, id]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const persistDraft = useCallback(
    (text: string) => {
      dispatch(setNote({ entity, id, text }));
      setIsSaved(true);
    },
    [dispatch, entity, id]
  );

  const handleChange = (value: string) => {
    setDraft(value);
    setIsSaved(false);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => persistDraft(value), SAVE_DEBOUNCE_MS);
  };

  const handleBlur = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    persistDraft(draft);
  };

  const handleDone = () => {
    handleBlur();
    setIsEditing(false);
  };

  const handleRemove = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    dispatch(removeNote({ entity, id }));
    setDraft('');
    setIsEditing(false);
    setIsConfirmingRemoval(false);
    toast({ title: t('notifications:common.noteRemoved') });
  };

  return (
    <motion.div
      className={'mt-4'}
      variants={fadeInUp}
      initial={'hidden'}
      animate={'show'}
    >
      <Card>
        <CardHeader>
          <CardTitle
            headingLevel={'h2'}
            className={'text-xl'}
          >
            {t('common:notes.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className={'flex flex-col gap-3'}>
          {isEditing ? (
            <>
              <NoteEditor
                value={draft}
                isSaved={isSaved}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className={'flex justify-end'}>
                <Button
                  variant={'secondary'}
                  onClick={handleDone}
                >
                  {t('common:notes.done')}
                </Button>
              </div>
            </>
          ) : note ? (
            <>
              <p className={'whitespace-pre-wrap wrap-break-word text-sm'}>{note.text}</p>
              <p className={'text-xs text-muted-foreground'}>
                {t('common:notes.updatedAt', { date: dayjs(note.updatedAt).format('DD.MM.YYYY') })}
              </p>
              <div className={'flex gap-2'}>
                <Button
                  variant={'secondary'}
                  onClick={() => setIsEditing(true)}
                >
                  {t('common:notes.edit')}
                </Button>
                <Button
                  variant={'ghost'}
                  onClick={() => setIsConfirmingRemoval(true)}
                >
                  {t('common:notes.remove')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className={'text-sm text-muted-foreground'}>{t('common:notes.empty')}</p>
              <div>
                <Button onClick={() => setIsEditing(true)}>{t('common:notes.add')}</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={isConfirmingRemoval}
        onOpenChange={setIsConfirmingRemoval}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('common:notes.removeConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('common:notes.removeConfirmDescription')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common:notes.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove}>{t('common:notes.remove')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default CharacterNote;
