'use client';

import ErrorComponent from '../../../components/ui/ErrorComponent';

interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <ErrorComponent
      statusText={error?.name || 'Error'}
      message={error?.message || 'An unexpected error occurred'}
    />
  );
};

export default ErrorPage;
