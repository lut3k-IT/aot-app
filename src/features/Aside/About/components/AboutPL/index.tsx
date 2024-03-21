import BuyMeACoffee from '@/components/ui/BuyMeACoffee';
import {
  containerClassMobile,
  headingClass,
  listClass,
  listItemClass,
  paragraphClass,
  subHeadingClass
} from '@/constants/commonStyles';

const AboutPL = () => {
  return (
    <div className={containerClassMobile}>
      <h2 className={headingClass}>Odnośnie AOT APP</h2>
      <p className={paragraphClass}>
        AOT APP to fanowska aplikacja internetowa nawiązująca do popularnego anime „Attack on Titan”. Powstała z myślą o
        widzach, którzy chcą usprawnić oglądanie i pogłębić swoją wiedzę na temat bogatego uniwersum serii.
      </p>

      <h2 className={headingClass}>Pochodzenie</h2>
      <p className={paragraphClass}>
        Aplikacja zrodziła się z potrzeby uporządkowania ogromu informacji o postaciach i innych elementach „Attack on
        Titan”. Celem twórców było stworzenie intuicyjnego narzędzia, które ułatwiłoby nawigację po tym rozbudowanym
        świecie.
      </p>

      <h2 className={headingClass}>Funkcjonalność</h2>
      <ul className={listClass}>
        <li className={listItemClass}>
          <h3 className={subHeadingClass}>Odkrywaj</h3>
          <ul className={listClass}>
            <li className={listItemClass}>
              <strong>Galeria postaci:</strong> Znajdź informacje o dowolnej postaci z łatwością i szybkością.
            </li>
            <li className={listItemClass}>
              <strong>Galeria cytatów:</strong> Przeglądaj cytaty odkrywając na nowo mądrość i humor bohaterów.
            </li>
          </ul>
        </li>
        <li className={listItemClass}>
          <h3 className={subHeadingClass}>Analizuj</h3>
          <ul className={listClass}>
            <li className={listItemClass}>
              <strong>Porównywarka:</strong> Zestaw ze sobą różne postacie i odkryj różnice między nimi.
            </li>
            <li className={listItemClass}>
              <strong>Statystyki (dostępne wkrótce):</strong> Poznaj ukryte zależności i wzorce.
            </li>
          </ul>
        </li>
        <li className={listItemClass}>
          <h3 className={subHeadingClass}>Personalizuj</h3>
          <ul className={listClass}>
            <li className={listItemClass}>
              <strong>Ulubione:</strong> Zapisuj swoje ulubione postacie i cytaty, aby mieć do nich łatwy dostęp.
            </li>
          </ul>
        </li>
        <li className={listItemClass}>
          <h3 className={subHeadingClass}>Testuj</h3>
          <ul className={listClass}>
            <li className={listItemClass}>
              <strong>Quizy (dostępne wkrótce):</strong> Sprawdź, jak dobrze znasz bohaterów, tytanów i historię anime.
            </li>
          </ul>
        </li>
      </ul>

      <h2 className={headingClass}>Informacje dodatkowe</h2>
      <p className={paragraphClass}>
        AOT APP jest projektem fanowskim i nie jest powiązana z oficjalnymi twórcami lub wydawcami „Attack on Titan”.
        Aplikacja jest wciąż w fazie rozwoju, a jej twórcy stale pracują nad nowymi funkcjami i udoskonaleniami.
      </p>

      <h2 className={headingClass}>Wesprzyj nas!</h2>
      <p className={paragraphClass}>
        Aplikacja AOT APP jest całkowicie darmowa i tworzona z pasją przez fanów dla fanów. Jeśli chcesz docenić naszą
        pracę i pomóc w dalszym rozwoju AOT APP, możesz postawić nam wirtualną kawę na platformie Buy Me a Coffee:
      </p>
      <BuyMeACoffee />
    </div>
  );
};

export default AboutPL;
