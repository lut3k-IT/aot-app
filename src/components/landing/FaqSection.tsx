import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'Czy korzystanie z aplikacji jest darmowe?',
    answer:
      'Tak, AOT APP to projekt fanowski stworzony z pasji. Korzystanie ze wszystkich funkcji jest całkowicie darmowe i nie wymaga żadnych opłat.'
  },
  {
    question: 'Czy w aplikacji znajdują się spoilery?',
    answer: 'Staramy się oznaczać treści, które mogą być spoilerami dla osób, które nie dokończyły serii.'
  },
  {
    question: 'Czy aplikacja działa na urządzeniach mobilnych?',
    answer:
      'Tak, aplikacja została zaprojektowana jako PWA (Progressive Web App). Działa świetnie na telefonach i tabletach, a nawet możesz ją zainstalować na ekranie głównym.'
  },
  {
    question: 'Skąd pochodzą informacje w bazie?',
    answer:
      'Dane gromadzone są na podstawie oficjalnych databooków, mangi oraz anime Attack on Titan (Shingeki no Kyojin).'
  }
];

export const FaqSection = () => {
  return (
    <section className='container mx-auto max-w-4xl px-4 py-24 md:px-6'>
      <div className='mb-12 text-center'>
        <h2 className='mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl'>Najczęściej zadawane pytania</h2>
        <p className='text-zinc-400'>Znajdź odpowiedzi na nurtujące Cię pytania dotyczące projektu.</p>
      </div>
      <Accordion
        type='single'
        collapsible
        className='w-full'
      >
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className='border-zinc-800'
          >
            <AccordionTrigger className='text-lg font-medium text-white hover:text-red-500 hover:no-underline'>
              {item.question}
            </AccordionTrigger>
            <AccordionContent className='text-zinc-400'>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
