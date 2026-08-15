/**
 * Warianty układu powłoki aplikacji — narzędzie porównawcze na czas prac nad layoutem.
 * Przełącznik pokazuje się wyłącznie w trybie deweloperskim; produkcja zawsze dostaje
 * `DEFAULT_LAYOUT_VARIANT`. Po wybraniu docelowego układu cały ten moduł znika razem
 * z przełącznikiem i gałęziami warunkowymi w powłoce.
 */
export enum LayoutVariant {
  /** Stan obecny: karta na pełną wysokość okna z własnym paskiem przewijania. */
  CURRENT = 'current',
  /** A: strona przewija się jak zwykła witryna, bez karty i bez zagnieżdżonego scrolla. */
  OPEN = 'open',
  /** B: otwarta powłoka + filtry na stałe w kolumnie obok siatki. */
  ASIDE = 'aside',
  /** C: otwarta powłoka + przełącznik siatka/lista, domyślnie gęsta lista. */
  LIST = 'list'
}

export const DEFAULT_LAYOUT_VARIANT = LayoutVariant.CURRENT;

export const LAYOUT_VARIANTS = [
  LayoutVariant.CURRENT,
  LayoutVariant.OPEN,
  LayoutVariant.ASIDE,
  LayoutVariant.LIST
] as const;

/** Etykiety wyłącznie dla przełącznika deweloperskiego, więc bez i18n. */
export const LAYOUT_VARIANT_LABELS: Record<LayoutVariant, string> = {
  [LayoutVariant.CURRENT]: 'Obecny',
  [LayoutVariant.OPEN]: 'A · Otwarta strona',
  [LayoutVariant.ASIDE]: 'B · Filtry z boku',
  [LayoutVariant.LIST]: 'C · Widok listy'
};

export const LAYOUT_VARIANT_HINTS: Record<LayoutVariant, string> = {
  [LayoutVariant.CURRENT]: 'Karta na całą wysokość, własny scroll',
  [LayoutVariant.OPEN]: 'Zwykłe przewijanie, szeroka siatka',
  [LayoutVariant.ASIDE]: 'Filtry zawsze widoczne obok siatki',
  [LayoutVariant.LIST]: 'Gęsta lista zamiast kart'
};

export const isLayoutVariant = (value: string | null): value is LayoutVariant =>
  !!value && (LAYOUT_VARIANTS as readonly string[]).includes(value);

/** Warianty A, B i C dzielą tę samą otwartą powłokę; różnią się układem samej galerii. */
export const isOpenShellVariant = (variant: LayoutVariant) => variant !== LayoutVariant.CURRENT;
