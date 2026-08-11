import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NoteEntity, NotesByEntity } from '@/constants/types';

import type { RootState } from './index';

/** Twardy limit dlugosci notatki. Dluzszy tekst jest przycinany przy wprowadzaniu. */
export const NOTE_MAX_LENGTH = 1000;

const initialState: NotesByEntity = {
  hero: {},
  titan: {}
};

interface SetNotePayload {
  entity: NoteEntity;
  id: number;
  text: string;
}

interface RemoveNotePayload {
  entity: NoteEntity;
  id: number;
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setAllNotes: (_state, action: PayloadAction<NotesByEntity>) => action.payload,
    setNote: (state, action: PayloadAction<SetNotePayload>) => {
      const { entity, id, text } = action.payload;
      const trimmedText = text.trim();

      // Pusta notatka jest rownoznaczna z jej brakiem — inaczej znacznik na karcie
      // zapalalby sie dla postaci bez tresci.
      if (trimmedText.length === 0) {
        delete state[entity][id];
        return;
      }

      state[entity][id] = {
        text: text.slice(0, NOTE_MAX_LENGTH),
        updatedAt: new Date().toISOString()
      };
    },
    removeNote: (state, action: PayloadAction<RemoveNotePayload>) => {
      const { entity, id } = action.payload;
      delete state[entity][id];
    }
  }
});

// Selectors
export const selectNotes = (state: RootState) => state.notes;
export const selectNoteFor = (entity: NoteEntity, id: number | undefined) => (state: RootState) =>
  id === undefined ? undefined : state.notes[entity][id];
// Selektory list musza byc zapamietane. Bez tego kazde wywolanie zwracaloby nowa tablice,
// co przy porownaniu przez referencje przerysowywaloby galerie po kazdej zmianie w sklepie.
const selectHeroNotedIds = createSelector([(state: RootState) => state.notes.hero], (notes) =>
  Object.keys(notes).map(Number)
);
const selectTitanNotedIds = createSelector([(state: RootState) => state.notes.titan], (notes) =>
  Object.keys(notes).map(Number)
);

export const selectNotedIds = (entity: NoteEntity) => (entity === 'hero' ? selectHeroNotedIds : selectTitanNotedIds);

export const { setAllNotes, setNote, removeNote } = notesSlice.actions;

export default notesSlice;
