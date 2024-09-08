import { CartPerfumeExtended } from '@/entities';
import { perfumeAPI } from '@/features';
import { OrderMobileStyles } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';

interface OrderCardProps {
  cartPerfume: CartPerfumeExtended;
}

export const OrderCard: React.FC<OrderCardProps> = ({ cartPerfume }) => {
  const perfume = useQuery({
    queryKey: [cartPerfume.perfume_volume.perfume_id],
    queryFn: async () =>
      await perfumeAPI.fetchByID(cartPerfume.perfume_volume.perfume_id),
  });

  return (
    <div
      className={clsx(
        OrderMobileStyles.orderCard,
        OrderMobileStyles.orderCardDetail,
      )}
    >
      <p>
        <b>Артикул</b>: {cartPerfume.id.toString().split('-')[0]}
      </p>
      <p>
        <b>Наименование</b>: {perfume.data?.data.name}
      </p>
      <p>
        <span>
          <b>Объем</b>: {cartPerfume.perfume_volume.volume} мл{' '}
        </span>
        <span>
          <b>Количество: </b> {cartPerfume.quantity} шт.
        </span>
      </p>
      <p>
        <b>Стоимость:</b>{' '}
        {cartPerfume.quantity * cartPerfume.perfume_volume.cost}$
      </p>
    </div>
  );
};
