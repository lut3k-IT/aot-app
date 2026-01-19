export const getLocalStorageItem = (key: string) => {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(key);
  if (value === '') {
    return null;
  }
  return value;
};

export const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window === 'undefined') return;
  if (value == null) {
    value = '';
  }
  window.localStorage.setItem(key, value);
};

export const getSessionStorageItem = (key: string) => {
  if (typeof window === 'undefined') return null;
  const value = window.sessionStorage.getItem(key);
  if (value === '') {
    return null;
  }
  return value;
};

export const setSessionStorageItem = (key: string, value: string) => {
  if (typeof window === 'undefined') return;
  if (value == null) {
    value = '';
  }
  window.sessionStorage.setItem(key, value);
};
