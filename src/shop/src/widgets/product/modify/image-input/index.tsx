'use client';

import { FileInput, ProductCreateData } from '@/entities';
import { InputError, montserrat, PerfumeModify } from '@/shared';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import Image from 'next/image';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ImageContainerCreate } from './ui';

interface ImageInputProps {}

export const ImageInput = ({}: ImageInputProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProductCreateData>();
  const images = useWatch<ProductCreateData>({
    name: 'images',
    control: control,
  }) as FileInput[];
  return (
    <>
      {images?.length > 0 ? (
        <ImageContainerCreate
          images={images}
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
          <Controller
            name='images'
            render={({ field: { onChange } }) => (
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
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    const processedFiles: FileInput[] = files.map((file) => ({
                      file: file,
                      link: URL.createObjectURL(file),
                    }));
                    onChange(processedFiles);
                  }}
                />
              </label>
            )}
          />
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
