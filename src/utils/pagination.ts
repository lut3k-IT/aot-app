export const paginate = <T>(data: T[], page: number, pageSize: number) => {
  if (typeof page !== 'number' || page < 1) {
    throw new Error('Invalid page number');
  }
  if (typeof pageSize !== 'number' || pageSize < 1) {
    throw new Error('Invalid page size');
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const items = data.slice(start, end);
  const totalPages = Math.ceil(data.length / pageSize);

  return { items, totalPages };
};
