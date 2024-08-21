'use client';

import { Perfume, PerfumeType, PerfumeVolume } from '@/entities';
import { DefaultButton, ProductStyle, lora } from '@/shared';
import clsx from 'clsx';
import { useState } from 'react';
import { ImageContainer, VolumePoints } from './ui';

interface PayloadContainerProps {
  perfume: Perfume;
  perfumeType: PerfumeType;
}

export const PayloadContainer = ({
  perfume,
  perfumeType,
}: PayloadContainerProps) => {
  const [currentVolume, setCurrentVolume] = useState<PerfumeVolume>(
    perfume.perfume_volume[0]
  );

  return (
    <article className={ProductStyle.productPayloadContainer}>
      <ImageContainer
        images={perfume.file.map(({ url }) => ({ link: url }))}
        description={perfume.description}
      />
      <section className={ProductStyle.productTextContainer}>
        <p
          style={{
            color: 'var(--gray-blur)',
          }}
        >
          {perfumeType.name}
        </p>
        <p className={clsx(ProductStyle.title, lora.className)}>
          {perfume.name}
        </p>
        <p style={{ marginBottom: 20 }}>{currentVolume.cost} $</p>
        <p>Объем, ml</p>
        <VolumePoints
          volumes={perfume.perfume_volume}
          currentVolume={currentVolume}
          setCurrentVolume={setCurrentVolume}
        />
        <DefaultButton>В корзину</DefaultButton>
      </section>
    </article>
  );
};

export { ImageContainerMobile, PayloadMobile } from './ui';
