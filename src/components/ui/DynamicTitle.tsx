'use client';

import { useEffect } from 'react';

interface DynamicTitleProps {
  title: string;
}

const DynamicTitle = ({ title }: DynamicTitleProps) => {
  useEffect(() => {
    document.title = `${title} | AOT APP`;
  }, [title]);

  return null;
};

export default DynamicTitle;
