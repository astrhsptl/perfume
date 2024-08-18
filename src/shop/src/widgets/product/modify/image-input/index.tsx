'use client';

import { ProductCreateData } from '@/entities';
import { InputError, montserrat, PerfumeModify } from '@/shared';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ImageContainer } from '../../payload-container/ui';

interface ImageInputProps {}

export const ImageInput = ({}: ImageInputProps) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<ProductCreateData>();
  const [images, setImages] = useState<FileList>(getValues('images') ?? []);

  return (
    <>
      {images?.length > 0 ? (
        <ImageContainer
          images={Array.from(images).map((img) => ({
            link: URL.createObjectURL(img),
          }))}
          description={
            <>
              <textarea
                {...register('description')}
                placeholder='Описание'
                className={clsx(
                  PerfumeModify.descriptionArea,
                  montserrat.className
                )}
              ></textarea>
              <ErrorMessage
                errors={errors}
                name={'description'}
                render={({ message }) => <InputError message={message} />}
              />
            </>
          }
        />
      ) : (
        <>
          <label
            className={clsx(
              PerfumeModify.imageInputLabel,
              montserrat.className
            )}
          >
            <Image
              src={'/image-input.svg'}
              alt='Добавить изображения'
              height={75}
              width={75}
            />
            <h2>Добавить изображения</h2>

            <input
              type='file'
              accept='image/*'
              multiple={true}
              {...register('images', {
                onChange: () => setImages(() => getValues('images')),
                required: {
                  message: 'Выберете изображения',
                  value: true,
                },
              })}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name={'images'}
            render={({ message }) => <InputError message={message} />}
          />
        </>
      )}
    </>
  );
};
