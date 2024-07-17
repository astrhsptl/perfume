export const getMonthName = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('ru-RU', { month: 'long' });
  return formatter.format(date);
};

export const formatTimeString = (time: string) => {
  const asNum = Number.parseInt(time);
  return asNum < 10 ? `0${asNum}` : asNum;
};
