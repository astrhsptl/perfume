'use client';

import { cartModalActions } from '@/entities';
import { useAppDispatch } from '@/features';
import { CartStyle } from '@/shared';
import Image from 'next/image';

interface CartModalHeadProps {}

export const CartModalHead = ({}: CartModalHeadProps) => {
  const dispatch = useAppDispatch();
  const { close } = cartModalActions;

  return (
    <div className={CartStyle.cartHead}>
      <span>Корзина</span>

      <Image
        src={'/cross-close.svg'}
        alt='Закрыть корзину'
        height={24}
        width={24}
        onClick={() => dispatch(close())}
      />
    </div>
  );
};
