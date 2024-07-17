import React from 'react';
import { Header } from '../widgets/header';
import { Table } from '../widgets/table';

interface OrdersProps {}

export const OrdersPage: React.FC<OrdersProps> = () => {
  return (
    <div>
      <Header />
      <Table />
    </div>
  );
};
