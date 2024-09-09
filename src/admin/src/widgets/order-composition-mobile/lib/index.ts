type CBProps = {
  id: string;
  title: string;
  volume: string;
  quantity: string;
  cost: string;
};

export const makeClipboardText = ({
  cost,
  id,
  quantity,
  title,
  volume,
}: CBProps) => {
  return `Артикул: ${id}\nНаименование: ${title}\nКоличество: ${quantity}\nОбъем: ${volume}\nСтоимость: ${cost}`;
};
