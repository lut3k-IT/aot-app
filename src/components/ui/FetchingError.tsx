interface FetchingErrorProps {
  fetchingError: string;
  message: string;
}

const FetchingError = (props: FetchingErrorProps) => {
  const { fetchingError, message } = props;

  if (!fetchingError) return null;

  return (
    <div className=''>
      {/* wystapi blad */}
      <h2>{message}</h2>
      <p>{fetchingError}</p>
    </div>
  );
};

export default FetchingError;
