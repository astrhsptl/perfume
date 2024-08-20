'use client';

import { Perfume, PerfumeType, PerfumeVolume } from '@/entities';
import { useModal } from '@/features/use-modal';
import { DefaultButton, ProductStyle } from '@/shared';
import { ChooseVolume } from '@/widgets';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface PayloadMobileProps {
  perfume: Perfume;
  perfumeType: PerfumeType;
}

export const PayloadMobile = ({
  perfumeType: { name: typeName },
  perfume: { name, description, perfume_volume },
}: PayloadMobileProps) => {
  const [volume, setVolume] = useState<PerfumeVolume>(perfume_volume[0]);
  const { child, modalPromise, toggle } = useModal<
    PerfumeVolume,
    PerfumeVolume[]
  >(<ChooseVolume />, perfume_volume);

  useEffect(() => {
    modalPromise
      ?.catch(() => null)
      .then((v) => {
        if (v) setVolume(v);
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
            {volume.cost}${' '}
            <span style={{ fontSize: 12 }}>({volume.volume} ml)</span>
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
