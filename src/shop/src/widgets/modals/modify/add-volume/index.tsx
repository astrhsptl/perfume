'use client';

import { VolumeInputType } from '@/entities';
import { FormBaseLayout } from '@/features';
import { useModalContext } from '@/features/use-modal';
import {
  DefaultButton,
  DefaultInput,
  montserrat,
  PerfumeModify,
} from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AddVolumeProps {}

export const AddVolume = ({}: AddVolumeProps) => {
  const { reject, resolve } = useModalContext<VolumeInputType>();
  const methods = useForm<VolumeInputType>();
  const handler: SubmitHandler<VolumeInputType> = (data) => resolve(data);

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
      }}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) reject();
      }}
    >
      <div className={clsx(PerfumeModify.VMI, PerfumeModify.container)}>
        <div className='cross-close' onClick={() => reject()}>
          <Image
            src={'/cross-close.svg'}
            alt='Закрыть'
            height={14}
            width={14}
            className={clsx(PerfumeModify.VMI, PerfumeModify.cross)}
          />
        </div>
        <h2
          className={clsx(
            PerfumeModify.VMI,
            PerfumeModify.title,
            montserrat.className
          )}
        >
          Добавить объем
        </h2>
        <FormBaseLayout
          key={2}
          methods={methods}
          onSub={handler}
          className={clsx(PerfumeModify.VMI, PerfumeModify.form)}
        >
          <DefaultInput
            name='cost'
            placeholder='Цена'
            registerOptions={{
              required: { value: true, message: 'Укажите цену' },
            }}
          />
          <DefaultInput
            name='volume'
            placeholder='Объем'
            registerOptions={{
              required: { value: true, message: 'Укажите объем' },
            }}
          />
          <DefaultInput
            name='quantity'
            placeholder='Кол-во на складе'
            registerOptions={{
              required: {
                value: true,
                message: 'Укажите количество на складе',
              },
            }}
          />
          <DefaultButton type='submit'> Добавить </DefaultButton>
        </FormBaseLayout>
      </div>
    </div>
  );
};
