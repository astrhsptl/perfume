import { HeaderCommon, OrderListTable } from '@/widgets';
import React from 'react';
import { Helmet } from 'react-helmet';

interface OrdersProps {}

export const OrdersPage: React.FC<OrdersProps> = () => {
  return (
    <div>
      <Helmet>
        <title>Зазказы | Perfume shop</title>
      </Helmet>
      <HeaderCommon />
      <OrderListTable />
    </div>
  );
};
