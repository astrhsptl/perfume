'use client';

import { BrandCreate } from '@/entities';
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

interface AddBrandProps {}

export const AddBrand = ({}: AddBrandProps) => {
  const { reject, resolve } = useModalContext();
  const methods = useForm<BrandCreate>();
  const handler: SubmitHandler<BrandCreate> = (data) => resolve(data);

  return (
    <div
      className={PerfumeModify.addSubEntitiesModel}
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
          Добавить бренд
        </h2>
        <FormBaseLayout
          key={2}
          methods={methods}
          onSub={handler}
          className={clsx(PerfumeModify.VMI, PerfumeModify.form)}
        >
          <DefaultInput
            name='title'
            placeholder='Наименование'
            registerOptions={{
              required: { value: true, message: 'Не может быть пустым' },
            }}
          />
          <DefaultButton type='submit'>Добавить</DefaultButton>
        </FormBaseLayout>
      </div>
    </div>
  );
};
