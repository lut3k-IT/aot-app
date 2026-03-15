'use client';

import { useCallback, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Param } from '@/constants/enums';

const SEARCH_DEBOUNCE_MS = 300;

export interface ActiveFilter {
  paramKey: string;
  label: string;
  value: string;
  onRemove: () => void;
}

const useFilterParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildUrl = useCallback(
    (newParams: URLSearchParams) => {
      const paramString = newParams.toString();
      return paramString ? pathname + '?' + paramString : pathname;
    },
    [pathname]
  );

  const setParam = useCallback(
    (param: string, value: string | string[] | null) => {
      const newParams = new URLSearchParams(searchParams.toString());
      // Reset page when changing filters
      newParams.delete(Param.PAGE);

      if (value === null) {
        newParams.delete(param);
      } else if (Array.isArray(value)) {
        newParams.delete(param);
        value.forEach((v) => newParams.append(param, v));
      } else {
        newParams.set(param, value);
      }

      router.replace(buildUrl(newParams), { scroll: false });
    },
    [searchParams, router, buildUrl]
  );

  const setParamDebounced = useCallback(
    (param: string, value: string | null) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        setParam(param, value);
      }, SEARCH_DEBOUNCE_MS);
    },
    [setParam]
  );

  const setParams = useCallback(
    (params: [string, string | string[] | null][]) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete(Param.PAGE);

      params.forEach(([param, value]) => {
        if (value === null) {
          newParams.delete(param);
        } else if (Array.isArray(value)) {
          newParams.delete(param);
          value.forEach((v) => newParams.append(param, v));
        } else {
          newParams.set(param, value);
        }
      });

      router.replace(buildUrl(newParams), { scroll: false });
    },
    [searchParams, router, buildUrl]
  );

  const getParam = useCallback(
    (param: string) => searchParams.get(param),
    [searchParams]
  );

  const getAllParams = useCallback(
    (param: string) => searchParams.getAll(param),
    [searchParams]
  );

  const clearAll = useCallback(
    (paramKeys: string[]) => {
      const newParams = new URLSearchParams(searchParams.toString());
      paramKeys.forEach((key) => newParams.delete(key));
      newParams.delete(Param.PAGE);
      router.replace(buildUrl(newParams), { scroll: false });
    },
    [searchParams, router, buildUrl]
  );

  const toggleArrayParam = useCallback(
    (param: string, value: string) => {
      const current = searchParams.getAll(param);
      const isSelected = current.includes(value);
      const newValues = isSelected ? current.filter((v) => v !== value) : [...current, value];
      setParam(param, newValues.length > 0 ? newValues : null);
    },
    [searchParams, setParam]
  );

  return {
    searchParams,
    setParam,
    setParamDebounced,
    setParams,
    getParam,
    getAllParams,
    clearAll,
    toggleArrayParam
  };
};

export default useFilterParams;
