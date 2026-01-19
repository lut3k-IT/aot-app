import { ReadonlyURLSearchParams } from 'next/navigation';

import { DEFAULT_PAGE } from '@/components/ui/Pagination';
import { Param } from '@/constants/enums';

type SearchParamsType = URLSearchParams | ReadonlyURLSearchParams;

export const getNumberParam = (searchParams: SearchParamsType, paramName: Param, defaultValue: number) => {
  const paramValue = searchParams.get(paramName) === null ? defaultValue : Number(searchParams.get(paramName));
  return isNaN(paramValue) ? defaultValue : paramValue;
};

export const getBooleanParam = (searchParams: SearchParamsType, paramName: Param) => {
  const paramValue = searchParams.get(paramName)?.toLowerCase();
  if (paramValue === 'true') return true;
  return false;
};

export const getSafePageNumberFromSearchParam = (searchParams: SearchParamsType) =>
  Number(searchParams.get(Param.PAGE)) > 0 ? Number(searchParams.get(Param.PAGE)) : DEFAULT_PAGE;

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
