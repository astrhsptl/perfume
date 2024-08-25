'use client';

import { cartActions, currentCart } from '@/entities';
import { confirmCart, useAppDispatch, useAppSelector } from '@/features';
import { CartStyle, DefaultButton } from '@/shared';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

interface PaymentSectionProps {
  quantity: number;
  cost: number | string;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  cost,
  quantity,
}) => {
  const router = useRouter();
  const cart = useAppSelector(currentCart);
  const dispatch = useAppDispatch();

  return (
    <section className={CartStyle.paymentSection}>
      <div className={CartStyle.paymentInfo}>
        <span>Итого: ({quantity} шт.)</span>
        <span>{cost}$</span>
      </div>
      <DefaultButton
        style={{ maxWidth: '100%' }}
        onClick={() =>
          confirmCart(cart, router).then(() => {
            toast.success('Заказ успешно оформлен');
            toast.success('С вами свяжется администратор');
            dispatch(cartActions.clearCart());
          })
        }
      >
        Оплатить
      </DefaultButton>
    </section>
  );
};
