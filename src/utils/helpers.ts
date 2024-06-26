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

export const scrollToTop = (smooth?: boolean) =>
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });

export const preventEventPropagationFix = (ref: HTMLDivElement | null) => {
  if (!ref) return;
  ref.ontouchstart = (e: TouchEvent) => {
    e.preventDefault();
  };
};

/* ------------------------------ URL & Routes ------------------------------ */

export const getFullURL = () => `${window.location.protocol}//${window.location.host}`;
export const getCurrentRoute = () => location.pathname;
export const getFirstSegmentFromCurrentRoute = () => location.pathname.split('/')[1];

export const loadDynamicImage = async (path: string, imageName: string, extension: string): Promise<string> => {
  const imageModule = await import(`./${path}/${imageName}.${extension}`);
  return imageModule.default;
};
