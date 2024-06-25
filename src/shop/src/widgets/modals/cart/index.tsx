'use client';

import { currentCartModal, filterModalActions } from '@/entities';
import { useAppDispatch, useAppSelector } from '@/features';
import { CartStyle, montserrat } from '@/shared';
import clsx from 'clsx';

interface CartModalProps {}

export const CartModal = ({}: CartModalProps) => {
  const dispatch = useAppDispatch();
  const { state } = useAppSelector(currentCartModal);
  const { close } = filterModalActions;

  return (
    <aside
      className={clsx(
        CartStyle.asideCartContainer,
        montserrat.className,
        !state && CartStyle.active
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(close());
      }}
    >
      <section className={CartStyle.asideCart}></section>
    </aside>
  );
};
