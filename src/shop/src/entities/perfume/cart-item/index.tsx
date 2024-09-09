'use client';

import { cartActions, StoredPerfume } from '@/entities/store';
import { useAppDispatch } from '@/features';
import { CartStyle } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';

interface CartItemProps {
  cartItem: StoredPerfume;
}

export const CartItem = ({
  cartItem: { perfume, quantity, volume },
}: CartItemProps) => {
  const dispatch = useAppDispatch();
  const image = perfume.file[0].url;

  return (
    <div className={CartStyle.cartItem}>
      <div className={CartStyle.cartImageContainer}>
        <Image src={image} alt='Perfume image' width={100} height={100} />
      </div>
      <div className={CartStyle.payloadContainer}>
        <div className={clsx(CartStyle.cartTextContainer, CartStyle.topLine)}>
          <span>{perfume.name}</span>
          <span
            onClick={() =>
              dispatch(
                cartActions.remove({
                  id: perfume.id,
                  volume: volume.volume,
                })
              )
            }
          >
            <Image
              src={'/delete.svg'}
              alt='Удалить товар'
              width={14.22}
              height={16}
            />
          </span>
        </div>
        <div>{volume.volume} ml</div>
        <div></div>
        <div className={CartStyle.cartTextContainer}>
          <span>{volume.cost} $</span>
          <span className={CartStyle.quantityCounter}>
            <div
              onClick={() =>
                dispatch(
                  cartActions.decrement({
                    id: perfume.id,
                    volume: volume.volume,
                  })
                )
              }
            >
              -
            </div>
            <div>{quantity}</div>
            <div
              onClick={() =>
                dispatch(
                  cartActions.increment({
                    id: perfume.id,
                    volume: volume.volume,
                  })
                )
              }
            >
              +
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};
