import React from 'react';
import { Header } from '../widgets/Orders/header';
import { Table } from '../widgets/Orders/table';

interface OrdersProps {}

export const OrdersPage: React.FC<OrdersProps> = () => {
  return (
    <div>
      <Header />
      <Table />
    </div>
  );
};
