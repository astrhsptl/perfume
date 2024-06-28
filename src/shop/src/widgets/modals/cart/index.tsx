'use client';

import { cartModalActions, currentCartModal } from '@/entities';
import { useAppDispatch, useAppSelector } from '@/features';
import { CartStyle, montserrat } from '@/shared';
import clsx from 'clsx';
import { CartModalHead, PaymentSection } from './ui';

interface CartModalProps {}

export const CartModal = ({}: CartModalProps) => {
  const dispatch = useAppDispatch();
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
        <PaymentSection cost={777} quantity={3} />
      </section>
    </aside>
  );
};
