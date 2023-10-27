import { QuotationType } from '@/constants/types';

export const getRandomQuotation = (quotations: QuotationType[]) => {
  const randomIndex = Math.floor(Math.random() * quotations.length);
  return quotations[randomIndex];
};
