import { CartPerfumeExtended } from '@/entities';
import { perfumeAPI } from '@/features';
import { OrderMobileStyles } from '@/shared';
import { useClipboard } from '@/widgets/order-list-mobile/lib';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';
import { makeClipboardText } from '../lib';

interface OrderCardProps {
  cartPerfume: CartPerfumeExtended;
}

export const OrderCard: React.FC<OrderCardProps> = ({ cartPerfume }) => {
  const { write } = useClipboard();
  const perfume = useQuery({
    queryKey: [cartPerfume.perfume_volume.perfume_id],
    queryFn: async () =>
      await perfumeAPI.fetchByID(cartPerfume.perfume_volume.perfume_id),
  });
  const payload = [
    {
      title: 'Артикул',
      value: cartPerfume.id.toString().split('-')[0],
    },
    {
      title: 'Наименование',
      value: perfume.data?.data.name,
      cn: clsx(OrderMobileStyles.cardTitle),
    },
    {
      title: 'Объем',
      value: `${cartPerfume.perfume_volume.volume} мл`,
    },
    {
      title: 'Количество',
      value: `${cartPerfume.quantity} шт.`,
    },
    {
      title: 'Стоимость',
      value: `${cartPerfume.quantity * cartPerfume.perfume_volume.cost}$`,
    },
  ];

  return (
    <div
      className={clsx(
        OrderMobileStyles.orderCard,
        OrderMobileStyles.orderCardDetail,
      )}
    >
      {payload.map(({ title, value, cn }) => (
        <p
          key={title}
          className={cn}
          onClick={() =>
            write(
              makeClipboardText({
                title: perfume.data?.data.name ?? '',
                cost: (
                  cartPerfume.quantity * cartPerfume.perfume_volume.cost
                ).toString(),
                volume: `${cartPerfume.perfume_volume.volume} шт`,
                id: cartPerfume.id.toString().split('-')[0],
                quantity: cartPerfume.quantity.toString(),
              }),
            )
          }
        >
          {title}: {value}
        </p>
      ))}
    </div>
  );
};
