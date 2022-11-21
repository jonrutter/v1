export const formatId = (str: string) => {
  const id = str
    .replace(/[^\w|\s]/g, '')
    .replace(/\s{2,}/g, ' ')
    .toLowerCase()
    .split(' ')
    .join('-');
  return id;
};
