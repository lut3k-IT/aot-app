'use client';

import { useTranslation } from 'react-i18next';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'faq.items.free.question',
    answer: 'faq.items.free.answer'
  },
  {
    question: 'faq.items.spoilers.question',
    answer: 'faq.items.spoilers.answer'
  },
  {
    question: 'faq.items.mobile.question',
    answer: 'faq.items.mobile.answer'
  },
  {
    question: 'faq.items.source.question',
    answer: 'faq.items.source.answer'
  }
];

export const FaqSection = () => {
  const { t } = useTranslation('landing');

  return (
    <section className='container mx-auto max-w-4xl px-4 py-24 md:px-6'>
      <div className='mb-12 text-center'>
        <h2 className='mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl'>{t('faq.title')}</h2>
        <p className='text-zinc-400'>{t('faq.description')}</p>
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
              {t(item.question)}
            </AccordionTrigger>
            <AccordionContent className='text-zinc-400'>{t(item.answer)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
