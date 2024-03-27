import React from 'react';

interface MobileBarWrapperProps {
  children: React.ReactNode;
}

const MobileBarWrapper: React.FC<MobileBarWrapperProps> = ({ children }) => (
  <div
    className={
      'fixed top-12 z-30 flex h-9 w-full items-center justify-between gap-2 border-b bg-background px-[1.375rem] py-1'
    }
  >
    {children}
  </div>
);

export default MobileBarWrapper;
