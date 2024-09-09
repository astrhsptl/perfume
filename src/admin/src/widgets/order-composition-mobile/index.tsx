import { CartOrders } from '@/entities';
import { OrderMobileStyles } from '@/shared';
import React from 'react';
import { OrderCard } from './ui';

interface OrderCompositionMobileProps {
  isLoading: boolean;
  cart?: CartOrders;
}

export const OrderCompositionMobile: React.FC<OrderCompositionMobileProps> = ({
  isLoading,
  cart,
}) => {
  return (
    <section className={OrderMobileStyles.cardContainer}>
      <h2>Состав заказа</h2>
      <div>
        {(isLoading || !cart ? [] : cart.cart_perfume).map((element) => (
          <OrderCard key={element.id} cartPerfume={element} />
        ))}
      </div>
    </section>
  );
};
