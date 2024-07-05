export const getMonthName = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('ru-RU', { month: 'long' });
  return formatter.format(date);
};
