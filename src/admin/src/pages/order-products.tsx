import React from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '../widgets/order-list/header';
import { Table } from '../widgets/order-list/table';

interface OrdersProps {}

export const OrdersPage: React.FC<OrdersProps> = () => {
  return (
    <div>
      <Helmet>
        <title>Зазказы | Perfume shop</title>
      </Helmet>
      <Header />
      <Table />
    </div>
  );
};
