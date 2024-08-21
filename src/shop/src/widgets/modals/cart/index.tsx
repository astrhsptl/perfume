'use client';

import {
  CartItem,
  cartModalActions,
  currentCart,
  currentCartModal,
} from '@/entities';
import { useAppDispatch, useAppSelector } from '@/features';
import { CartStyle, montserrat } from '@/shared';
import clsx from 'clsx';
import { CartModalHead, PaymentSection } from './ui';

interface CartModalProps {}

export const CartModal = ({}: CartModalProps) => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector(currentCart);
  const { state } = useAppSelector(currentCartModal);
  const { close } = cartModalActions;

  return (
    <aside
      className={clsx(
        CartStyle.asideCartContainer,
        montserrat.className,
        state && CartStyle.active
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(close());
      }}
    >
      <section className={CartStyle.asideCart}>
        <CartModalHead />
        {carts.map((cartItem) => (
          <CartItem key={cartItem.perfume.id} cartItem={cartItem} />
        ))}
        <PaymentSection
          cost={carts.reduce(
            (prev, current) => prev + current.quantity * current.volume.cost,
            0
          )}
          quantity={carts.reduce((prev, current) => prev + current.quantity, 0)}
        />
      </section>
    </aside>
  );
};
