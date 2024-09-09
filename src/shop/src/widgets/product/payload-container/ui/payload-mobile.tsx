'use client';

import {
  cartActions,
  Perfume,
  PerfumeType,
  PerfumeVolume,
  StoredPerfume,
} from '@/entities';
import { useAppDispatch } from '@/features';
import { useModal } from '@/features/use-modal';
import { DefaultButton, ProductStyle } from '@/shared';
import { ChooseVolume } from '@/widgets';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface PayloadMobileProps {
  perfume: Perfume;
  perfumeType: PerfumeType;
}

export const PayloadMobile = ({ perfumeType, perfume }: PayloadMobileProps) => {
  const { name: typeName } = perfumeType;
  const { name, description, perfume_volume } = perfume;
  const [currentVolume, setCurrentVolume] = useState<PerfumeVolume>(
    perfume.perfume_volume[0]
  );
  const { child, modalPromise, toggle } = useModal<
    PerfumeVolume,
    PerfumeVolume[]
  >(<ChooseVolume />, perfume_volume);
  const dispatch = useAppDispatch();

  useEffect(() => {
    modalPromise
      ?.catch(() => null)
      .then((v) => {
        if (v) setCurrentVolume(v);
      });
  }, [modalPromise]);

  return (
    <>
      <article className={ProductStyle.mobilePayloadContainer}>
        <p className={clsx(ProductStyle.mobile, ProductStyle.category)}>
          {typeName}
        </p>
        <p className={clsx(ProductStyle.mobile, ProductStyle.name)}>{name}</p>
        <div className={clsx(ProductStyle.mobile, ProductStyle.valueContainer)}>
          <span>
            {currentVolume.cost}${' '}
            <span style={{ fontSize: 12 }}>({currentVolume.volume} ml)</span>
          </span>
          <span
            className={clsx(ProductStyle.mobile, ProductStyle.volumeContainer)}
          >
            <span
              onClick={toggle}
              className={clsx(ProductStyle.mobile, ProductStyle.volume)}
            >
              объем
            </span>
            <DefaultButton
              theme='light'
              style={{
                height: 40,
                fontSize: 12,
              }}
              onClick={() => {
                const storedPerfume: StoredPerfume = {
                  perfume: perfume,
                  quantity: 1,
                  volume: currentVolume,
                };
                toast.success('Товар добавлен в корзину');
                dispatch(cartActions.append(storedPerfume));
              }}
            >
              В корзину
            </DefaultButton>
          </span>
        </div>
        <p style={{ fontSize: 14, marginTop: 20 }}>{description}</p>
      </article>
      {child}
    </>
  );
};
