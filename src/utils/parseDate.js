export const parseDate = dateStamp => {
  const date = dateStamp.slice(0, 10).split('-');
  const newDate = `${date[1]}/${date[2]}/${date[0]}`;
  return newDate;
}