import { Header } from '@/widgets/Order/header';
import { Table } from '@/widgets/Order/table';
import React from 'react';

interface OrderProps {}

export const OrderPage: React.FC<OrderProps> = () => {
  return (
    <div>
      <Header />
      <Table />
    </div>
  );
};
