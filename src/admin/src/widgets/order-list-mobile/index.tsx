import { CartOrders } from '@/entities';
import { PaginatedResult } from '@/shared';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React from 'react';
import { OrderCard } from './ui';

interface OrderListMobileProps {
  payload: UseQueryResult<AxiosResponse<PaginatedResult<CartOrders>>, Error>;
}

export const OrderListMobile: React.FC<OrderListMobileProps> = ({
  payload,
}) => {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        justifyContent: 'center',
        gap: 10,
        margin: '30px auto',
        width: '95%',
      }}
    >
      {(payload.isLoading ? [] : payload.data!.data.data).map((element) => (
        <OrderCard key={element.id} order={element} />
      ))}
    </section>
  );
};
