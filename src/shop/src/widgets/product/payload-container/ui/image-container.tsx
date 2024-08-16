'use client';

import { ProductStyle } from '@/shared';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

interface ImageContainerProps {
  images?: { link: string }[];
  description?: ReactNode;
  mode?: 'editing' | 'viewing';
  remove?(index: number): void;
}

export const ImageContainer = ({
  images = [
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
  ],
  description,
  mode = 'editing',
}: ImageContainerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = images[currentImageIndex];

  return (
    <section className={ProductStyle.imageContainer}>
      <div className={ProductStyle.secondImageContainer}>
        {images.map((image, index) => (
          <Image
            className={ProductStyle.imageItem}
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
        <div
          style={{
            backgroundColor: 'lightgrey',
          }}
        >
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
