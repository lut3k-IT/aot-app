# Notatki, animacje i wielojęzyczność — projekt

Data: 2026-08-11
Status: zaakceptowany do planowania
Gałąź bazowa: `dev`

## 1. Cel

Siedem zmian w AOT-APP, ujętych w jeden spec i jeden plan wdrożenia:

1. Własne notatki przy postaciach (nowa funkcja).
2. Efektowna animacja dodania do ulubionych, wspólna dla całej aplikacji.
3. Dziesięć nowych języków wraz z tłumaczeniami.
4. Ukrywanie pseudonimów w trybie ukrywania spoilerów.
5. Nazwa bohatera jako `h1` na stronie postaci — potwierdzenie stanu istniejącego i uporządkowanie poziomów nagłówków na tej stronie (szczegóły w sekcji 6).
6. Naprawa błędu quizu: zmiana języka po udzieleniu odpowiedzi pozwala zdobyć dodatkowy punkt.
7. Spójny system animacji `framer-motion` w kluczowych miejscach interfejsu.

## 2. Decyzje projektowe

| Decyzja | Wybór | Uzasadnienie |
| --- | --- | --- |
| Podział pracy | Jeden wspólny spec i plan | Wybór użytkownika. |
| Model notatki | Jedna notatka na postać, edytowalna | Pokrywa realne potrzeby bez UI listy, sortowania i wielu potwierdzeń. |
| Zasięg notatek | Bohaterowie i tytani | Obie galerie mają bliźniacze strony szczegółów; pominięcie tytanów byłoby widoczną dziurą. |
| Charakter animacji serca | Puls + pierścień + cząstki, poniżej 0,5 s | Czytelne przy szybkim klikaniu po galerii, bez rozpraszania. |
| Zakres tłumaczeń | Wszystko oprócz cytatów z anime | Cytaty to wypowiedzi bohaterów znane z oficjalnych tłumaczeń i dubbingu; własna wersja brzmiałaby obco. |
| Lista języków | es, pt, de, fr, it, ru, ja, zh, ko, tr | Największe języki skrzyżowane z realnym fandomem anime; wszystkie pisane od lewej do prawej. Portugalski w wariancie brazylijskim, ale pod kodem `pt` — konfiguracja i18next ma `load: 'languageOnly'`, które i tak obcięłoby `pt-BR` do `pt`. |
| Ładowanie tłumaczeń | Dociąganie języka na żądanie | Przy 12 językach komplet w paczce to setki kilobajtów tekstu pobieranego przez każdego odwiedzającego. |
| Pseudonimy a spoilery | Ukrywane wszystkie | Ręczna klasyfikacja ~40 pozycji to subiektywna ocena, a jedno przeoczenie psuje cały tryb spoilerów. |
| Zasięg animacji | Wspólny słownik ruchu + zastosowanie w kluczowych miejscach | „Wszędzie” dosłownie oznacza 161 komponentów — męczące dla oka i wolne na telefonie. |

## 3. Notatki przy postaciach

### 3.1 Zachowanie

Na stronie szczegółów bohatera i tytana, pod siatką statystyk, pojawia się karta „Moja notatka”.

- **Stan pusty**: jedno zdanie zachęty i przycisk „Dodaj notatkę”.
- **Stan edycji**: pole tekstowe, licznik znaków, komunikat „zapisano” po zapisie, przycisk „Gotowe”.
- **Stan zapisany**: treść notatki, data ostatniej zmiany, przyciski „Edytuj” i „Usuń”.

Zapis następuje automatycznie 600 ms po ostatnim naciśnięciu klawisza oraz przy utracie ogniskowania. Usunięcie wymaga potwierdzenia w oknie dialogowym, ponieważ treści nie da się odzyskać.

Pod polem edycji stała informacja: notatki są przechowywane wyłącznie w tej przeglądarce.

W galerii karta postaci z notatką otrzymuje ikonę notatnika obok nazwy. Na pasku filtrów dochodzi przełącznik „z notatkami”, działający identycznie jak istniejący przełącznik ulubionych — zapisuje się w adresie strony i jest udostępnialny linkiem.

### 3.2 Model danych

Nowy fragment stanu `src/store/notesSlice.ts`:

```ts
type NoteEntity = 'hero' | 'titan';

interface NoteType {
  text: string;
  updatedAt: string; // ISO 8601
}

interface NotesState {
  hero: Record<number, NoteType>;
  titan: Record<number, NoteType>;
}
```

Akcje: `setAllNotes` (hydratacja), `setNote({ entity, id, text })`, `removeNote({ entity, id })`.
Selektory: `selectNotes`, `selectNoteFor(entity, id)`, `selectNotedIds(entity)`.

`setNote` z pustym tekstem po przycięciu białych znaków usuwa wpis, żeby puste notatki nie zaśmiecały pamięci ani nie zapalały znacznika na karcie.

### 3.3 Przechowywanie

- Nowa pozycja w `LocalStorageKey`: `NOTES = 'characterNotes'` — jeden klucz JSON dla obu encji.
- Hydratacja i zapis przez istniejący mechanizm w `src/store/index.ts` (`store.subscribe`), analogicznie do ulubionych.
- Odczyt odporny na uszkodzone dane: nieparsowalny JSON lub zły kształt daje pusty stan zamiast wyjątku blokującego uruchomienie aplikacji.
- Twardy limit 1000 znaków — dłuższy tekst jest przycinany przy wklejaniu, licznik ostrzega od 900 znaków.

### 3.4 Komponenty

- `src/features/Details/components/CharacterNote/index.tsx` — logika stanów i zapisu; przyjmuje `entity` i `id`, wspólny dla obu typów postaci.
- `src/features/Details/components/CharacterNote/NoteEditor.tsx` — pole tekstowe z licznikiem i informacją o zapisie.
- Osadzenie: `HeroDetails` i `TitanDetails`, pod siatką statystyk.
- Znacznik notatki: `HeroCard` i `TitanCard`, ikona obok nazwy, wyłącznie gdy notatka istnieje.

### 3.5 Filtrowanie

- Nowa pozycja w `Param`: `NOTES = 'notes'`.
- `HeroFilterCriteria` oraz `TitanFilters` rozszerzone o `hasOnlyNoted`.
- Logika w `src/features/Heroes/utils/heroesProcessing.ts` oraz w filtrowaniu tytanów (`src/features/TitansGallery`): przy włączonym filtrze przepuszczaj wyłącznie identyfikatory z notatką.
- Przełącznik i chip aktywnego filtru w `HeroFilterBar.tsx` i `TitanFilterBar.tsx`, obok istniejącego przełącznika ulubionych.

### 3.6 Teksty

Nowe klucze w `common.json` (sekcja `notes`: nagłówek, zachęta, przyciski, licznik, informacja o przechowywaniu lokalnym, etykieta filtru) oraz w `notifications.json` (potwierdzenie zapisu i usunięcia). Komplet musi trafić do wszystkich 12 języków.

## 4. Animacja dodania do ulubionych

### 4.1 Zachowanie

Przy dodaniu: serce skaluje się do 1,35 i wraca sprężyście do 1; spod ikony rozchodzi się cienki pierścień skalujący się do 1,8 z zanikiem oraz sześć drobnych cząstek rozbiegających się promieniście na ~18 px. Całość ~450 ms.

Przy usunięciu: samo delikatne zmniejszenie do 0,9 i powrót, bez pierścienia i cząstek.

### 4.2 Realizacja

- Nowy komponent `src/components/ui/HeartBurst.tsx` — warstwa efektu pozycjonowana absolutnie względem przycisku, `pointer-events: none`, `aria-hidden`, nie wpływa na układ ani obszar klikalny.
- Efekt uruchamia licznik zwiększany przy przejściu stanu z „nieulubione” na „ulubione”; posłuży jako `key` wymuszający odtworzenie animacji.
- Wpięcie w oba istniejące warianty: `HeartButton.tsx` (sama ikona) i `FavoriteButton.tsx` (przycisk z tekstem). Dzięki temu efekt obejmuje karty bohaterów i tytanów, strony szczegółów, karty cytatów oraz pasek cytatu — bez powielania kodu.
- Kontenery, które przycinałyby cząstki, dostają `overflow-visible`; jeśli w konkretnym miejscu jest to niemożliwe, cząstki są tam wyłączone, a zostaje sam puls.
- Przy włączonej systemowej redukcji ruchu: wyłącznie zmiana koloru wypełnienia.

## 5. Pseudonimy w trybie ukrywania spoilerów

- `HeroProfileHeader.tsx`: cały blok odznak z pseudonimami owinięty w istniejący `SpoilerContent`, więc przy włączonym ukrywaniu pokazuje symbol zasłoniętego oka, spójnie z resztą ukrytych danych.
- `ComparisonTable.tsx`: wiersz `alias` oznaczony flagą `isSpoiler` w konfiguracji atrybutów i renderowany przez `SpoilerContent`. Flaga zamiast warunku w miejscu renderowania, żeby dołożenie kolejnego wrażliwego atrybutu było jednolinijkowe.
- `TitanProfileHeader.tsx`: pole `otherNames` jest odpowiednikiem pseudonimów u tytanów i podlega tej samej regule.
- Porównanie przez `getRawValue` (podświetlanie różnic) nie zmienia się — ukrywanie dotyczy warstwy prezentacji, nie logiki.

## 6. Nagłówek na stronie postaci

Stan faktyczny: `h1` z imieniem i nazwiskiem już istnieje w `HeroProfileHeader.tsx:55`, analogicznie u tytana, i jest jedynym `h1` na stronie. Wymaganie jest spełnione — zostaje potwierdzenie oraz jedna poprawka porządkowa.

`CardTitle` renderuje `h3`, więc na stronach szczegółów hierarchia przeskakuje z `h1` na `h3`. `CardTitle` otrzymuje opcjonalny parametr poziomu nagłówka (domyślnie `h3`, bez zmian dla pozostałych ekranów), a karty na stronach szczegółów używają `h2`.

Zakres ograniczony do stron szczegółów bohatera i tytana. Porządkowanie nagłówków na pozostałych ekranach pozostaje poza zakresem.

## 7. Błąd quizu

### 7.1 Przyczyna

`src/features/Quiz/index.tsx` nadaje komponentom `Question` i `Answers` klucz zawierający `i18n.language`. Zmiana języka odtwarza `Answers` od zera, kasując jego wewnętrzny stan `isAnswered`. Blokada przed powtórną odpowiedzią żyje wyłącznie w tym stanie, a `handleAnswer` w komponencie nadrzędnym nie sprawdza, czy na bieżące pytanie już odpowiedziano — kolejne kliknięcie ponownie zwiększa wynik i dopisuje wpis do historii.

### 7.2 Poprawka

1. Stan odpowiedzi przenieść do `Quiz/index.tsx`: wybrana odpowiedź oraz indeks pytania, na które udzielono odpowiedzi. Stan przeżywa zmianę języka.
2. Kolejność wariantów odpowiedzi również przenieść do komponentu nadrzędnego i wyliczać raz na pytanie. Bez tego po zmianie języka przyciski zmieniłyby miejsca, a zaznaczenie wskazywałoby inny wariant.
3. Usunąć `i18n.language` z kluczy obu komponentów. Zmiana tekstów i tak wywoła ponowne renderowanie.
4. `handleAnswer` ignoruje wywołanie, gdy na bieżące pytanie już odpowiedziano — druga linia obrony, niezależna od tego, czy komponent potomny zostanie odtworzony.

### 7.3 Oczekiwany efekt

Zmiana języka w trakcie quizu przepisuje treść pytania i odpowiedzi, zachowując wynik, zaznaczoną odpowiedź, oznaczenie poprawnej i historię. Ponowne naliczenie punktu jest niemożliwe.

## 8. Dziesięć nowych języków

### 8.1 Lista

| Kod | Nazwa w interfejsie |
| --- | --- |
| `es` | Español |
| `pt` | Português (BR) |
| `de` | Deutsch |
| `fr` | Français |
| `it` | Italiano |
| `ru` | Русский |
| `ja` | 日本語 |
| `zh` | 中文 (uproszczony) |
| `ko` | 한국어 |
| `tr` | Türkçe |

Razem z istniejącymi `pl` i `en` daje to 12 języków. Nazwy w menu podane w językach oryginalnych.

### 8.2 Zakres tłumaczenia

Tłumaczone: `common`, `comparison`, `notifications`, `data`, `howToUse`, `quiz`, `charts`, `landing`.

`quotations` zawiera wyłącznie cytaty z anime i **nie jest tłumaczony**. Dla każdego nowego języka powstaje kopia wersji angielskiej — jest to wymóg techniczny, ponieważ `loadQuotations` czyta zasób dla bieżącego języka i przy jego braku zwraca pustą listę, co usunęłoby cytaty z aplikacji. W interfejsie sekcji cytatów pojawia się dla tych języków krótka adnotacja, że cytaty prezentowane są w oryginale; wymaga to nowego klucza w `common` i przetłumaczenia go na wszystkie języki.

Pytania quizowe wymagają szczególnej uwagi: tłumaczeniu podlega treść pytania i warianty odpowiedzi, ale indeks poprawnej odpowiedzi musi pozostać niezmieniony, a warianty muszą zachować kolejność z wersji angielskiej.

Nazwy własne ze świata Attack on Titan (imiona postaci, nazwy murów, tytanów, formacji) pozostają w formie rozpoznawalnej dla fandomu danego języka, a nie tłumaczone dosłownie.

### 8.3 Dociąganie języka na żądanie

- Nowy moduł `src/i18n/loadLanguage.ts`: dynamiczny import kompletu plików danego języka, rejestracja przez `addResourceBundle` dla każdej przestrzeni nazw, pamięć podręczna języków już wczytanych.
- `changeLanguage` wywoływane dopiero po pomyślnym wczytaniu, żeby uniknąć błysku brakujących tekstów.
- Polski i angielski pozostają w głównej paczce — obsługują język domyślny i awaryjny bez opóźnienia.
- `dayjs` — odpowiednia lokalizacja doładowywana tym samym mechanizmem.
- Wykrywanie języka przeglądarki: jeśli wykryty język należy do dociąganych, `Providers` czeka na jego wczytanie tak samo, jak dziś czeka na gotowość i18next.
- Niepowodzenie pobrania (brak sieci): powiadomienie o błędzie i pozostanie przy dotychczasowym języku. Aplikacja nie zostaje bez tekstów.
- `document.documentElement.lang` aktualizowany przy każdej zmianie języka.

### 8.4 Przełącznik języka

Dwanaście pozycji nie mieści się w obecnym menu bez zmian: lista otrzymuje ograniczoną wysokość z przewijaniem, a bieżący język jest oznaczony zamiast usuwany z listy. W trakcie dociągania pozycja pokazuje stan ładowania i blokuje powtórne kliknięcia.

### 8.5 Ryzyka

- Objętość: ~730 linii tekstu na język. Największe pliki to `quiz` i `common`.
- Fonty: interfejs korzysta z systemowego kroju, więc pisma japońskie, chińskie i koreańskie wyświetlą się poprawnie bez dodatkowej pracy. Krój ozdobny `Vector` obsługuje wyłącznie logo i nagłówek strony startowej.
- Długość napisów: niemiecki i rosyjski bywają wyraźnie dłuższe od angielskiego — przyciski i etykiety filtrów wymagają sprawdzenia pod kątem przepełnienia, zwłaszcza na wąskich ekranach.

## 9. System animacji

### 9.1 Słownik ruchu

Nowy plik `src/constants/motion.ts` — jedno źródło czasów, krzywych i wariantów:

- Czasy: szybki 150 ms (stany elementów sterujących), podstawowy 250 ms (pojawianie się treści), wolny 400 ms (przejścia całych widoków).
- Warianty: `fadeInUp`, `scaleIn`, `staggerContainer`, `pageTransition`.
- Sprężystość zarezerwowana dla animacji serca.

### 9.2 Miejsca zastosowania

Wejścia kart w galeriach (kaskadowo), przejścia między zakładkami, otwieranie panelu i arkusza filtrów, pojawianie się powiadomień, przycisk powrotu na górę, rozwijanie notatki, karty na stronach szczegółów oraz ujednolicenie istniejących animacji quizu.

Pozostałe komponenty zostają bez zmian.

### 9.3 Zasady

- `MotionConfig` z poszanowaniem systemowego ustawienia redukcji ruchu, ustawiony raz w `Providers`.
- Kaskada ograniczona do 12 elementów; dalsze pojawiają się bez narastającego opóźnienia, żeby dół długiej listy nie czekał sekundy na pojawienie się.
- Animowane wyłącznie `opacity` i `transform` — właściwości nieprzeliczające układu strony.
- Ruch nie może przesuwać elementów pod kursorem ani zmieniać obszarów klikalnych.

## 10. Weryfikacja

Projekt nie ma uruchamiacza testów, więc weryfikacja opiera się na budowaniu, statycznej analizie i liście scenariuszy ręcznych.

Obowiązkowo przed uznaniem pracy za skończoną:

```bash
npm run lint
```

```bash
npm run build
```

Scenariusze ręczne do sprawdzenia:

1. Notatka: dodanie, edycja, usunięcie, przeżycie odświeżenia strony, znacznik na karcie, filtr „z notatkami”, limit znaków.
2. Notatka przy tytanie — jak wyżej.
3. Serce: karta w galerii, strona postaci, cytat, pasek cytatu; brak przycinania cząstek; brak efektu przy odznaczaniu.
4. Tryb ukrywania spoilerów: pseudonimy ukryte na stronie postaci, w porównaniu i u tytana.
5. Quiz: odpowiedź, zmiana języka, próba ponownej odpowiedzi — wynik bez zmian, historia bez zmian.
6. Każdy z 12 języków: przełączenie, poprawne doładowanie, brak brakujących kluczy w konsoli, cytaty obecne.
7. Systemowa redukcja ruchu włączona: brak animacji, aplikacja w pełni używalna.
8. Telefon w orientacji pionowej i poziomej: brak przepełnień w najdłuższych językach.

Uruchomienie podglądu wyłącznie na wyraźną prośbę użytkownika.

## 11. Poza zakresem

- Synchronizacja notatek między urządzeniami i konta użytkowników — aplikacja nie ma zaplecza serwerowego.
- Formatowanie tekstu w notatkach.
- Własne etykiety i tagi przy postaciach.
- Notatki przy cytatach.
- Języki pisane od prawej do lewej, w tym arabski.
- Tłumaczenie cytatów z anime.
- Porządkowanie hierarchii nagłówków poza stronami szczegółów postaci.
- Animowanie wszystkich komponentów aplikacji.
