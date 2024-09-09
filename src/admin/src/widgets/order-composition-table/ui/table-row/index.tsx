import { CartPerfumeExtended } from '@/entities';
import { perfumeAPI } from '@/features';
import { OrderComplectation } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface TableRow {
  cartPerfume: CartPerfumeExtended;
}

export const TableRow: React.FC<TableRow> = ({ cartPerfume }) => {
  const perfume = useQuery({
    queryKey: [cartPerfume.perfume_volume.perfume_id],
    queryFn: async () =>
      await perfumeAPI.fetchByID(cartPerfume.perfume_volume.perfume_id),
  });

  return (
    <div className={OrderComplectation.rowContainer}>
      <p>{cartPerfume.id.toString().split('-')[0]}</p>
      <p>{perfume.data?.data.name}</p>
      <p>{cartPerfume.perfume_volume.volume} мл</p>
      <p>{cartPerfume.quantity} шт.</p>
      <p>{cartPerfume.perfume_volume.cost} $</p>
      <p>{cartPerfume.quantity * cartPerfume.perfume_volume.cost} $</p>
    </div>
  );
};
