'use client';

import ErrorComponent from '../../../components/ui/ErrorComponent';

interface NotFoundRouteProps {
  error?: Error;
}

const NotFoundRoute = ({ error }: NotFoundRouteProps) => {
  return (
    <ErrorComponent
      statusText='404'
      message={error?.message || 'Page not found'}
    />
  );
};

export default NotFoundRoute;
