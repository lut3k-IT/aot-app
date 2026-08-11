import React from 'react';

import { Card } from '@/components/ui/Card';

interface DesktopBarWrapperProps {
  children: React.ReactNode;
}

// overflow-visible, aby czastki animacji serca nie byly przycinane przez niski pasek.
// Przewijany tekst cytatu przycina sie sam wlasnym overflow-hidden w BarContent,
// wiec zdjecie przyciecia z paska niczego nie odslania.
const DesktopBarWrapper: React.FC<DesktopBarWrapperProps> = ({ children }) => (
  <Card className={'flex h-10 w-full items-center justify-between gap-2 overflow-visible px-6'}>{children}</Card>
);

export default DesktopBarWrapper;
