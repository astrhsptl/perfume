import { ProductStyle } from '@/shared';
import Image from 'next/image';

interface ImageContainerProps {}

export const ImageContainer = async ({}: ImageContainerProps) => {
  return (
    <section className={ProductStyle.imageContainer}>
      <div className={ProductStyle.secondImageContainer}>
        {[1, 2, 3, 4, 5].map((index) => (
          <Image
            key={index}
            alt='Текущее изображение'
            src='/photo.png'
            width={100}
            height={100}
            layout='responsive'
          />
        ))}
      </div>
      <div>
        <div>
          <Image
            alt='Текущее изображение'
            src='/perfume-skeleton.png'
            width={400}
            height={400}
            layout='responsive'
          />
        </div>
        <div>description</div>
      </div>
    </section>
  );
};
