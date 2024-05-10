import { useRouteError } from 'react-router-dom';

import ErrorComponent from '../../../components/ui/ErrorComponent';

const NotFoundRoute = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  return (
    <ErrorComponent
      statusText='404'
      message={error.message}
    />
  );
};

export default NotFoundRoute;
