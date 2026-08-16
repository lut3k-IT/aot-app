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
    <section className='border-t border-zinc-900 py-24 md:py-32'>
      <div className='mx-auto max-w-5xl px-6 md:px-10'>
        <h2 className='text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl'>{t('faq.title')}</h2>
        <p className='mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400'>{t('faq.description')}</p>

        <Accordion
          type='single'
          collapsible
          className='mt-12 max-w-3xl'
        >
          {faqItems.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className='border-zinc-900'
            >
              <AccordionTrigger className='py-5 text-left text-lg font-medium text-white transition-colors hover:text-red-500 hover:no-underline'>
                {t(item.question)}
              </AccordionTrigger>
              <AccordionContent className='max-w-2xl text-base leading-relaxed text-zinc-400'>
                {t(item.answer)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
