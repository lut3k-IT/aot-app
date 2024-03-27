import React from 'react';

import { Card } from '@/components/ui/Card';

interface DesktopBarWrapperProps {
  children: React.ReactNode;
}

const DesktopBarWrapper: React.FC<DesktopBarWrapperProps> = ({ children }) => (
  <Card className={'flex h-10 w-full items-center justify-between gap-2 overflow-hidden px-6'}>{children}</Card>
);

export default DesktopBarWrapper;
