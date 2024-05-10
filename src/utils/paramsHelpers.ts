import { URLSearchParams } from 'url';

import { SetURLSearchParams } from 'react-router-dom';

import { DEFAULT_PAGE } from '@/components/ui/Pagination';
import { Param } from '@/constants/enums';

export const getNumberParam = (searchParams: URLSearchParams, paramName: Param, defaultValue: number) => {
  const paramValue = searchParams.get(paramName) === null ? defaultValue : Number(searchParams.get(paramName));
  return isNaN(paramValue) ? defaultValue : paramValue;
};

export const getBooleanParam = (searchParams: URLSearchParams, paramName: Param) => {
  const paramValue = searchParams.get(paramName)?.toLowerCase();
  if (paramValue === 'true') return true;
  return false;
};

export const getSafePageNumberFromSearchParam = (searchParams: URLSearchParams) =>
  Number(searchParams.get(Param.PAGE)) > 0 ? Number(searchParams.get(Param.PAGE)) : DEFAULT_PAGE;

export const deleteSomeSearchParams = (setSearchParams: SetURLSearchParams, paramNames: Param[]) => {
  setSearchParams((searchParams) => {
    paramNames.forEach((paramName) => {
      searchParams.delete(paramName);
    });
    return searchParams;
  });
};

export const setSomeSearchParams = (setSearchParams: SetURLSearchParams, paramNames: Param[], paramValue: string) => {
  setSearchParams((searchParams) => {
    paramNames.forEach((paramName) => {
      searchParams.set(paramName, paramValue);
    });
    return searchParams;
  });
};

const handleNullValue = (searchParams: URLSearchParams, param: Param) => {
  searchParams.delete(param);
};
const handleArrayValue = (searchParams: URLSearchParams, param: Param, value: string[]) => {
  searchParams.delete(param);
  value.forEach((val) => {
    searchParams.append(param, val);
  });
};
const handleSingleValue = (searchParams: URLSearchParams, param: Param, value: string) => {
  searchParams.set(param, value);
};

export type UpdateSearchParamsParameters = [Param, string | string[] | null][];
export const updateSearchParams = (searchParams: URLSearchParams, parameters: UpdateSearchParamsParameters) => {
  parameters.forEach(([param, value]) => {
    if (value === null) {
      handleNullValue(searchParams, param);
    } else if (Array.isArray(value)) {
      handleArrayValue(searchParams, param, value);
    } else {
      handleSingleValue(searchParams, param, value);
    }
  });
};
