'use client';

import { ProductStyle } from '@/shared';
import Image from 'next/image';
import { useState } from 'react';

interface ImageContainerProps {
  data?: { link: string }[];
  mode?: 'editing' | 'viewing';
  remove?(index: number): void;
}

export const ImageContainer = ({
  data,
  mode = 'editing',
}: ImageContainerProps) => {
  const [images, _] = useState(
    data ?? [
      {
        link: '/photo.png',
      },
      {
        link: '/photo.png',
      },
      {
        link: '/perfume-skeleton.png',
      },
      {
        link: '/photo.png',
      },
      {
        link: '/perfume-skeleton.png',
      },
    ]
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = images[currentImageIndex];

  return (
    <section className={ProductStyle.imageContainer}>
      <div className={ProductStyle.secondImageContainer}>
        {images.map((image, index) => (
          <Image
            key={index}
            alt='Текущее изображение'
            src={image.link}
            width={100}
            height={100}
            layout='responsive'
            onClick={() => setCurrentImageIndex(() => index)}
          />
        ))}
      </div>
      <div>
        <div>
          <Image
            alt='Текущее изображение'
            src={currentImage.link}
            width={400}
            height={400}
            layout='responsive'
            style={{
              maxHeight: 500,
              maxWidth: 500,
              marginBottom: 20,
            }}
          />
        </div>
        <div>description</div>
      </div>
    </section>
  );
};
