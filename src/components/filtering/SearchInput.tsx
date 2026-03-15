'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({ value, onSearch, placeholder, className }: SearchInputProps) => {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMount = useRef(true);

  // Sync from external value (URL params) on mount/change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        onSearch(newValue.trim());
      }, 300);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setLocalValue('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    onSearch('');
  }, [onSearch]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={cn('relative', className)}>
      <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
      <Input
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className='h-9 pl-9 pr-8 font-medium'
      />
      {localValue && (
        <button
          type='button'
          onClick={handleClear}
          className='absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground'
          aria-label='Clear search'
        >
          <X className='h-3.5 w-3.5' />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
