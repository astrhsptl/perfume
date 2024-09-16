'use client';

import { FileInput, ProductCreateData } from '@/entities';
import { ProductStyle } from '@/shared';
import Image from 'next/image';
import { ReactNode, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ImageContainerCreateProps {
  images?: FileInput[];
  description?: ReactNode;
  remove?(index: number): void;
}

export const ImageContainerCreate = ({
  images = [],
  description,
}: ImageContainerCreateProps) => {
  const { control } = useFormContext<ProductCreateData>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = useMemo(
    () => images[currentImageIndex],
    [currentImageIndex]
  );

  console.log(images, currentImageIndex);

  return (
    <section className={ProductStyle.imageContainer}>
      <div className={ProductStyle.secondImageContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={ProductStyle.imageItem}
            style={{
              position: 'relative',
            }}
            onClick={() => {
              setCurrentImageIndex(() => index);
            }}
          >
            <Controller<ProductCreateData>
              name='images'
              render={({ field: { onChange, value } }) => (
                <Image
                  alt='Текущее изображение'
                  src={'/trash-red.svg'}
                  width={12}
                  height={12}
                  style={{
                    position: 'absolute',
                    top: -1,
                    right: 0,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    console.log(value);

                    if (images.length === 1) {
                      return toast.error(
                        'Невозможно удалить единственную картинку'
                      );
                    }

                    setCurrentImageIndex(() => 0);
                    console.log(currentImageIndex);

                    onChange(
                      (value as FileInput[]).filter(
                        ({ link }) => link !== image.link
                      )
                    );
                  }}
                />
              )}
            />

            <Image
              alt='Текущее изображение'
              src={image.link}
              width={80}
              height={80}
            />
          </div>
        ))}
        <Controller
          name='images'
          control={control}
          render={({ field: { onChange, value } }) => (
            <label
              style={{
                width: 80,
                height: 80,
                backgroundColor: 'var(--black)',
                border: '1px dashed var(--white)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Image
                src={'/image-input.svg'}
                alt='Добавить изображения'
                height={30}
                width={30}
              />
              <input
                style={{
                  display: 'none',
                }}
                type='file'
                accept='image/*'
                multiple={true}
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  const processedFiles: FileInput[] = files.map((file) => ({
                    file: file,
                    link: URL.createObjectURL(file),
                  }));
                  onChange([...value, ...processedFiles]);
                }}
              />
            </label>
          )}
        />
      </div>
      <div>
        <div>
          <Image
            alt='Текущее изображение'
            src={currentImage.link}
            width={400}
            height={300}
            style={{
              height: 300,
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
        <div style={{ marginTop: 20 }}>{description}</div>
      </div>
    </section>
  );
};
