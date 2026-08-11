# Notatki, animacje i wielojęzyczność — plan wdrożenia

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dodać notatki przy postaciach, globalną animację dodania do ulubionych, dziesięć nowych języków z dociąganiem na żądanie, ukrywanie pseudonimów w trybie spoilerów, spójny system animacji oraz naprawić podwójne naliczanie punktu w quizie.

**Architecture:** Notatki dostają własny fragment stanu Redux zapisywany do `localStorage` przez istniejący mechanizm subskrypcji sklepu — dokładnie tak, jak działają ulubione. Animacja serca jest jednym komponentem warstwy efektu wpiętym w dwa istniejące przyciski, więc obejmuje całą aplikację bez zmian w miejscach użycia. Tłumaczenia nowych języków leżą poza główną paczką i są dociągane dynamicznym importem przy zmianie języka. Ruch interfejsu opisuje jeden słownik stałych w `src/constants/motion.ts`.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Redux Toolkit, i18next + react-i18next, framer-motion 12, Tailwind CSS 3, Radix UI / shadcn.

**Spec:** `docs/superpowers/specs/2026-08-11-notes-motion-i18n-design.md`

## Global Constraints

- Projekt **nie ma uruchamiacza testów**. Cykl weryfikacji każdego zadania to `npm run lint`, `npm run build` oraz wskazany scenariusz ręczny. Nie dodawaj frameworka testowego — to poza zakresem.
- **Nie uruchamiaj serwera deweloperskiego ani podglądu** z własnej inicjatywy. Scenariusze ręczne wykonuje użytkownik; opisz mu je, gdy zadanie tego wymaga.
- Formatowanie (Prettier): pojedyncze cudzysłowy, także w JSX, **bez przecinków końcowych**, szerokość 120 znaków, jeden atrybut JSX w linii, sortowanie klas Tailwind.
- Nazewnictwo (ESLint): `camelCase` dla zmiennych i funkcji, `PascalCase` dla komponentów i typów, `UPPER_CASE` dla stałych i pól wyliczeń. **Wartości logiczne muszą mieć przedrostek** `is`, `should`, `has`, `can`, `did`, `will` lub `match`.
- `@typescript-eslint/no-explicit-any` jest błędem. Wyjątki wyłącznie tam, gdzie już istnieją w pliku.
- Importy sortuje `simple-import-sort` — nie zmieniaj kolejności ręcznie, uruchom `npm run lint -- --fix`.
- Alias ścieżek: `@/*` wskazuje na `./src/*`.
- Każdy nowy tekst widoczny dla użytkownika przechodzi przez i18next. Żadnych napisów wpisanych na stałe w komponencie.
- Nowe klucze tłumaczeń dodawaj **najpierw do `pl` i `en`**; nowe języki uzupełniasz w fazie 4.
- Commituj po każdym zadaniu. Gałąź robocza: `dev`.

---

## Struktura plików

**Nowe pliki**

| Ścieżka | Odpowiedzialność |
| --- | --- |
| `src/constants/motion.ts` | Jedyne źródło czasów, krzywych i wariantów animacji. |
| `src/components/ui/HeartBurst.tsx` | Warstwa efektu cząstek przy dodaniu do ulubionych. |
| `src/store/notesSlice.ts` | Stan notatek, akcje i selektory. |
| `src/features/Details/components/CharacterNote/index.tsx` | Stany notatki (pusta / edycja / zapisana), zapis z opóźnieniem. |
| `src/features/Details/components/CharacterNote/NoteEditor.tsx` | Pole tekstowe z licznikiem i informacją o zapisie. |
| `src/i18n/loadLanguage.ts` | Dociąganie zasobów językowych i lokalizacji `dayjs`. |
| `scripts/check-i18n.mjs` | Kontrola spójności plików tłumaczeń względem `en`. |
| `src/i18n/locales/{es,pt,de,fr,it,ru,ja,zh,ko,tr}/*.json` | Tłumaczenia dziesięciu nowych języków. |

**Modyfikowane pliki**

| Ścieżka | Zakres zmiany |
| --- | --- |
| `src/components/providers/Providers.tsx` | `MotionConfig`, oczekiwanie na dociągnięcie wykrytego języka. |
| `src/components/ui/HeartButton.tsx` | Puls ikony i wpięcie `HeartBurst`. |
| `src/components/ui/FavoriteButton.tsx` | Puls i wpięcie `HeartBurst`. |
| `src/components/ui/Icon.tsx` | Nowa nazwa ikony `stickyNote`. |
| `src/components/ui/Card.tsx` | `CardTitle` z konfigurowalnym poziomem nagłówka. |
| `src/components/ui/LanguageSwitcher.tsx` | Dwanaście języków, przewijana lista, stan dociągania. |
| `src/components/ui/HeroCard/index.tsx`, `src/components/ui/TitanCard/index.tsx` | Znacznik notatki. |
| `src/constants/enums.ts` | `LocalStorageKey.NOTES`, `Param.NOTES`, nowe języki. |
| `src/constants/types.ts` | `NoteEntity`, `NoteType`, `hasOnlyNoted`. |
| `src/store/index.ts` | Hydratacja i zapis notatek. |
| `src/features/Quiz/index.tsx`, `src/features/Quiz/components/Answers.tsx` | Przeniesienie stanu odpowiedzi do komponentu nadrzędnego. |
| `src/features/Details/HeroDetails/*`, `src/features/Details/TitanDetails/*` | Notatka, pseudonimy pod spoilerem, poziomy nagłówków. |
| `src/features/Comparison/components/ComparisonTable.tsx` | Pseudonimy pod spoilerem. |
| `src/features/Heroes/**`, `src/features/TitansGallery/**` | Filtr „z notatkami”, animacje galerii. |
| `src/i18n/config.ts` | Rejestr języków, dociąganie. |
| `src/i18n/locales/{pl,en}/*.json` | Nowe klucze. |
| `package.json` | Skrypt `check:i18n`. |

---

# Faza 1 — Fundament ruchu

### Task 1: Słownik ruchu i globalne poszanowanie redukcji animacji

**Files:**
- Create: `src/constants/motion.ts`
- Modify: `src/components/providers/Providers.tsx`

**Interfaces:**
- Produces: `MOTION_DURATION`, `MOTION_EASE`, `HEART_SPRING`, `fadeInUp`, `scaleIn`, `pageTransition`, `getStaggerDelay(index: number): number` — używane przez zadania 2, 7 i 17.

- [ ] **Step 1: Utwórz słownik ruchu**

Utwórz `src/constants/motion.ts`:

```ts
import { Transition, Variants } from 'framer-motion';

/** Czasy trwania animacji w sekundach — jedyne źródło prawdy dla całej aplikacji. */
export const MOTION_DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4
} as const;

/** Standardowa krzywa wyjścia. Ruch startuje szybko i wyhamowuje. */
export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

/** Sprężystość zarezerwowana dla animacji serca. */
export const HEART_SPRING: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 15,
  mass: 0.5
};

/** Maksymalna liczba elementów objętych kaskadą — dalsze pojawiają się bez narastającego opóźnienia. */
const STAGGER_MAX_ITEMS = 12;
const STAGGER_STEP = 0.04;

export const getStaggerDelay = (index: number) => Math.min(index, STAGGER_MAX_ITEMS) * STAGGER_STEP;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE } }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE } }
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: MOTION_DURATION.slow, ease: MOTION_EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: MOTION_DURATION.fast, ease: MOTION_EASE } }
};
```

- [ ] **Step 2: Włącz globalne poszanowanie systemowej redukcji ruchu**

W `src/components/providers/Providers.tsx` dodaj import:

```tsx
import { MotionConfig } from 'framer-motion';
```

Owiń zawartość `ThemeProvider` w `MotionConfig`. Fragment zwracany przez komponent ma wyglądać tak:

```tsx
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <MotionConfig reducedMotion={'user'}>
          <ThemeProvider
            defaultTheme={Theme.LIGHT}
            storageKey={LocalStorageKey.THEME}
          >
            {isI18nReady ? children : null}
          </ThemeProvider>
        </MotionConfig>
      </I18nextProvider>
```

Zamknięcie `</MotionConfig>` musi znaleźć się między `</ThemeProvider>` a `</I18nextProvider>`. Reszta pliku bez zmian.

- [ ] **Step 3: Sprawdź statyczną analizę i budowanie**

```bash
npm run lint
```

Oczekiwane: brak błędów. Jeżeli zgłosi kolejność importów, uruchom `npm run lint -- --fix`.

```bash
npm run build
```

Oczekiwane: `Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add src/constants/motion.ts src/components/providers/Providers.tsx
git commit -m "feat(motion): wspolny slownik ruchu i poszanowanie redukcji animacji"
```

---

### Task 2: Animacja dodania do ulubionych

**Files:**
- Create: `src/components/ui/HeartBurst.tsx`
- Modify: `src/components/ui/HeartButton.tsx`
- Modify: `src/components/ui/FavoriteButton.tsx`

**Interfaces:**
- Consumes: `HEART_SPRING`, `MOTION_DURATION`, `MOTION_EASE` z `src/constants/motion.ts` (Task 1).
- Produces: `HeartBurst` z właściwością `burstKey: number`; oba przyciski same wykrywają moment dodania, więc miejsca ich użycia pozostają nietknięte.

- [ ] **Step 1: Utwórz warstwę efektu**

Utwórz `src/components/ui/HeartBurst.tsx`:

```tsx
import { motion, useReducedMotion } from 'framer-motion';

import { MOTION_EASE } from '@/constants/motion';

const PARTICLE_COUNT = 6;
const PARTICLE_DISTANCE = 18;
const BURST_DURATION = 0.45;

interface HeartBurstProps {
  /** Licznik zwiekszany przy kazdym dodaniu do ulubionych. Zmiana wartosci odtwarza animacje. */
  burstKey: number;
}

/**
 * Warstwa efektu rysowana nad przyciskiem serca.
 * Nie reaguje na wskaznik i nie wplywa na uklad ani obszar klikalny.
 */
const HeartBurst = ({ burstKey }: HeartBurstProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || burstKey === 0) return null;

  return (
    <span
      aria-hidden={true}
      className={'pointer-events-none absolute left-1/2 top-1/2 z-10 h-0 w-0'}
    >
      <motion.span
        key={`ring-${burstKey}`}
        className={'absolute -left-3 -top-3 block h-6 w-6 rounded-full border border-primary'}
        initial={{ scale: 0.2, opacity: 0.8 }}
        animate={{ scale: 1.8, opacity: 0 }}
        transition={{ duration: BURST_DURATION, ease: MOTION_EASE }}
      />
      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => {
        const angle = (index * 2 * Math.PI) / PARTICLE_COUNT;
        const x = Math.cos(angle) * PARTICLE_DISTANCE;
        const y = Math.sin(angle) * PARTICLE_DISTANCE;

        return (
          <motion.span
            key={`particle-${burstKey}-${index}`}
            className={'absolute block h-1 w-1 rounded-full bg-primary'}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{ x, y, scale: 0, opacity: 0 }}
            transition={{ duration: BURST_DURATION, ease: MOTION_EASE }}
          />
        );
      })}
    </span>
  );
};

export default HeartBurst;
```

- [ ] **Step 2: Wepnij efekt w przycisk ikony serca**

Zastąp całą zawartość `src/components/ui/HeartButton.tsx`:

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { HEART_SPRING } from '@/constants/motion';
import { cn } from '@/lib/utils';

import { Button } from './Button';
import HeartBurst from './HeartBurst';
import Icon, { IconSizes } from './Icon';

interface HeartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onToggleFavorite: (event: React.MouseEvent) => void;
  iconSize?: IconSizes;
  className?: string;
  isFilled?: boolean;
}

const HeartButton = (props: HeartButtonProps) => {
  const { onToggleFavorite, iconSize, className, isFilled } = props;
  const { t } = useTranslation();
  const [burstKey, setBurstKey] = useState(0);
  const wasFilledRef = useRef(isFilled);

  useEffect(() => {
    if (isFilled && !wasFilledRef.current) {
      setBurstKey((previous) => previous + 1);
    }
    wasFilledRef.current = isFilled;
  }, [isFilled]);

  return (
    <Button
      variant={'proxy'}
      size={'proxy'}
      className={cn('relative overflow-visible p-1', className)}
      onClick={onToggleFavorite}
      aria-label={isFilled ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
    >
      <HeartBurst burstKey={burstKey} />
      <motion.span
        className={'block'}
        animate={{ scale: isFilled ? [1, 1.35, 1] : [1, 0.9, 1] }}
        transition={HEART_SPRING}
      >
        <Icon
          size={iconSize}
          name={'heart'}
          variant={'gray'}
          className={isFilled ? 'fill-primary text-primary dark:text-primary' : ''}
        />
      </motion.span>
    </Button>
  );
};

export default HeartButton;
```

- [ ] **Step 3: Wepnij efekt w przycisk z tekstem**

Zastąp całą zawartość `src/components/ui/FavoriteButton.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { Button } from './Button';
import HeartBurst from './HeartBurst';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  className?: string;
}

const FavoriteButton = (props: FavoriteButtonProps) => {
  const { isFavorite, onToggleFavorite, className } = props;
  const { t } = useTranslation();
  const [burstKey, setBurstKey] = useState(0);
  const wasFavoriteRef = useRef(isFavorite);

  useEffect(() => {
    if (isFavorite && !wasFavoriteRef.current) {
      setBurstKey((previous) => previous + 1);
    }
    wasFavoriteRef.current = isFavorite;
  }, [isFavorite]);

  return (
    <Button
      className={classNames(
        'relative overflow-visible',
        {
          'text-muted-foreground': !isFavorite
        },
        className
      )}
      iconName={'heart'}
      variant={!isFavorite ? 'secondary' : 'defaultInvert'}
      iconProps={{
        isFilled: isFavorite,
        className: isFavorite ? 'text-red-500 fill-red-500' : 'text-muted-foreground'
      }}
      onClick={onToggleFavorite}
      aria-label={isFavorite ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
    >
      <HeartBurst burstKey={burstKey} />
      {isFavorite ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
    </Button>
  );
};

export default FavoriteButton;
```

- [ ] **Step 4: Upewnij się, że cząstki nie są przycinane**

Sprawdź kontener karty bohatera — `src/components/ui/HeroCard/index.tsx`. Wewnętrzny element z przyciskiem serca ma klasę `relative mt-0.5 flex w-full flex-col gap-1`. Nie ma tam `overflow-hidden`, więc cząstki są widoczne — nie zmieniaj niczego.

Zweryfikuj to samo w `src/components/ui/TitanCard/index.tsx` i `src/components/ui/QuotationCard.tsx`:

```bash
grep -rn "overflow-hidden" src/components/ui/HeroCard src/components/ui/TitanCard src/components/ui/QuotationCard.tsx src/components/ui/QuotationBar
```

Jeżeli którykolwiek przodek przycisku serca ma `overflow-hidden`, zamień tę klasę na `overflow-visible` **wyłącznie w gałęzi zawierającej przycisk**. Jeżeli oznaczałoby to zepsucie zaokrągleń obrazka, zostaw `overflow-hidden` i dopisz do tego miejsca komentarz `// czastki wylaczone celowo — kontener przycina zawartosc`.

- [ ] **Step 5: Sprawdź statyczną analizę i budowanie**

```bash
npm run lint
```

```bash
npm run build
```

Oczekiwane: oba przechodzą bez błędów.

- [ ] **Step 6: Scenariusz ręczny do przekazania użytkownikowi**

Do sprawdzenia w przeglądarce: kliknięcie serca na karcie w galerii bohaterów, na stronie postaci, na karcie cytatu i w pasku cytatu. Oczekiwane: przy dodaniu serce pulsuje, rozchodzi się pierścień i sześć cząstek; przy odjęciu wyłącznie delikatne zmniejszenie. Układ strony nie drga, sąsiednie karty się nie przesuwają.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/HeartBurst.tsx src/components/ui/HeartButton.tsx src/components/ui/FavoriteButton.tsx
git commit -m "feat(favorites): animacja dodania do ulubionych w calej aplikacji"
```

---

# Faza 2 — Poprawki

### Task 3: Naprawa podwójnego naliczania punktu w quizie

**Files:**
- Modify: `src/features/Quiz/index.tsx`
- Modify: `src/features/Quiz/components/Answers.tsx`

**Interfaces:**
- Produces: `Answers` staje się komponentem w pełni sterowanym — przyjmuje `optionOrder: number[]`, `selectedAnswer: number | null`, `isAnswered: boolean` i nie trzyma żadnego własnego stanu.

- [ ] **Step 1: Odtwórz błąd przed poprawką**

Scenariusz do wykonania przez użytkownika na obecnym kodzie: wejdź do quizu, odpowiedz na pytanie, przełącz język, kliknij dowolną odpowiedź ponownie, przejdź dalej aż do wyniku.

Obserwowane obecnie: wynik potrafi przekroczyć liczbę pytań, a pod pytaniem przybywa znaczników historii. Przyczyna: `key` obu komponentów zawiera `i18n.language`, więc zmiana języka odtwarza `Answers` i kasuje jego wewnętrzną blokadę `isAnswered`, a `handleAnswer` w komponencie nadrzędnym nie sprawdza, czy odpowiedź już padła.

- [ ] **Step 2: Przenieś stan odpowiedzi do komponentu nadrzędnego**

W `src/features/Quiz/index.tsx` zastąp fragment od deklaracji stanów do końca `handleRestart` poniższym kodem. Reszta pliku (importy, `translatedQuestions`, `useEffect` z `updateBestScore`, warstwa JSX poza dwoma komponentami) pozostaje bez zmian.

```tsx
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isShowResult, setIsShowResult] = useState(false);
  const [answerHistory, setAnswerHistory] = useState<boolean[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredIndex, setAnsweredIndex] = useState<number | null>(null);
  const [optionOrders, setOptionOrders] = useState<number[][]>([]);
  const { bestScore, updateBestScore } = useBestScore();
```

Zastąp `useEffect` losujący pytania — musi wylosować także kolejność odpowiedzi dla każdego pytania, raz na całą rozgrywkę:

```tsx
  useEffect(() => {
    if (translatedQuestions.length > 0 && shuffledIndices === null) {
      const indices = Array.from({ length: translatedQuestions.length }, (_, i) => i);
      const pickedIndices = shuffle(indices).slice(0, 10);

      setShuffledIndices(pickedIndices);
      setOptionOrders(
        pickedIndices.map((questionIndex) =>
          shuffle(translatedQuestions[questionIndex].options.map((_: string, i: number) => i))
        )
      );
    }
  }, [translatedQuestions, shuffledIndices]);
```

Zastąp trzy funkcje obsługi:

```tsx
  const handleAnswer = (answer: number) => {
    // Druga linia obrony: nawet gdyby komponent odpowiedzi zostal odtworzony,
    // punkt za to samo pytanie nie zostanie naliczony ponownie.
    if (answeredIndex === currentQuestionIndex) return;

    const isCorrect = questions[currentQuestionIndex] && answer === questions[currentQuestionIndex].correctAnswer;

    setSelectedAnswer(answer);
    setAnsweredIndex(currentQuestionIndex);

    if (isCorrect) {
      setScore((previous) => previous + 1);
    }
    setAnswerHistory((previous) => [...previous, isCorrect]);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;

    setSelectedAnswer(null);
    setAnsweredIndex(null);

    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setIsShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsShowResult(false);
    setAnswerHistory([]);
    setSelectedAnswer(null);
    setAnsweredIndex(null);
  };
```

- [ ] **Step 3: Usuń język z kluczy i przekaż stan w dół**

W tym samym pliku zastąp blok JSX z `Question` i `Answers`:

```tsx
          <>
            <Question
              key={`question-${currentQuestionIndex}`}
              question={questions[currentQuestionIndex].question}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              answerHistory={answerHistory}
            />
            <Answers
              key={`answers-${currentQuestionIndex}`}
              options={questions[currentQuestionIndex].options}
              optionOrder={optionOrders[currentQuestionIndex] || []}
              correctAnswer={questions[currentQuestionIndex].correctAnswer}
              selectedAnswer={selectedAnswer}
              isAnswered={answeredIndex === currentQuestionIndex}
              onAnswer={handleAnswer}
              onNext={handleNextQuestion}
            />
          </>
```

Zmienna `i18n` przestaje być używana — zmień deklarację tłumaczeń na `const { t } = useTranslation(['quiz', 'common']);`, inaczej ESLint zgłosi nieużywaną zmienną.

- [ ] **Step 4: Przebuduj komponent odpowiedzi na w pełni sterowany**

Zastąp całą zawartość `src/features/Quiz/components/Answers.tsx`:

```tsx
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/Button';

interface AnswersProps {
  options: string[];
  /** Kolejnosc wariantow wyliczona raz na rozgrywke w komponencie nadrzednym. */
  optionOrder: number[];
  correctAnswer: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswer: (answer: number) => void;
  onNext: () => void;
}

const Answers: React.FC<AnswersProps> = ({
  options,
  optionOrder,
  correctAnswer,
  selectedAnswer,
  isAnswered,
  onAnswer,
  onNext
}) => {
  const { t } = useTranslation('quiz');

  const shuffledOptions = useMemo(() => {
    const order = optionOrder.length === options.length ? optionOrder : options.map((_, index) => index);

    return order.map((shuffledIndex) => ({
      text: options[shuffledIndex],
      originalIndex: shuffledIndex
    }));
  }, [options, optionOrder]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div>
      <motion.div
        className={'grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4'}
        variants={container}
        initial='hidden'
        animate='show'
      >
        {shuffledOptions.map(({ text, originalIndex }) => {
          const isCorrect = originalIndex === correctAnswer;
          const isSelected = selectedAnswer === originalIndex;

          let buttonVariant: 'outline' | 'success' | 'destructive' | 'secondary' | 'default' = 'outline';
          let extraClasses = 'border-2 border-border text-foreground';

          if (isAnswered) {
            if (isCorrect) {
              buttonVariant = 'success';
              extraClasses = 'border-2 border-transparent text-white';
            } else if (isSelected) {
              buttonVariant = 'destructive';
              extraClasses = 'border-2 border-transparent text-white';
            } else {
              extraClasses = 'border-2 border-border text-muted-foreground opacity-50';
            }
          }

          return (
            <motion.div
              key={originalIndex}
              variants={item}
            >
              <Button
                onClick={() => onAnswer(originalIndex)}
                className={`h-auto min-h-12 w-full justify-center px-6 text-lg font-semibold transition-all duration-200 md:min-h-16 ${extraClasses}`}
                variant={buttonVariant}
                disabled={isAnswered}
              >
                {text}
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
      <div className='mt-4 flex min-h-[4rem] items-center justify-center md:mt-8'>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={onNext}
              size='lg'
              className='px-12 font-bold'
            >
              {t('nextQuestion')}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Answers;
```

Klucz elementu zmienił się z `text` na `originalIndex` — dzięki temu zmiana języka przepisuje napisy w istniejących przyciskach zamiast wymieniać je na nowe.

- [ ] **Step 5: Sprawdź statyczną analizę i budowanie**

```bash
npm run lint
```

```bash
npm run build
```

Oczekiwane: oba przechodzą. Jeśli TypeScript zgłosi niejawny typ w `options.map((_: string, i: number) => i)`, zostaw jawne adnotacje — `translatedQuestions` jest tablicą `any` i wnioskowanie tam nie działa.

- [ ] **Step 6: Scenariusz ręczny do przekazania użytkownikowi**

Powtórz scenariusz z kroku 1. Oczekiwane po poprawce: po zmianie języka pytanie i odpowiedzi mają nowe napisy, ale zaznaczenie i oznaczenie poprawnej odpowiedzi pozostają, przyciski nie zmieniają kolejności, wynik się nie zmienia, historia nie przyrasta. Wynik końcowy nigdy nie przekracza liczby pytań.

- [ ] **Step 7: Commit**

```bash
git add src/features/Quiz/index.tsx src/features/Quiz/components/Answers.tsx
git commit -m "fix(quiz): zmiana jezyka nie resetuje odpowiedzi i nie dolicza punktu"
```

---

### Task 4: Pseudonimy w trybie ukrywania spoilerów

**Files:**
- Modify: `src/features/Details/HeroDetails/components/HeroProfileHeader.tsx:63-75`
- Modify: `src/features/Details/TitanDetails/components/TitanProfileHeader.tsx:62-74`
- Modify: `src/features/Comparison/components/ComparisonTable.tsx`

- [ ] **Step 1: Ukryj pseudonimy bohatera**

W `src/features/Details/HeroDetails/components/HeroProfileHeader.tsx` dodaj import:

```tsx
import SpoilerContent from '@/components/ui/SpoilerContent';
```

Zastąp blok odznak z pseudonimami:

```tsx
        {hero.alias.length > 0 && (
          <div className={'mt-2 flex flex-wrap justify-center gap-1.5 px-4'}>
            <SpoilerContent>
              {hero.alias.map((alias) => (
                <Badge
                  key={alias}
                  variant={'secondary'}
                  className={'text-xs'}
                >
                  {alias}
                </Badge>
              ))}
            </SpoilerContent>
          </div>
        )}
```

`SpoilerContent` przy włączonym ukrywaniu zwraca ikonę zasłoniętego oka — spójnie z resztą ukrytych danych w aplikacji.

- [ ] **Step 2: Ukryj inne nazwy tytana**

W `src/features/Details/TitanDetails/components/TitanProfileHeader.tsx` dodaj ten sam import i zastąp blok:

```tsx
        {titan.otherNames.length > 0 && (
          <div className={'mt-2 flex flex-wrap justify-center gap-1.5 px-4'}>
            <SpoilerContent>
              {titan.otherNames.map((name) => (
                <Badge
                  key={name}
                  variant={'secondary'}
                  className={'text-xs'}
                >
                  {name}
                </Badge>
              ))}
            </SpoilerContent>
          </div>
        )}
```

- [ ] **Step 3: Ukryj pseudonimy w tabeli porównania**

W `src/features/Comparison/components/ComparisonTable.tsx` rozszerz definicję konfiguracji atrybutu o flagę spoilera. Znajdź `interface AttributeConfig` i dopisz pole:

```ts
interface AttributeConfig {
  key: AttributeKey;
  labelKey: string;
  getValue: (hero: HeroType, t: (key: string) => string) => string;
  getRawValue: (hero: HeroType) => string | number | null;
  isSpoiler?: boolean;
}
```

W tablicy konfiguracji oznacz wpis `alias`:

```ts
  {
    key: 'alias',
    labelKey: 'data:attributes.alias',
    getValue: (hero) => (hero.alias.length > 0 ? hero.alias.join(', ') : '-'),
    getRawValue: (hero) => (hero.alias.length > 0 ? hero.alias.join(',') : null),
    isSpoiler: true
  }
```

Dodaj import `SpoilerContent` i w miejscu renderowania wartości komórki owiń ją warunkowo. Znajdź wyrażenie renderujące `attribute.getValue(...)` w komórce tabeli i zastąp je:

```tsx
{attribute.isSpoiler ? (
  <SpoilerContent>{attribute.getValue(hero, t)}</SpoilerContent>
) : (
  attribute.getValue(hero, t)
)}
```

Logika podświetlania różnic korzysta z `getRawValue` i pozostaje nietknięta — ukrywanie dotyczy wyłącznie warstwy prezentacji.

- [ ] **Step 4: Sprawdź statyczną analizę i budowanie**

```bash
npm run lint
```

```bash
npm run build
```

- [ ] **Step 5: Scenariusz ręczny do przekazania użytkownikowi**

Włącz tryb ukrywania spoilerów. Oczekiwane: na stronie Erena znikają odznaki „Attack Titan” i „Founding Titan”, na stronie Historii „Christa Lenz” i „Queen Historia”, u tytanów znikają inne nazwy, a w tabeli porównania wiersz pseudonimów pokazuje ikonę zasłoniętego oka. Po wyłączeniu trybu wszystko wraca.

- [ ] **Step 6: Commit**

```bash
git add src/features/Details src/features/Comparison
git commit -m "feat(spoilers): ukrywanie pseudonimow w trybie ukrywania spoilerow"
```

---

### Task 5: Poziomy nagłówków na stronach szczegółów

**Files:**
- Modify: `src/components/ui/Card.tsx`
- Modify: `src/features/Details/HeroDetails/components/HeroMbtiCard.tsx`
- Modify: `src/features/Details/HeroDetails/components/HeroStatsGrid.tsx`
- Modify: `src/features/Details/TitanDetails/components/TitanMbtiCard.tsx`
- Modify: `src/features/Details/TitanDetails/components/TitanStatsGrid.tsx`

**Interfaces:**
- Produces: `CardTitle` przyjmuje opcjonalne `headingLevel: 'h2' | 'h3' | 'h4'`, domyślnie `'h3'` — zachowanie pozostałych ekranów bez zmian.

- [ ] **Step 1: Potwierdź stan wyjściowy**

```bash
grep -rn "<h1" src/features/Details
```

Oczekiwane: dokładnie dwa trafienia — `HeroProfileHeader.tsx` i `TitanProfileHeader.tsx`. Nazwa postaci już jest nagłówkiem najwyższego poziomu i jest jedyna na stronie; wymaganie ze specu jest spełnione. Pozostaje przeskok poziomów.

- [ ] **Step 2: Dodaj konfigurowalny poziom nagłówka karty**

W `src/components/ui/Card.tsx` zastąp definicję `CardTitle`:

```tsx
const CardTitle = ({
  className,
  headingLevel = 'h3',
  ref,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  ref?: React.Ref<HTMLParagraphElement>;
  /** Poziom naglowka. Domyslnie h3; na stronach szczegolow uzywamy h2, aby nie przeskakiwac poziomow po h1. */
  headingLevel?: 'h2' | 'h3' | 'h4';
}) => {
  const HeadingTag = headingLevel;

  return (
    <HeadingTag
      ref={ref}
      className={cn('text-2xl font-medium leading-none tracking-tight', className)}
      {...props}
    />
  );
};
CardTitle.displayName = 'CardTitle';
```

- [ ] **Step 3: Ustaw poziom na stronach szczegółów**

Znajdź użycia `CardTitle` w czterech plikach szczegółów:

```bash
grep -rn "CardTitle" src/features/Details
```

Do każdego znalezionego `<CardTitle` w `HeroMbtiCard.tsx`, `HeroStatsGrid.tsx`, `TitanMbtiCard.tsx` i `TitanStatsGrid.tsx` dodaj atrybut:

```tsx
  headingLevel={'h2'}
```

Jeżeli w którymś z tych plików `CardTitle` nie występuje, pomiń go — nie dodawaj nagłówków tam, gdzie ich nie było.

- [ ] **Step 4: Sprawdź statyczną analizę i budowanie**

```bash
npm run lint
```

```bash
npm run build
```

- [ ] **Step 5: Scenariusz ręczny do przekazania użytkownikowi**

Na stronie dowolnego bohatera sprawdź strukturę nagłówków w narzędziach deweloperskich. Oczekiwane: jeden `h1` z imieniem i nazwiskiem, tytuły kart jako `h2`, brak przeskoku do `h3`. Wygląd bez zmian — poziom nagłówka nie wpływa na style, bo klasy zostają te same.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/Card.tsx src/features/Details
git commit -m "fix(a11y): uporzadkowana hierarchia naglowkow na stronach szczegolow"
```

---

# Faza 3 — Notatki

### Task 6: Stan notatek i zapis w przeglądarce

**Files:**
- Create: `src/store/notesSlice.ts`
- Modify: `src/store/index.ts`
- Modify: `src/constants/enums.ts`
- Modify: `src/constants/types.ts`

**Interfaces:**
- Produces: `NoteEntity`, `NoteType`, `NotesState`; akcje `setAllNotes`, `setNote`, `removeNote`; selektory `selectNotes`, `selectNoteFor`, `selectNotedIds`; `LocalStorageKey.NOTES`, `Param.NOTES`, `NOTE_MAX_LENGTH`. Wykorzystywane w zadaniach 7 i 8.

- [ ] **Step 1: Dodaj typy notatki**

W `src/constants/types.ts`, w sekcji z typami danych (obok `FavoriteType`), dopisz:

```ts
export type NoteEntity = 'hero' | 'titan';

export interface NoteType {
  text: string;
  /** Znacznik czasu ostatniej zmiany w formacie ISO 8601. */
  updatedAt: string;
}

export type NotesByEntity = Record<NoteEntity, Record<number, NoteType>>;
```

W tym samym pliku rozszerz kryteria filtrowania. Do `HeroFilterCriteria` dopisz pole obok `hasOnlyFavorites`:

```ts
  hasOnlyNoted: boolean;
```

To samo dopisz do `TitanFilters`.

- [ ] **Step 2: Dodaj klucze pamięci i adresu**

W `src/constants/enums.ts` do `LocalStorageKey` dopisz:

```ts
  NOTES = 'characterNotes',
```

Do `Param` dopisz:

```ts
  NOTES = 'notes'
```

Pamiętaj o przecinkach w miejscu wstawienia — pola wyliczeń rozdziela przecinek, ale ostatnie pole go nie ma.

- [ ] **Step 3: Utwórz fragment stanu notatek**

Utwórz `src/store/notesSlice.ts`:

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
export const selectNotedIds = (entity: NoteEntity) => (state: RootState) =>
  Object.keys(state.notes[entity]).map(Number);

export const { setAllNotes, setNote, removeNote } = notesSlice.actions;

export default notesSlice;
```

- [ ] **Step 4: Podłącz notatki do sklepu i pamięci przeglądarki**

W `src/store/index.ts` dodaj import:

```ts
import notesSlice, { setAllNotes } from './notesSlice';
```

oraz import typu:

```ts
import { FavoriteType, NotesByEntity } from '@/constants/types';
```

Dopisz pomocniczą funkcję odczytu obok `parseLocalStorageFavorites`:

```ts
const EMPTY_NOTES: NotesByEntity = { hero: {}, titan: {} };

/**
 * Odczyt notatek odporny na uszkodzone dane — niepoprawny JSON lub zly ksztalt
 * daje pusty stan zamiast wyjatku blokujacego uruchomienie aplikacji.
 */
const parseLocalStorageNotes = (): NotesByEntity => {
  const saved = getLocalStorageItem(LocalStorageKey.NOTES);
  if (!saved) return EMPTY_NOTES;

  try {
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== 'object') return EMPTY_NOTES;

    return {
      hero: typeof parsed.hero === 'object' && parsed.hero !== null ? parsed.hero : {},
      titan: typeof parsed.titan === 'object' && parsed.titan !== null ? parsed.titan : {}
    };
  } catch {
    return EMPTY_NOTES;
  }
};
```

Dodaj reduktor do konfiguracji sklepu:

```ts
  reducer: {
    heroes: heroesSlice.reducer,
    titans: titansSlice.reducer,
    quotations: quotationsSlice.reducer,
    spoilerMode: spoilerModeSlice.reducer,
    notes: notesSlice.reducer
  }
```

W bloku hydratacji dopisz:

```ts
  store.dispatch(setAllNotes(parseLocalStorageNotes()));
```

W subskrypcji sklepu, przed przypisaniem `previousState`, dopisz zapis:

```ts
  // Persist notes
  if (currentState.notes !== previousState.notes) {
    setLocalStorageItem(LocalStorageKey.NOTES, JSON.stringify(currentState.notes));
  }
```

- [ ] **Step 5: Sprawdź statyczną analizę i budowanie**

```bash
npm run lint
```

```bash
npm run build
```

Oczekiwane: oba przechodzą. Jeśli TypeScript zgłosi, że `state.notes` nie istnieje w `RootState`, sprawdź, czy reduktor został dopisany do `configureStore` — `RootState` jest z niego wywnioskowany.

- [ ] **Step 6: Commit**

```bash
git add src/store/notesSlice.ts src/store/index.ts src/constants/enums.ts src/constants/types.ts
git commit -m "feat(notes): stan notatek i zapis w pamieci przegladarki"
```

---

### Task 7: Karta notatki na stronach szczegółów

**Files:**
- Create: `src/features/Details/components/CharacterNote/index.tsx`
- Create: `src/features/Details/components/CharacterNote/NoteEditor.tsx`
- Modify: `src/features/Details/HeroDetails/index.tsx`
- Modify: `src/features/Details/TitanDetails/index.tsx`
- Modify: `src/i18n/locales/pl/common.json`, `src/i18n/locales/en/common.json`
- Modify: `src/i18n/locales/pl/notifications.json`, `src/i18n/locales/en/notifications.json`

**Interfaces:**
- Consumes: `setNote`, `removeNote`, `selectNoteFor`, `NOTE_MAX_LENGTH` (Task 6); `fadeInUp`, `MOTION_DURATION` (Task 1).
- Produces: `CharacterNote` z właściwościami `entity: NoteEntity` i `id: number`.

- [ ] **Step 1: Dodaj teksty interfejsu**

Do `src/i18n/locales/pl/common.json` dopisz obiekt najwyższego poziomu:

```json
  "notes": {
    "title": "Moja notatka",
    "empty": "Zapisz własne przemyślenia o tej postaci.",
    "add": "Dodaj notatkę",
    "edit": "Edytuj",
    "remove": "Usuń",
    "done": "Gotowe",
    "placeholder": "Wpisz notatkę…",
    "counter": "{{current}} / {{max}} znaków",
    "saved": "Zapisano",
    "updatedAt": "Ostatnia zmiana: {{date}}",
    "storageHint": "Notatki są przechowywane wyłącznie w tej przeglądarce.",
    "removeConfirmTitle": "Usunąć notatkę?",
    "removeConfirmDescription": "Treści nie da się odzyskać.",
    "cancel": "Anuluj",
    "filterLabel": "Z notatkami"
  }
```

Do `src/i18n/locales/en/common.json` dopisz odpowiednik:

```json
  "notes": {
    "title": "My note",
    "empty": "Save your own thoughts about this character.",
    "add": "Add a note",
    "edit": "Edit",
    "remove": "Delete",
    "done": "Done",
    "placeholder": "Write a note…",
    "counter": "{{current}} / {{max}} characters",
    "saved": "Saved",
    "updatedAt": "Last edited: {{date}}",
    "storageHint": "Notes are stored only in this browser.",
    "removeConfirmTitle": "Delete this note?",
    "removeConfirmDescription": "The text cannot be recovered.",
    "cancel": "Cancel",
    "filterLabel": "With notes"
  }
```

Do `src/i18n/locales/pl/notifications.json`, do istniejącej sekcji `common`, dopisz:

```json
    "noteRemoved": "Notatka usunięta"
```

Do `src/i18n/locales/en/notifications.json`, do sekcji `common`:

```json
    "noteRemoved": "Note deleted"
```

Zachowaj poprawność JSON — pamiętaj o przecinkach między polami i ich braku po ostatnim.

- [ ] **Step 2: Utwórz pole edycji notatki**

Utwórz `src/features/Details/components/CharacterNote/NoteEditor.tsx`:

```tsx
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
        className={'min-h-[7rem] resize-y'}
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
```

- [ ] **Step 3: Utwórz kartę notatki**

Utwórz `src/features/Details/components/CharacterNote/index.tsx`:

```tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

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
  useEffect(() => {
    setDraft(note?.text || '');
    setIsEditing(false);
    setIsSaved(false);
  }, [entity, id]); // eslint-disable-line react-hooks/exhaustive-deps

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
              <p className={'whitespace-pre-wrap break-words text-sm'}>{note.text}</p>
              <p className={'text-xs text-muted-foreground'}>
                {t('common:notes.updatedAt', { date: dayjs(note.updatedAt).format('LL') })}
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
```

Dodaj brakujący import edytora na górze pliku, w bloku importów względnych:

```tsx
import NoteEditor from './NoteEditor';
```

- [ ] **Step 4: Zweryfikuj format daty**

Nazwy komponentów okna dialogowego użyte w imporcie są zgodne z eksportami `src/components/ui/AlertDialog.tsx` — sprawdzone przy pisaniu planu, nie zmieniaj tego pliku.

Format `LL` wymaga wtyczki `localizedFormat`. Sprawdź, czy jest już włączona:

```bash
grep -rn "localizedFormat" src
```

Jeśli nie ma trafień, w `src/features/Details/components/CharacterNote/index.tsx` zamień formatowanie daty na niezależne od wtyczki:

```tsx
dayjs(note.updatedAt).format('DD.MM.YYYY')
```

- [ ] **Step 5: Osadź kartę notatki na stronie bohatera**

W `src/features/Details/HeroDetails/index.tsx` dodaj import:

```tsx
import CharacterNote from '../components/CharacterNote';
```

Pod `<HeroStatsGrid hero={hero} />` dodaj:

```tsx
      <CharacterNote
        entity={'hero'}
        id={hero.id}
      />
```

- [ ] **Step 6: Osadź kartę notatki na stronie tytana**

W `src/features/Details/TitanDetails/index.tsx` dodaj ten sam import i pod `<TitanStatsGrid ... />` dodaj:

```tsx
      <CharacterNote
        entity={'titan'}
        id={titan.id}
      />
```

- [ ] **Step 7: Sprawdź statyczną analizę i budowanie**

```bash
npm run lint
```

```bash
npm run build
```

- [ ] **Step 8: Scenariusz ręczny do przekazania użytkownikowi**

Na stronie bohatera: dodaj notatkę, odczekaj sekundę, odśwież stronę — treść ma zostać. Wejdź na innego bohatera — pole ma być puste. Wróć — treść ma wrócić. Wyczyść tekst do zera znaków i odśwież — notatka ma zniknąć. Wklej bardzo długi tekst — licznik zatrzymuje się na 1000. Usuń notatkę — pojawia się pytanie o potwierdzenie, a po zatwierdzeniu komunikat i pusty stan. Powtórz na stronie tytana.

- [ ] **Step 9: Commit**

```bash
git add src/features/Details src/i18n/locales/pl src/i18n/locales/en
git commit -m "feat(notes): karta notatki na stronach bohatera i tytana"
```

---

### Task 8: Znacznik notatki w galerii i filtr „z notatkami”

**Files:**
- Modify: `src/components/ui/Icon.tsx`
- Modify: `src/components/ui/HeroCard/index.tsx`
- Modify: `src/components/ui/TitanCard/index.tsx`
- Modify: `src/features/Heroes/utils/heroesProcessing.ts`
- Modify: `src/features/Heroes/components/HeroesGallery/index.tsx`
- Modify: `src/features/Heroes/components/HeroesGallery/components/HeroFilterBar.tsx`
- Modify: `src/features/TitansGallery/index.tsx`
- Modify: `src/features/TitansGallery/components/TitanFilterBar.tsx`

**Interfaces:**
- Consumes: `selectNoteFor`, `selectNotedIds` (Task 6), `Param.NOTES`, `hasOnlyNoted` (Task 6), klucz `common:notes.filterLabel` (Task 7).

- [ ] **Step 1: Dodaj ikonę notatki**

W `src/components/ui/Icon.tsx` dopisz `StickyNote` do importu z `lucide-react` (kolejność alfabetyczna — między `Shield` a `Sun`), dopisz `| 'stickyNote'` do typu `IconNames` oraz `stickyNote: StickyNote,` do obiektu `iconsSet`.

- [ ] **Step 2: Pokaż znacznik na karcie bohatera**

W `src/components/ui/HeroCard/index.tsx` dodaj import selektora:

```tsx
import { selectNoteFor } from '@/store/notesSlice';
```

oraz importy względne `Icon` (obok istniejących importów komponentów).

Wewnątrz komponentu, obok istniejącego `useAppSelector`, dodaj:

```tsx
  const note = useAppSelector(selectNoteFor('hero', id));
```

Zastąp wiersz z nazwą postaci, dodając znacznik obok niej:

```tsx
          <div className={'flex items-center gap-1.5 pr-10 text-lg font-medium leading-none'}>
            <span>{`${firstName || ''} ${lastName || ''}`}</span>
            {note && (
              <Icon
                name={'stickyNote'}
                size={'xs'}
                variant={'gray'}
                aria-label={t('common:notes.title')}
              />
            )}
          </div>
```

- [ ] **Step 3: Pokaż znacznik na karcie tytana**

W `src/components/ui/TitanCard/index.tsx` dodaj import selektora:

```tsx
import { selectNoteFor } from '@/store/notesSlice';
```

oraz `import Icon from '../Icon';` w bloku importów względnych.

Obok istniejącego odczytu trybu spoilerów dodaj:

```tsx
  const note = useAppSelector(selectNoteFor('titan', id));
```

Zastąp wiersz z nazwą tytana:

```tsx
          <div className={'flex items-center gap-1.5 pr-10 text-lg font-medium leading-none'}>
            <span>{name || ''}</span>
            {note && (
              <Icon
                name={'stickyNote'}
                size={'xs'}
                variant={'gray'}
                aria-label={t('common:notes.title')}
              />
            )}
          </div>
```

- [ ] **Step 4: Rozszerz filtrowanie bohaterów**

W `src/features/Heroes/utils/heroesProcessing.ts` zmień sygnaturę funkcji `filterHeroes` i dodaj zbiór identyfikatorów z notatką. Zastąp linię deklaracji oraz linię tworzącą `favoriteIdsSet`:

```ts
export const filterHeroes = (
  data: HeroType[],
  filters: HeroFilters,
  favoriteHeroesIds?: FavoriteType[],
  notedHeroesIds?: number[]
) => {
  const lowerCaseSearch = filters.search?.toLowerCase() ?? '';
  const favoriteIdsSet = new Set(favoriteHeroesIds);
  const notedIdsSet = new Set(notedHeroesIds);
```

Pod warunkiem filtru ulubionych dopisz warunek notatek:

```ts
    if (filters.filters.hasOnlyFavorites && !favoriteIdsSet.has(hero.id)) return false;
    if (filters.filters.hasOnlyNoted && !notedIdsSet.has(hero.id)) return false;
```

Nowy argument jest opcjonalny, więc istniejące wywołania nie przestaną się kompilować przed krokiem 5.

- [ ] **Step 5: Przekaż nowy filtr z galerii bohaterów**

W `src/features/Heroes/components/HeroesGallery/index.tsx` obok odczytu ulubionych dodaj:

```tsx
  const notedIds = useAppSelector(selectNotedIds('hero'));
```

oraz odczyt parametru adresu obok `hasOnlyFavorites`:

```tsx
    const hasOnlyNoted = !!searchParams.get(Param.NOTES);
```

Dopisz `hasOnlyNoted: hasOnlyNoted` do obiektu kryteriów przekazywanego do filtrowania i przekaż `notedIds` jako nowy argument funkcji filtrującej. Dodaj `notedIds` i `hasOnlyNoted` do tablicy zależności odpowiedniego `useMemo`.

- [ ] **Step 6: Dodaj przełącznik do paska filtrów bohaterów**

W `src/features/Heroes/components/HeroesGallery/components/HeroFilterBar.tsx` odczytaj parametr obok istniejącego:

```tsx
  const hasOnlyNoted = getBooleanParam(searchParams, Param.NOTES);
```

Dodaj funkcję obsługi obok `handleToggleFavorites`:

```tsx
  const handleToggleNoted = useCallback(
    (isChecked: boolean) => {
      setParam(Param.NOTES, isChecked ? 'true' : null);
    },
    [setParam]
  );
```

W bloku `topBar`, zaraz po grupie z sercem, dodaj bliźniaczą grupę:

```tsx
      <div
        className='flex items-center gap-1.5'
        aria-label={t('common:notes.filterLabel')}
      >
        <Icon
          name={'stickyNote'}
          size={'sm'}
        />
        <Switch
          checked={hasOnlyNoted}
          onCheckedChange={handleToggleNoted}
        />
      </div>
```

Do listy aktywnych filtrów, obok wpisu `favorites`, dodaj:

```tsx
    if (hasOnlyNoted) {
      filters.push({
        key: 'noted',
        label: t('common:notes.filterLabel'),
        onRemove: () => setParam(Param.NOTES, null)
      });
    }
```

Dopisz `hasOnlyNoted` do tablicy zależności `useMemo` budującego listę filtrów oraz `Param.NOTES` do tablicy `allFilterParams`, żeby przycisk czyszczenia usuwał również ten filtr.

- [ ] **Step 7: Rozszerz filtrowanie tytanów**

W `src/features/TitansGallery/utils` znajdź funkcję `filterTitans` i rozszerz ją tak samo jak `filterHeroes`: dodatkowy opcjonalny argument `notedTitansIds?: number[]`, zbiór `notedIdsSet` obok istniejącego zbioru ulubionych oraz warunek:

```ts
    if (filters.hasOnlyNoted && !notedIdsSet.has(titan.id)) return false;
```

W `src/features/TitansGallery/index.tsx` dodaj odczyt identyfikatorów z notatką obok pozostałych selektorów:

```tsx
  const notedTitansIds = useAppSelector(selectNotedIds('titan'));
```

oraz zastąp blok filtrowania:

```tsx
  const filteredTitans = useMemo(() => {
    const search = searchParams.get(Param.SEARCH);
    const sortBy = (searchParams.get(Param.SORT) as TitanSortOption) || DEFAULT_TITAN_SORT;
    const sortDirection = (searchParams.get(Param.SORT_DIRECTION) as SortDirection) || DEFAULT_TITAN_SORT_DIRECTION;
    const allegiance = searchParams.getAll(Param.ALLEGIANCE).map(Number).filter((n) => !isNaN(n));
    const hasOnlyFavorites = getBooleanParam(searchParams, Param.FAVORITES);
    const hasOnlyNoted = getBooleanParam(searchParams, Param.NOTES);

    return filterTitans(
      originalTitans,
      { search, sort: sortBy, sortDirection, allegiance, hasOnlyFavorites, hasOnlyNoted },
      favoriteTitansIds,
      notedTitansIds
    );
  }, [originalTitans, searchParams, favoriteTitansIds, notedTitansIds]);
```

Dodaj import `selectNotedIds` z `@/store/notesSlice`.

- [ ] **Step 8: Dodaj przełącznik do paska filtrów tytanów**

W `src/features/TitansGallery/components/TitanFilterBar.tsx` dodaj odczyt parametru obok istniejącego (linia 44):

```tsx
  const hasOnlyNoted = getBooleanParam(searchParams, Param.NOTES);
```

Dodaj funkcję obsługi obok istniejącej dla ulubionych (okolice linii 69):

```tsx
  const handleToggleNoted = useCallback(
    (isChecked: boolean) => {
      setParam(Param.NOTES, isChecked ? 'true' : null);
    },
    [setParam]
  );
```

Dopisz `Param.NOTES` do tablicy `allFilterParams` (linia 76). Do listy aktywnych filtrów, obok wpisu `favorites` (okolice linii 92), dodaj:

```tsx
    if (hasOnlyNoted) {
      filters.push({
        key: 'noted',
        label: t('common:notes.filterLabel'),
        onRemove: () => setParam(Param.NOTES, null)
      });
    }
```

Dopisz `hasOnlyNoted` do tablicy zależności `useMemo` budującego listę filtrów (linia 125). W pasku narzędzi, obok przełącznika ulubionych, dodaj bliźniaczą grupę:

```tsx
      <div
        className='flex items-center gap-1.5'
        aria-label={t('common:notes.filterLabel')}
      >
        <Icon
          name={'stickyNote'}
          size={'sm'}
        />
        <Switch
          checked={hasOnlyNoted}
          onCheckedChange={handleToggleNoted}
        />
      </div>
```

- [ ] **Step 9: Sprawdź statyczną analizę i budowanie**

```bash
npm run lint
```

```bash
npm run build
```

- [ ] **Step 10: Scenariusz ręczny do przekazania użytkownikowi**

Dodaj notatkę dwóm bohaterom. W galerii: obie karty mają ikonę notatnika. Włącz przełącznik „z notatkami” — lista skraca się do tych dwóch, w adresie pojawia się `notes=true`, a nad listą chip filtru. Skopiuj adres do nowej karty — filtr działa od razu. Wyczyść filtry — chip i parametr znikają. Powtórz dla tytanów.

- [ ] **Step 11: Commit**

```bash
git add src/components/ui src/features/Heroes src/features/TitansGallery
git commit -m "feat(notes): znacznik notatki na kartach i filtr z notatkami"
```

---

# Faza 4 — Języki

### Task 9: Narzędzie kontroli spójności tłumaczeń

**Files:**
- Create: `scripts/check-i18n.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: polecenie `npm run check:i18n` zwracające kod wyjścia 1 przy jakiejkolwiek niezgodności. Wszystkie zadania tłumaczeniowe kończą się jego uruchomieniem.

- [ ] **Step 1: Napisz skrypt kontrolny**

Utwórz `scripts/check-i18n.mjs`:

```js
/**
 * Kontrola spojnosci plikow tlumaczen wzgledem wersji angielskiej.
 *
 * Sprawdza:
 *  - komplet plikow przestrzeni nazw dla kazdego jezyka,
 *  - identyczny zbior sciezek kluczy,
 *  - strukture quizu: liczbe pytan, identyfikatory, indeksy poprawnych odpowiedzi i liczbe wariantow,
 *  - wartosci nieprzetlumaczone, czyli identyczne z angielskimi (ostrzezenie, nie blad).
 *
 * Uruchomienie: npm run check:i18n
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const LOCALES_DIR = join(process.cwd(), 'src', 'i18n', 'locales');
const REFERENCE_LANGUAGE = 'en';

/** Przestrzenie nazw z trescia tlumaczona. */
const TRANSLATED_NAMESPACES = ['common', 'comparison', 'notifications', 'data', 'howToUse', 'quiz', 'charts', 'landing'];
/** Cytaty pozostaja w oryginale — sprawdzamy wylacznie obecnosc pliku i zgodnosc identyfikatorow. */
const COPIED_NAMESPACES = ['quotations'];

const readJson = (language, namespace) => {
  const path = join(LOCALES_DIR, language, `${namespace}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
};

const collectKeyPaths = (value, prefix = '') => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectKeyPaths(item, `${prefix}[${index}]`));
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, nested]) =>
      collectKeyPaths(nested, prefix ? `${prefix}.${key}` : key)
    );
  }
  return [prefix];
};

const errors = [];
const warnings = [];

const languages = readdirSync(LOCALES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((language) => language !== REFERENCE_LANGUAGE);

for (const namespace of [...TRANSLATED_NAMESPACES, ...COPIED_NAMESPACES]) {
  const reference = readJson(REFERENCE_LANGUAGE, namespace);
  if (!reference) {
    errors.push(`Brak pliku wzorcowego: ${REFERENCE_LANGUAGE}/${namespace}.json`);
    continue;
  }

  const referenceKeys = collectKeyPaths(reference);

  for (const language of languages) {
    const target = readJson(language, namespace);

    if (!target) {
      errors.push(`${language}/${namespace}.json — brak pliku`);
      continue;
    }

    const targetKeys = collectKeyPaths(target);
    const missing = referenceKeys.filter((key) => !targetKeys.includes(key));
    const extra = targetKeys.filter((key) => !referenceKeys.includes(key));

    missing.forEach((key) => errors.push(`${language}/${namespace}.json — brakujacy klucz: ${key}`));
    extra.forEach((key) => errors.push(`${language}/${namespace}.json — nadmiarowy klucz: ${key}`));

    if (namespace === 'quiz' && Array.isArray(reference.questions) && Array.isArray(target.questions)) {
      if (reference.questions.length !== target.questions.length) {
        errors.push(
          `${language}/quiz.json — liczba pytan ${target.questions.length}, oczekiwano ${reference.questions.length}`
        );
      }

      reference.questions.forEach((referenceQuestion, index) => {
        const targetQuestion = target.questions[index];
        if (!targetQuestion) return;

        if (targetQuestion.id !== referenceQuestion.id) {
          errors.push(`${language}/quiz.json — pytanie ${index}: identyfikator ${targetQuestion.id}, oczekiwano ${referenceQuestion.id}`);
        }
        if (targetQuestion.correctAnswer !== referenceQuestion.correctAnswer) {
          errors.push(
            `${language}/quiz.json — pytanie ${index}: indeks poprawnej odpowiedzi ${targetQuestion.correctAnswer}, oczekiwano ${referenceQuestion.correctAnswer}`
          );
        }
        if (targetQuestion.options?.length !== referenceQuestion.options?.length) {
          errors.push(`${language}/quiz.json — pytanie ${index}: niezgodna liczba wariantow odpowiedzi`);
        }
      });
    }

    if (TRANSLATED_NAMESPACES.includes(namespace)) {
      const identical = referenceKeys.filter((key) => {
        const read = (source) =>
          key
            .replace(/\[(\d+)\]/g, '.$1')
            .split('.')
            .reduce((accumulator, part) => (accumulator === undefined ? undefined : accumulator[part]), source);
        const referenceValue = read(reference);
        return typeof referenceValue === 'string' && referenceValue.length > 3 && read(target) === referenceValue;
      });

      if (identical.length > 0) {
        warnings.push(`${language}/${namespace}.json — ${identical.length} wartosci identycznych z angielskimi`);
      }
    }
  }
}

warnings.forEach((warning) => console.warn(`OSTRZEZENIE: ${warning}`));

if (errors.length > 0) {
  errors.forEach((error) => console.error(`BLAD: ${error}`));
  console.error(`\nNiepowodzenie: ${errors.length} problemow.`);
  process.exit(1);
}

console.log(`Kontrola tlumaczen zakonczona bez bledow. Sprawdzone jezyki: ${languages.join(', ') || 'brak'}.`);
```

- [ ] **Step 2: Dodaj polecenie do package.json**

W `package.json`, w sekcji `scripts`, dopisz:

```json
    "check:i18n": "node scripts/check-i18n.mjs"
```

- [ ] **Step 3: Uruchom na obecnym stanie**

```bash
npm run check:i18n
```

Oczekiwane: skrypt kończy się powodzeniem i wypisuje `Sprawdzone jezyki: pl.` Jeżeli zgłosi brakujące klucze w `pl`, oznacza to faktyczną rozbieżność między polskim a angielskim — uzupełnij brakujące klucze w plikach `pl`, zanim przejdziesz dalej. To realny błąd, nie usterka narzędzia.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-i18n.mjs package.json
git commit -m "chore(i18n): narzedzie kontroli spojnosci tlumaczen"
```

---

### Task 10: Infrastruktura dociągania języków

**Files:**
- Create: `src/i18n/loadLanguage.ts`
- Modify: `src/constants/enums.ts`
- Modify: `src/i18n/config.ts`
- Modify: `src/components/providers/Providers.tsx`
- Modify: `src/components/ui/LanguageSwitcher.tsx`

**Interfaces:**
- Produces: `loadLanguageResources(language: string): Promise<void>`, `isLazyLanguage(language: string): boolean`, `LANGUAGE_OPTIONS: { id: LanguageShortName; label: LanguageName }[]` — używane przez zadania 11–16.

- [ ] **Step 1: Rozszerz wyliczenia języków**

W `src/constants/enums.ts` zastąp oba wyliczenia językowe:

```ts
export enum LanguageName {
  ENGLISH = 'English',
  POLISH = 'Polski',
  SPANISH = 'Español',
  PORTUGUESE = 'Português (BR)',
  GERMAN = 'Deutsch',
  FRENCH = 'Français',
  ITALIAN = 'Italiano',
  RUSSIAN = 'Русский',
  JAPANESE = '日本語',
  CHINESE = '中文',
  KOREAN = '한국어',
  TURKISH = 'Türkçe'
}

export enum LanguageShortName {
  ENGLISH = 'en',
  POLISH = 'pl',
  SPANISH = 'es',
  PORTUGUESE = 'pt',
  GERMAN = 'de',
  FRENCH = 'fr',
  ITALIAN = 'it',
  RUSSIAN = 'ru',
  JAPANESE = 'ja',
  CHINESE = 'zh',
  KOREAN = 'ko',
  TURKISH = 'tr'
}
```

Portugalski ma kod `pt`, nie `pt-BR` — konfiguracja i18next używa `load: 'languageOnly'`, które i tak obcięłoby kod regionalny, a wtedy zasób nie zostałby odnaleziony. Treść pozostaje brazylijska.

- [ ] **Step 2: Utwórz moduł dociągania**

Utwórz `src/i18n/loadLanguage.ts`:

```ts
import dayjs from 'dayjs';
import i18n from 'i18next';

import { LanguageShortName } from '@/constants/enums';

/** Przestrzenie nazw doladowywane razem z jezykiem. */
const LAZY_NAMESPACES = [
  'common',
  'comparison',
  'notifications',
  'data',
  'howToUse',
  'quiz',
  'quotations',
  'charts',
  'landing'
] as const;

/** Jezyki obecne w glownej paczce — nigdy nie sa doladowywane. */
const BUNDLED_LANGUAGES: string[] = [LanguageShortName.POLISH, LanguageShortName.ENGLISH];

const loadedLanguages = new Set<string>(BUNDLED_LANGUAGES);

/** Kody lokalizacji dayjs rozniace sie od kodow jezykow aplikacji. */
const DAYJS_LOCALES: Record<string, string> = {
  [LanguageShortName.PORTUGUESE]: 'pt-br',
  [LanguageShortName.CHINESE]: 'zh-cn'
};

export const isLazyLanguage = (language: string) => !BUNDLED_LANGUAGES.includes(language);

const loadDayjsLocale = async (language: string) => {
  const locale = DAYJS_LOCALES[language] || language;

  try {
    await import(`dayjs/locale/${locale}.js`);
    dayjs.locale(locale);
  } catch {
    // Brak lokalizacji dayjs nie moze blokowac zmiany jezyka interfejsu.
    dayjs.locale('en');
  }
};

/**
 * Doladowuje komplet zasobow jezyka i rejestruje je w i18next.
 * Wywolanie dla jezyka juz wczytanego jest bezkosztowe.
 */
export const loadLanguageResources = async (language: string) => {
  await loadDayjsLocale(language);

  if (loadedLanguages.has(language)) return;

  const bundles = await Promise.all(
    LAZY_NAMESPACES.map(async (namespace) => {
      const resource = await import(`./locales/${language}/${namespace}.json`);
      return [namespace, resource.default] as const;
    })
  );

  bundles.forEach(([namespace, resource]) => {
    i18n.addResourceBundle(language, namespace, resource, true, true);
  });

  loadedLanguages.add(language);
};
```

Dynamiczny import ze zmienną ścieżką tworzy w webpacku osobną paczkę na każdy plik tłumaczenia — dokładnie o to chodzi. Pliki `pl` i `en` pozostają dodatkowo w głównej paczce, ale ich wersje leniwe nigdy nie zostaną pobrane, bo oba języki są w zbiorze wczytanych od startu.

- [ ] **Step 3: Zbuduj listę języków interfejsu**

W `src/i18n/config.ts`, pod definicją `resources`, dodaj:

```ts
export const LANGUAGE_OPTIONS: { id: LanguageShortName; label: LanguageName }[] = [
  { id: LanguageShortName.POLISH, label: LanguageName.POLISH },
  { id: LanguageShortName.ENGLISH, label: LanguageName.ENGLISH },
  { id: LanguageShortName.SPANISH, label: LanguageName.SPANISH },
  { id: LanguageShortName.PORTUGUESE, label: LanguageName.PORTUGUESE },
  { id: LanguageShortName.GERMAN, label: LanguageName.GERMAN },
  { id: LanguageShortName.FRENCH, label: LanguageName.FRENCH },
  { id: LanguageShortName.ITALIAN, label: LanguageName.ITALIAN },
  { id: LanguageShortName.RUSSIAN, label: LanguageName.RUSSIAN },
  { id: LanguageShortName.TURKISH, label: LanguageName.TURKISH },
  { id: LanguageShortName.JAPANESE, label: LanguageName.JAPANESE },
  { id: LanguageShortName.CHINESE, label: LanguageName.CHINESE },
  { id: LanguageShortName.KOREAN, label: LanguageName.KOREAN }
];
```

Dopisz `LanguageName` do importu z `@/constants/enums`. Wyłącz też gadatliwe logi i18next w wersji produkcyjnej — zmień w `initOptions`:

```ts
  debug: process.env.NODE_ENV === 'development',
```

- [ ] **Step 4: Poczekaj na wykryty język przy starcie**

W `src/components/providers/Providers.tsx` dodaj importy:

```tsx
import { isLazyLanguage, loadLanguageResources } from '@/i18n/loadLanguage';
```

Zastąp fragment `useEffect` odpowiedzialny za gotowość i18next:

```tsx
    const markReady = async () => {
      const detectedLanguage = i18next.resolvedLanguage || i18next.language;

      if (detectedLanguage && isLazyLanguage(detectedLanguage)) {
        try {
          await loadLanguageResources(detectedLanguage);
        } catch {
          // Brak zasobow wykrytego jezyka nie moze zablokowac uruchomienia — zostaje jezyk awaryjny.
        }
      }

      setIsI18nReady(true);
    };

    if (i18next.isInitialized) {
      markReady();
    } else {
      i18next.on('initialized', markReady);
    }
```

Reszta `useEffect` (łatka na Google Translate) pozostaje bez zmian, powyżej tego bloku.

- [ ] **Step 5: Przebuduj przełącznik języka**

Zastąp całą zawartość `src/components/ui/LanguageSwitcher.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { useToast } from '@/components/hooks/useToast';
import { Device, LanguageShortName, LocalStorageKey } from '@/constants/enums';
import { LANGUAGE_OPTIONS } from '@/i18n/config';
import { loadLanguageResources } from '@/i18n/loadLanguage';
import { loadQuotations } from '@/store/quotationsSlice';
import { setLocalStorageItem } from '@/utils/storageHelpers';

import 'dayjs/locale/en';
import 'dayjs/locale/pl';

import useAppDispatch from '../hooks/useAppDispatch';
import { Button } from './Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './DropdownMenu';
import Icon from './Icon';

interface LanguageSwitcherProps {
  variant?: Device;
}

const LanguageSwitcher = (props: LanguageSwitcherProps) => {
  const { variant = Device.MOBILE } = props;
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [loadingLanguage, setLoadingLanguage] = useState<LanguageShortName | null>(null);

  const currentLanguage = (i18n.resolvedLanguage || i18n.language) as LanguageShortName;

  useEffect(() => {
    dispatch(loadQuotations());
  }, [i18n.language, dispatch]);

  useEffect(() => {
    if (typeof document !== 'undefined' && currentLanguage) {
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  const handleChangeLanguage = async (language: LanguageShortName) => {
    if (loadingLanguage || language === currentLanguage) return;

    setLoadingLanguage(language);

    try {
      await loadLanguageResources(language);
      await i18n.changeLanguage(language);
      dayjs.locale(language);
      setLocalStorageItem(LocalStorageKey.LANGUAGE, language);
    } catch {
      toast({ title: t('notifications:error.languageLoadFailed') });
    } finally {
      setLoadingLanguage(null);
    }
  };

  const currentLanguageName =
    LANGUAGE_OPTIONS.find((option) => option.id === currentLanguage)?.label || LANGUAGE_OPTIONS[0].label;

  const buttonProps =
    variant === Device.MOBILE
      ? {
          variant: 'outline' as const,
          className: 'w-min'
        }
      : {
          variant: 'ghost' as const,
          className: 'w-28 text-sm'
        };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={currentLanguageName}
          {...buttonProps}
        >
          {currentLanguageName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='center'
        className={'max-h-72 overflow-y-auto'}
      >
        {LANGUAGE_OPTIONS.map((language) => (
          <DropdownMenuItem
            key={language.id}
            disabled={loadingLanguage !== null}
            onSelect={(event) => {
              event.preventDefault();
              handleChangeLanguage(language.id);
            }}
            className={language.id === currentLanguage ? 'font-semibold' : undefined}
          >
            <span className={'flex-1'}>{language.label}</span>
            {loadingLanguage === language.id && (
              <Icon
                name={'loader2'}
                size={'xs'}
                className={'ml-2 animate-spin'}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
```

Bieżący język jest teraz oznaczony pogrubieniem zamiast usuwany z listy — przy dwunastu pozycjach ukrywanie jednej z nich dezorientuje.

- [ ] **Step 6: Dodaj tekst błędu dociągania**

Do `src/i18n/locales/pl/notifications.json`, do sekcji `error`, dopisz:

```json
    "languageLoadFailed": "Nie udało się wczytać języka. Sprawdź połączenie."
```

Do `src/i18n/locales/en/notifications.json`, do sekcji `error`:

```json
    "languageLoadFailed": "Could not load the language. Check your connection."
```

Jeżeli w `notifications.json` nie ma sekcji `error`, sprawdź jej faktyczną strukturę i umieść klucz zgodnie z istniejącym układem, a w `LanguageSwitcher` popraw ścieżkę klucza.

- [ ] **Step 7: Sprawdź statyczną analizę i budowanie**

```bash
npm run lint
```

```bash
npm run build
```

Oczekiwane: budowanie przechodzi. Ostrzeżenie webpacka o „critical dependency” przy dynamicznym imporcie nie powinno wystąpić, ponieważ ścieżka ma stały przedrostek i rozszerzenie.

- [ ] **Step 8: Scenariusz ręczny do przekazania użytkownikowi**

Na tym etapie lista ma dwanaście pozycji, ale tłumaczenia mają dopiero polski i angielski. Sprawdź: przełączanie polski ↔ angielski działa jak dotąd, lista się przewija, bieżący język jest pogrubiony. Wybór języka bez tłumaczeń pokazuje komunikat o błędzie i pozostawia poprzedni język — to zachowanie przejściowe, zniknie po zadaniach 11–16.

- [ ] **Step 9: Commit**

```bash
git add src/i18n src/constants/enums.ts src/components/providers/Providers.tsx src/components/ui/LanguageSwitcher.tsx
git commit -m "feat(i18n): dwanascie jezykow i dociaganie tlumaczen na zadanie"
```

---

## Procedura wspólna dla zadań 11–16

Każde z zadań tłumaczeniowych obejmuje dwa języki i przebiega identycznie. Dla **każdego** języka:

1. Utwórz katalog `src/i18n/locales/<kod>/`.
2. Przetłumacz z wersji angielskiej osiem plików: `common.json`, `comparison.json`, `notifications.json`, `data.json`, `howToUse.json`, `quiz.json`, `charts.json`, `landing.json`.
3. Skopiuj **bez zmian** `src/i18n/locales/en/quotations.json` do katalogu języka. Cytaty pozostają w oryginale; plik musi istnieć, bo `loadQuotations` czyta zasób dla bieżącego języka i przy jego braku zwraca pustą listę.

**Zasady tłumaczenia — obowiązują w każdym języku:**

- Struktura klucz w klucz identyczna z `en`. Żadnych dodanych, usuniętych ani przemianowanych kluczy.
- W `quiz.json`: tłumacz `question` i `options`, **nie ruszaj** `id` ani `correctAnswer`, zachowaj kolejność wariantów z wersji angielskiej. Przestawienie wariantu unieważnia indeks poprawnej odpowiedzi.
- Zachowaj znaczniki interpolacji w niezmienionej postaci: `{{current}}`, `{{max}}`, `{{date}}`, `{{count}}` i podobne.
- Nazwy własne ze świata Attack on Titan — imiona postaci, nazwy murów, tytanów i formacji — zapisz w formie przyjętej przez fandom danego języka, a nie tłumacz dosłownie.
- Zachowaj rejestr wypowiedzi z wersji angielskiej: interfejs zwięzły, opisy MBTI opisowe.
- Nie zostawiaj wartości identycznych z angielskimi tam, gdzie tłumaczenie istnieje — skrypt kontrolny to zgłosi jako ostrzeżenie.

**Weryfikacja po każdym zadaniu:**

```bash
npm run check:i18n
```

Oczekiwane: brak błędów. Ostrzeżenia o wartościach identycznych z angielskimi przejrzyj pojedynczo — dopuszczalne są wyłącznie tam, gdzie dany język faktycznie używa tego samego słowa.

```bash
npm run build
```

---

### Task 11: Hiszpański i portugalski

**Files:**
- Create: `src/i18n/locales/es/{common,comparison,notifications,data,howToUse,quiz,charts,landing,quotations}.json`
- Create: `src/i18n/locales/pt/{common,comparison,notifications,data,howToUse,quiz,charts,landing,quotations}.json`

- [ ] **Step 1: Przetłumacz hiszpański**

Utwórz dziewięć plików w `src/i18n/locales/es/` zgodnie z procedurą wspólną powyżej. Portugalski i hiszpański dzielą wiele konstrukcji — nie kopiuj między nimi mechanicznie, bo fałszywi przyjaciele w opisach MBTI dają zdania bez sensu.

- [ ] **Step 2: Przetłumacz portugalski**

Utwórz dziewięć plików w `src/i18n/locales/pt/`. Wariant brazylijski: druga osoba przez „você”, słownictwo brazylijskie, nie europejskie.

- [ ] **Step 3: Sprawdź spójność**

```bash
npm run check:i18n
```

Oczekiwane: brak błędów, w podsumowaniu wypisane `es` i `pt`.

- [ ] **Step 4: Sprawdź budowanie**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales/es src/i18n/locales/pt
git commit -m "feat(i18n): tlumaczenie hiszpanskie i portugalskie"
```

---

### Task 12: Niemiecki i francuski

**Files:**
- Create: `src/i18n/locales/de/{common,comparison,notifications,data,howToUse,quiz,charts,landing,quotations}.json`
- Create: `src/i18n/locales/fr/{common,comparison,notifications,data,howToUse,quiz,charts,landing,quotations}.json`

- [ ] **Step 1: Przetłumacz niemiecki**

Utwórz dziewięć plików w `src/i18n/locales/de/` zgodnie z procedurą wspólną. Niemiecki bywa wyraźnie dłuższy od angielskiego — dla etykiet przycisków i filtrów wybieraj krótsze warianty, inaczej rozsadzą układ na wąskich ekranach.

- [ ] **Step 2: Przetłumacz francuski**

Utwórz dziewięć plików w `src/i18n/locales/fr/`. Pamiętaj o spacji nierozdzielającej przed dwukropkiem i znakiem zapytania tam, gdzie występują w tekście.

- [ ] **Step 3: Sprawdź spójność**

```bash
npm run check:i18n
```

- [ ] **Step 4: Sprawdź budowanie**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales/de src/i18n/locales/fr
git commit -m "feat(i18n): tlumaczenie niemieckie i francuskie"
```

---

### Task 13: Włoski i turecki

**Files:**
- Create: `src/i18n/locales/it/{common,comparison,notifications,data,howToUse,quiz,charts,landing,quotations}.json`
- Create: `src/i18n/locales/tr/{common,comparison,notifications,data,howToUse,quiz,charts,landing,quotations}.json`

- [ ] **Step 1: Przetłumacz włoski**

Utwórz dziewięć plików w `src/i18n/locales/it/` zgodnie z procedurą wspólną.

- [ ] **Step 2: Przetłumacz turecki**

Utwórz dziewięć plików w `src/i18n/locales/tr/`. Turecki jest aglutynacyjny — teksty składane z fragmentów brzmią w nim nienaturalnie; tam gdzie angielski dzieli zdanie na klucze, użyj pełnego zdania w tureckim, zachowując te same znaczniki interpolacji.

- [ ] **Step 3: Sprawdź spójność**

```bash
npm run check:i18n
```

- [ ] **Step 4: Sprawdź budowanie**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales/it src/i18n/locales/tr
git commit -m "feat(i18n): tlumaczenie wloskie i tureckie"
```

---

### Task 14: Rosyjski i japoński

**Files:**
- Create: `src/i18n/locales/ru/{common,comparison,notifications,data,howToUse,quiz,charts,landing,quotations}.json`
- Create: `src/i18n/locales/ja/{common,comparison,notifications,data,howToUse,quiz,charts,landing,quotations}.json`

- [ ] **Step 1: Przetłumacz rosyjski**

Utwórz dziewięć plików w `src/i18n/locales/ru/` zgodnie z procedurą wspólną. Rosyjskie napisy bywają dłuższe od angielskich — dla etykiet wybieraj zwięzłe warianty.

- [ ] **Step 2: Przetłumacz japoński**

Utwórz dziewięć plików w `src/i18n/locales/ja/`. Imiona postaci i nazwy tytanów zapisz w formie z japońskiego oryginału (na przykład 進撃の巨人 dla Tytana Atakującego), a nie w transkrypcji z angielskiego.

- [ ] **Step 3: Sprawdź spójność**

```bash
npm run check:i18n
```

- [ ] **Step 4: Sprawdź budowanie**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales/ru src/i18n/locales/ja
git commit -m "feat(i18n): tlumaczenie rosyjskie i japonskie"
```

---

### Task 15: Chiński i koreański

**Files:**
- Create: `src/i18n/locales/zh/{common,comparison,notifications,data,howToUse,quiz,charts,landing,quotations}.json`
- Create: `src/i18n/locales/ko/{common,comparison,notifications,data,howToUse,quiz,charts,landing,quotations}.json`

- [ ] **Step 1: Przetłumacz chiński**

Utwórz dziewięć plików w `src/i18n/locales/zh/` w piśmie uproszczonym, zgodnie z procedurą wspólną.

- [ ] **Step 2: Przetłumacz koreański**

Utwórz dziewięć plików w `src/i18n/locales/ko/`. Zapis w hangulu; nazwy własne w formie przyjętej w koreańskich wydaniach serii.

- [ ] **Step 3: Sprawdź spójność**

```bash
npm run check:i18n
```

- [ ] **Step 4: Sprawdź budowanie**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales/zh src/i18n/locales/ko
git commit -m "feat(i18n): tlumaczenie chinskie i koreanskie"
```

---

### Task 16: Adnotacja o cytatach w oryginale

**Files:**
- Modify: `src/features/Quotations/index.tsx`
- Modify: `src/i18n/locales/*/common.json` (dwanaście plików)

- [ ] **Step 1: Dodaj klucz tekstu**

Do `src/i18n/locales/pl/common.json` dopisz w obiekcie najwyższego poziomu:

```json
  "quotationsOriginalLanguageNotice": "Cytaty prezentujemy w oryginale — po angielsku."
```

Do `src/i18n/locales/en/common.json`:

```json
  "quotationsOriginalLanguageNotice": "Quotes are shown in their original English."
```

Dopisz przetłumaczony odpowiednik do `common.json` w każdym z dziesięciu nowych języków. Bez tego kontrola spójności zgłosi brakujący klucz.

- [ ] **Step 2: Pokaż adnotację poza polskim i angielskim**

W `src/features/Quotations/index.tsx` dodaj import:

```tsx
import { isLazyLanguage } from '@/i18n/loadLanguage';
```

Nad listą cytatów, wewnątrz zwracanego drzewa, dodaj:

```tsx
      {isLazyLanguage(i18n.resolvedLanguage || i18n.language) && (
        <p className={'mb-2 text-xs text-muted-foreground'}>{t('common:quotationsOriginalLanguageNotice')}</p>
      )}
```

Jeżeli komponent nie ma jeszcze dostępu do `i18n`, zmień jego deklarację tłumaczeń na `const { t, i18n } = useTranslation();`.

- [ ] **Step 3: Sprawdź spójność, analizę i budowanie**

```bash
npm run check:i18n
```

```bash
npm run lint
```

```bash
npm run build
```

- [ ] **Step 4: Scenariusz ręczny do przekazania użytkownikowi**

Przełącz kolejno wszystkie dwanaście języków. Oczekiwane: interfejs zmienia język, quiz i opisy są przetłumaczone, cytaty pozostają po angielsku, a poza polskim i angielskim widać nad nimi jednozdaniową adnotację. Konsola przeglądarki nie zgłasza brakujących kluczy. Sprawdź też pierwsze przełączenie przy wolnym łączu — pozycja pokazuje wskaźnik ładowania, a interfejs nie miga pustymi napisami.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales src/features/Quotations/index.tsx
git commit -m "feat(i18n): adnotacja o cytatach prezentowanych w oryginale"
```

---

# Faza 5 — Animacje interfejsu

### Task 17: Zastosowanie słownika ruchu

**Files:**
- Modify: `src/features/Heroes/components/HeroesGallery/components/Content/index.tsx`
- Modify: `src/features/TitansGallery/components/Content/index.tsx`
- Modify: `src/features/Quotations/components/RenderQuotations/index.tsx`
- Modify: `src/features/Heroes/HeroesLayoutClient.tsx`
- Modify: `src/components/filtering/FilterChips.tsx`

**Interfaces:**
- Consumes: `fadeInUp`, `scaleIn`, `pageTransition`, `getStaggerDelay`, `MOTION_DURATION` (Task 1).

- [ ] **Step 1: Animuj wejście kart w galerii bohaterów**

W `src/features/Heroes/components/HeroesGallery/components/Content/index.tsx` dodaj importy:

```tsx
import { motion } from 'framer-motion';

import { fadeInUp, getStaggerDelay } from '@/constants/motion';
```

Zastąp instrukcję zwracającą listę kart:

```tsx
  return paginatedHeroes.map((hero, index) => (
    <motion.div
      key={hero.id}
      variants={fadeInUp}
      initial={'hidden'}
      animate={'show'}
      transition={{ delay: getStaggerDelay(index) }}
    >
      <HeroCard
        data={hero}
        isFavorite={isInFavorites(hero.id, favoriteHeroesIds)}
      />
    </motion.div>
  ));
```

Klucz przenosi się na element opakowujący — `HeroCard` przestaje go potrzebować.

- [ ] **Step 2: Powtórz w galerii tytanów i na liście cytatów**

W `src/features/TitansGallery/components/Content/index.tsx` oraz `src/features/Quotations/components/RenderQuotations/index.tsx` zastosuj identyczny wzorzec: te same dwa importy, mapowanie z indeksem, `motion.div` z `variants={fadeInUp}`, `initial={'hidden'}`, `animate={'show'}` i `transition={{ delay: getStaggerDelay(index) }}`, klucz przeniesiony na element opakowujący. Zachowaj nietknięte gałęzie ładowania i braku wyników — animujemy wyłącznie listę kart.

Kaskada jest ograniczona przez `getStaggerDelay` do dwunastu elementów, więc dolna część długiej listy pojawia się bez opóźnienia.

- [ ] **Step 3: Animuj przejście między zakładkami**

Zakładki galerii, wykresów i porównania dzielą layout `src/features/Heroes/HeroesLayoutClient.tsx`. Dodaj tam importy:

```tsx
import { motion } from 'framer-motion';

import { pageTransition } from '@/constants/motion';
```

W zwracanym drzewie owiń `{children}`:

```tsx
      <motion.div
        key={pathname}
        variants={pageTransition}
        initial={'hidden'}
        animate={'show'}
      >
        {children}
      </motion.div>
```

`pathname` jest już odczytywany w tym komponencie. Klucz oparty na ścieżce sprawia, że zmiana zakładki odtwarza animację wejścia.

- [ ] **Step 4: Animuj pojawianie się chipów aktywnych filtrów**

Panel filtrów korzysta z komponentu `Sheet` opartego na Radix, który ma już własne animacje otwierania — nie dokładaj tam drugiej warstwy ruchu.

Zamiast tego animuj chipy aktywnych filtrów, które pojawiają się i znikają przy każdej zmianie ustawień. W `src/components/filtering/FilterChips.tsx` dodaj importy:

```tsx
import { AnimatePresence, motion } from 'framer-motion';

import { MOTION_DURATION, scaleIn } from '@/constants/motion';
```

Zastąp mapowanie chipów wersją z animacją wejścia i wyjścia:

```tsx
      <AnimatePresence initial={false}>
        {activeFilters.map((filter) => (
          <motion.div
            key={filter.key}
            variants={scaleIn}
            initial={'hidden'}
            animate={'show'}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: MOTION_DURATION.fast } }}
          >
            <Badge
              variant='outline'
              className='gap-1 py-0.5 pl-2 pr-1 text-xs'
            >
              <span>{filter.label}</span>
              <button
                type='button'
                onClick={filter.onRemove}
                className='ml-0.5 rounded-full p-0.5 hover:bg-accent'
                aria-label={`${t('common:action.reset')} ${filter.label}`}
              >
                <X className='h-3 w-3' />
              </button>
            </Badge>
          </motion.div>
        ))}
      </AnimatePresence>
```

Klucz przenosi się z `Badge` na element opakowujący — `AnimatePresence` potrzebuje go na swoim bezpośrednim dziecku.

- [ ] **Step 5: Nie ruszaj powiadomień i okien dialogowych**

Powiadomienia (`Toast`), okna dialogowe i arkusze pochodzą z Radix i mają już animacje realizowane klasami `tailwindcss-animate` opartymi na atrybutach stanu. Dokładanie tam warstwy `framer-motion` dałoby dwie nakładające się animacje. Spec wymienia te miejsca jako animowane — są, tylko innym mechanizmem. Zostawiamy je bez zmian świadomie.

- [ ] **Step 6: Sprawdź statyczną analizę i budowanie**

```bash
npm run lint
```

```bash
npm run build
```

- [ ] **Step 7: Scenariusz ręczny do przekazania użytkownikowi**

Wejdź do galerii bohaterów: karty pojawiają się kaskadowo, a dolna część listy nie każe na siebie czekać. Zmień stronę paginacji — nowa strona wchodzi tak samo. Przełącz zakładkę na wykresy i z powrotem — zawartość wchodzi płynnie. Dodaj i usuń filtr — chip pojawia się i znika z animacją. Następnie włącz w systemie ograniczenie animacji i powtórz wszystko — elementy mają pojawiać się natychmiast, bez ruchu, i pozostać w pełni używalne.

- [ ] **Step 8: Commit**

```bash
git add src/features src/components
git commit -m "feat(motion): spojne animacje galerii, zakladek i chipow filtrow"
```

---

## Weryfikacja końcowa

Po ostatnim zadaniu uruchom komplet i przekaż użytkownikowi listę scenariuszy do sprawdzenia.

```bash
npm run lint
```

```bash
npm run check:i18n
```

```bash
npm run build
```

Scenariusze ręczne — pełna lista ze specu, sekcja 10:

1. Notatka bohatera: dodanie, edycja, usunięcie, przeżycie odświeżenia, znacznik na karcie, filtr, limit znaków.
2. Notatka tytana — jak wyżej.
3. Serce: karta w galerii, strona postaci, karta cytatu, pasek cytatu; brak przycinania cząstek; brak efektu przy odznaczaniu.
4. Tryb ukrywania spoilerów: pseudonimy ukryte na stronie postaci, w tabeli porównania i u tytana.
5. Quiz: odpowiedź, zmiana języka, próba ponownej odpowiedzi — wynik i historia bez zmian.
6. Każdy z dwunastu języków: przełączenie, poprawne dociągnięcie, brak brakujących kluczy w konsoli, obecne cytaty.
7. Systemowa redukcja ruchu włączona: brak animacji, pełna używalność.
8. Telefon pionowo i poziomo: brak przepełnień w najdłuższych językach.
