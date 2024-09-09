import { File as FileEntity, Perfume, ProductUpdateData } from '@/entities';
import { fileAPIBuild } from '@/features';
import { ProductStyle } from '@/shared';
import Image from 'next/image';
import React, { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ImageEditProps {
  perfume: Perfume;
}

export const ImageEdit: React.FC<ImageEditProps> = ({ perfume: { id } }) => {
  const { getValues } = useFormContext<ProductUpdateData>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileApi = fileAPIBuild.clientApi();
  const files = useWatch<ProductUpdateData>({
    name: 'file',
  }) as FileEntity[];

  const currentImage = files[currentImageIndex];

  return (
    <section className={ProductStyle.imageContainer}>
      <div className={ProductStyle.secondImageContainer}>
        {files.map((image, index) => (
          <div
            key={image.id}
            style={{
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <Controller
              name='file'
              render={({ field: { onChange } }) => (
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
                    if (files.length === 1) {
                      return toast.error(
                        'Невозможно удалить единственное изображение'
                      );
                    }
                    const newFiles = [...files];
                    const fileIndex = files.findIndex(
                      (file) => file.id === image.id
                    );
                    setCurrentImageIndex(0);
                    newFiles.splice(fileIndex, 1);
                    onChange(newFiles);

                    fileApi.remove(image.id).then(() => {
                      toast.success('Изображение удалено');
                    });
                  }}
                />
              )}
            />

            <Image
              className={ProductStyle.imageItem}
              alt='Текущее изображение'
              src={image.url}
              width={80}
              height={80}
              onClick={() => setCurrentImageIndex(() => index)}
            />
          </div>
        ))}
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
          <Controller
            name='file'
            render={({ field: { onChange } }) => (
              <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={(e) =>
                  Array.from(e.target.files ?? []).forEach((file) => {
                    const data = new FormData();
                    data.append('file', file);

                    fileApi
                      .create(data, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        },
                        data: data,
                        params: {
                          perfume_id: id,
                        },
                      })
                      .then(({ data }) =>
                        onChange([...getValues('file'), data])
                      );
                  })
                }
              />
            )}
          />
        </label>
      </div>
      <div>
        <div
          style={{
            backgroundColor: 'lightgrey',
          }}
        >
          <Image
            alt='Текущее изображение'
            src={currentImage.url}
            width={400}
            height={300}
            style={{
              height: 300,
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
        {/* <div style={{ marginTop: 20 }}>{description}</div> */}
      </div>
    </section>
  );
};
