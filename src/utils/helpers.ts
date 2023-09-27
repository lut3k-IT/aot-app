import numeral from 'numeral';

export const getNumberAmount = (value: number) => value.toFixed(2);

export const toCommas = (value: number | string) => {
  const number = numeral(value).format('0.[0]').replace(/\./, ',');
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const toNumberFormat = (value: number | string) => {
  const number = numeral(value).format('0.[0]');
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const checkLink =
  (domain: string) =>
  (link: string | undefined): boolean =>
    Boolean(
      link?.match(new RegExp(/[\w#%+.:=@~-]{1,256}\.[\d()a-z]{1,6}\b([\w#%&()+./:=?@~-]*)?/gi)) ||
        link?.includes(domain)
    );

export const checkVideoLink = (videoLink: string) =>
  videoLink?.match(new RegExp(/^(http:\/\/|https:\/\/)(vimeo\.com|youtu\.be|www\.youtube\.com)\/([\w/]+)(\?.*)?$/gim));

export const checkZipCode = (code: string) => /^\d{2}-\d{3}$/.test(code);

export const clearText = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, '');
};

export const getFullURL = () => `${window.location.protocol}//${window.location.host}`;
