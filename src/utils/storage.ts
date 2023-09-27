export const getLocalStorageItem = (key: string) => {
  const value = window.localStorage.getItem(key);
  if (value === '') {
    return null;
  }
  return value;
};

export const setLocalStorageItem = (key: string, value: string) => {
  if (value == null) {
    value = '';
  }
  window.localStorage.setItem(key, value);
};

export const getSessionStorageItem = (key: string) => {
  const value = window.sessionStorage.getItem(key);
  if (value === '') {
    return null;
  }
  return value;
};

export const setSessionStorageItem = (key: string, value: string) => {
  if (value == null) {
    value = '';
  }
  window.sessionStorage.setItem(key, value);
};
