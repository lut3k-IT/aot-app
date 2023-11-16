function useValidateIdFromParam(id: string | undefined) {
  if (!id) throw new Error('URL is incompatible.');
  if (isNaN(Number(id))) throw new Error('URL is incompatible.');

  return +id;
}

export default useValidateIdFromParam;
