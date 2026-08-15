# Warianty układu powłoki desktopowej

Data: 2026-08-15
Status: zamknięte — wybrany wariant A, rusztowanie wariantów usunięte

## Problem

Zgłoszenie: „layout jest ciasny". Diagnoza z kodu i pomiarów w przeglądarce (okno 1900×1000):

1. **Karta przyklejona do wysokości okna z własnym scrollem.** `PageOverlay` renderował
   `h-[100svh]` → siatkę `grid-rows-[2.5rem_1fr_1.25rem]` → `Card` → `ScrollArea`. Na treść
   zostawało ok. 450 px wysokości, reszta szła na pasek cytatu, zakładki, nagłówek roku,
   pasek filtrów i paginację.
2. **Cztery zagnieżdżone ramki** przed treścią: `max-w-7xl` → `p-page-desktop` → `Card p-4`
   → `main p-2`. Ok. 50 px obramowania z każdej strony.
3. **Siatka `minmax(20rem, 1fr)` w wąskiej kolumnie** dawała dwie kolumny szerokich kart.
   Przy 186 postaciach i 50 na stronę to 25 rzędów przewijania w niskim okienku.
4. **Ograniczenie treści do 1280 px** przy monitorze ~1900 px.

## Podejście

Zamiast wybierać układ w ciemno, budujemy cztery przełączalne warianty widoczne wyłącznie
na dev. Użytkownik porównuje je na prawdziwych danych i wskazuje docelowy; reszta zostaje
usunięta razem z całą maszynerią wariantów.

### Warianty

| Klucz | Nazwa | Opis |
| --- | --- | --- |
| `current` | Obecny | Stan wyjściowy, punkt odniesienia. Bez zmian. |
| `open` | A · Otwarta strona | Bez karty i bez zagnieżdżonego scrolla. Przewija się okno. Sidebar przyklejony na pełną wysokość, szerokość do 1600 px. |
| `aside` | B · Filtry z boku | Otwarta powłoka + filtry na stałe w kolumnie 16 rem obok siatki, zamiast rozwijanego panelu. |
| `list` | C · Widok listy | Otwarta powłoka + przełącznik siatka/lista w górnym pasku, domyślnie gęste wiersze. |

Warianty A, B i C dzielą tę samą otwartą powłokę — B i C różnią się tylko układem samej
galerii postaci. Dzięki temu porównanie dotyczy jednej zmiennej naraz.

## Architektura

- `src/constants/layoutVariants.ts` — enum wariantów, etykiety przełącznika,
  `isOpenShellVariant()` jako jedyny test „czy to nowa powłoka".
- `src/components/providers/LayoutVariantProvider.tsx` — kontekst + zapis w pamięci
  przeglądarki. Odczyt w efekcie po zamontowaniu, żeby nie rozjechać hydratacji.
  `isLayoutLabEnabled` wycina całość poza trybem deweloperskim.
- `src/components/ui/DevLayoutSwitcher.tsx` — pływający wybór wariantu. Celowo poza paletą
  aplikacji, żeby nie mylił się z interfejsem.
- `src/components/ui/PageOverlay/components/OpenDesktopOverlay.tsx` — otwarta powłoka.
- `MovingPanel` i `PageHeading` — tło karty tylko wtedy, gdy treść naprawdę leży na karcie;
  w otwartej powłoce panel przestaje też chować się przy przewijaniu, bo zabierałby
  wyszukiwarkę w trakcie przeglądania długiej listy.
- `GalleryWrapper` — szablon kolumn przez `style`, nie klasę. Arbitralne
  `grid-template-columns` w Tailwindzie nie daje się przewidywalnie nadpisać z zewnątrz.
- `HeroRow` + `HeroRowHeader` — wiersz listy i jego nagłówek na wspólnej siatce kolumn.
- `MbtiDot` w `MbtiFrame.tsx` — kolor grupy MBTI dla widoków bez miejsca na pełną ramkę,
  w jednym pliku z ramką, żeby kolory miały jedno źródło.

## Pomiary (okno 1900×1000, galeria postaci)

| Wariant | Kolumny | Szerokość treści | Widoczne naraz |
| --- | --- | --- | --- |
| Obecny | 2 | 841 px | ok. 4 karty |
| A | 4 | 1256 px | 28 kart |
| B | 3 | 968 px | ok. 21 kart + wszystkie filtry |
| C (lista) | 1 | 1256 px | 17 wierszy |

Wniosek wart odnotowania: lista **nie** jest gęstsza od czterokolumnowej siatki. Jej wartość
to wyrównane kolumny do porównywania wartości, nie liczba postaci na ekranie.

## Weryfikacja

- `npm run lint`, `npx tsc --noEmit`, `npm run check:i18n`, `npm run build` — czysto.
- Przejście przez `/app/heroes`, `/app/titans`, `/app/quotations`, `/app/charts`,
  `/app/comparison` w otwartej powłoce: brak przewijania w poziomie, paginacja i stopka
  na miejscu, konsola bez błędów.
- Tryb ciemny: w otwartej powłoce tło panelu zrównane z tłem strony; w wariancie obecnym
  karta zachowuje swój kolor.
- Przełączanie wariantów działa na żywo, bez przeładowania strony.

## Decyzja

Wybrany **wariant A**. Otwarta powłoka jest jedynym układem desktopowym; `DesktopOverlay`
w `PageOverlay` renderuje ją bezpośrednio, bez żadnego przełącznika.

Usunięte razem z rusztowaniem: `layoutVariants.ts`, `LayoutVariantProvider`,
`DevLayoutSwitcher`, `OpenDesktopOverlay`, `HeroRow`, `MbtiDot`, klucz `LAYOUT_VARIANT`
w pamięci przeglądarki, `ElementsIds.PAGE_FILTERS_ASIDE`, `Param.VIEW`, klucze
`filter.viewGrid` i `filter.viewList` w czterech językach oraz cień `panel-bottom-card`,
który po zniknięciu karty nie miał już czego podkładać.

Dwie rzeczy zostały z tej rundy na stałe:

- `GalleryWrapper` przyjmuje `minColumnWidth`; galeria postaci schodzi do 18 rem, reszta
  zostaje przy domyślnych 20 rem.
- `MovingPanel` chowa się przy przewijaniu tylko na mobile. Wcześniej ten kod na desktopie
  nigdy się nie odpalał, bo okno się nie przewijało; po otwarciu powłoki zacząłby zabierać
  wyszukiwarkę i filtry w trakcie przeglądania galerii.
