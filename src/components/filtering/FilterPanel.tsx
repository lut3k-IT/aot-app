'use client';

import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';

import { cn } from '@/lib/utils';

interface FilterPanelProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

const FilterPanel = ({ children, open, onOpenChange, className }: FilterPanelProps) => {
  return (
    <Collapsible.Root
      open={open}
      onOpenChange={onOpenChange}
      className={cn('col-span-full', className)}
    >
      <Collapsible.Content className='overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'>
        <div className='mt-2 rounded-lg border bg-card p-3'>
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default FilterPanel;
