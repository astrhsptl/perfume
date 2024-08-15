'use client';

import { ProductCreateData } from '@/entities';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ImageContainer } from '../../payload-container/ui';

interface ImageInputProps {}

export const ImageInput = ({}: ImageInputProps) => {
  const { register, getValues } = useFormContext<ProductCreateData>();
  const [images, setImages] = useState<FileList>(getValues('images') ?? []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <>
      {images?.length > 0 ? (
        <ImageContainer
          data={Array.from(images).map((img) => ({
            link: URL.createObjectURL(img),
          }))}
        />
      ) : (
        <input
          type='file'
          accept='image/*'
          multiple={true}
          {...register('images', {
            onChange: () => setImages(() => getValues('images')),
          })}
        />
      )}
    </>
  );
};
