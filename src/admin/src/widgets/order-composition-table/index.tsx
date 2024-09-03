import { CartOrders } from '@/entities';
import { OrderCommonStyles, OrderComplectation } from '@/shared';
import React from 'react';
import { Footer, Header, TableRow } from './ui';

interface OrderCompositionTableProps {
  isLoading: boolean;
  cart?: CartOrders;
}

export const OrderCompositionTable: React.FC<OrderCompositionTableProps> = ({
  cart,
  isLoading,
}) => {
  return (
    <>
      <div className={OrderComplectation.table}>
        <Header />
        <div className={OrderCommonStyles.payload_container}>
          {(isLoading || !cart ? [] : cart.cart_perfume).map((element) => (
            <TableRow key={element.id} cartPerfume={element} />
          ))}
        </div>
        <Footer totalCost={123} />
      </div>
    </>
  );
};
