import numeral from 'numeral';

export const toCommas = (value: number | string) => {
  const number = numeral(value).format('0.[0]').replace(/\./, ',');
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const toNumberFormat = (value: number | string) => {
  const number = numeral(value).format('0.[0]');
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const filterArrayFromNullish = <T>(array: (T | null | undefined)[]): T[] => {
  return array.filter((value): value is T => value != null);
};

/* ------------------------------ URL & Routes ------------------------------ */

export const getFullURL = () => `${window.location.protocol}//${window.location.host}`;
export const getCurrentRoute = () => location.pathname;
export const getFirstSegmentFromCurrentRoute = () => location.pathname.split('/')[1];

export const loadDynamicImage = async (path: string, imageName: string, extension: string): Promise<string> => {
  const imageModule = await import(`./${path}/${imageName}.${extension}`);
  return imageModule.default;
};
