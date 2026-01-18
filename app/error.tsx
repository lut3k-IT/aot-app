'use client';

import ErrorPage from '@/features/ErrorBoundaries/ErrorPage';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorPage
      error={error}
      reset={reset}
    />
  );
}
