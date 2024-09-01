'use client';

import { PerfumeVolume } from '@/entities';
import { useModalContext } from '@/features/use-modal';
import { PerfumeModify } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import { MouseEvent } from 'react';

interface ChooseVolumeProps {}

export const ChooseVolume = ({}: ChooseVolumeProps) => {
  const { reject, resolve, payload } = useModalContext<
    PerfumeVolume,
    PerfumeVolume[]
  >();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100dvh',
        width: '100dvw',
        background: 'var(--modal-background)',
        zIndex: 5,
      }}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) reject();
      }}
    >
      <div className={PerfumeModify.choiser}>
        <div className='cross-close' onClick={() => reject()}>
          <Image
            src={'/cross-close.svg'}
            alt='Закрыть'
            height={14}
            width={14}
            className={clsx(PerfumeModify.VMI, PerfumeModify.cross)}
          />
        </div>
        <div className={PerfumeModify.volumeContainer}>
          {payload?.map((volume) => (
            <div
              key={volume.id}
              onClick={() => resolve(volume)}
              className={PerfumeModify.volume}
            >
              {volume.volume} ml
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
