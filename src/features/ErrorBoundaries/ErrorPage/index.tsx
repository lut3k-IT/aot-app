import { useRouteError } from 'react-router-dom';

import ErrorComponent from '../../../components/ui/ErrorComponent';

const ErrorPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  return (
    <ErrorComponent
      statusText={error.statusText}
      message={error.message}
    />
  );
};

export default ErrorPage;
