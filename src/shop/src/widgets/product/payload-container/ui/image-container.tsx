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
  images = [],
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
            width={80}
            height={80}
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
