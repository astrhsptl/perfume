'use client';

import { ProductCreateData } from '@/entities';
import { PerfumeModify } from '@/shared';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ImageContainer } from '../../payload-container/ui';

interface ImageInputProps {}

export const ImageInput = ({}: ImageInputProps) => {
  const { register, getValues } = useFormContext<ProductCreateData>();
  const [images, setImages] = useState<FileList>(getValues('images') ?? []);

  return (
    <>
      {images?.length > 0 ? (
        <ImageContainer
          images={Array.from(images).map((img) => ({
            link: URL.createObjectURL(img),
          }))}
          description={
            <textarea
              {...register('description')}
              placeholder='Описание'
              className={PerfumeModify.descriptionArea}
            ></textarea>
          }
        />
      ) : (
        <label>
          <input
            type='file'
            accept='image/*'
            multiple={true}
            {...register('images', {
              onChange: () => setImages(() => getValues('images')),
            })}
          />
        </label>
      )}
    </>
  );
};
