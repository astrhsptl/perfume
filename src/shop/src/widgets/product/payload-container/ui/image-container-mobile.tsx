'use client';

import { ProductStyle } from '@/shared';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ImageContainerMobileProps {
  images?: { link: string }[];
}

export const ImageContainerMobile = ({
  images = [
    {
      link: '/perfume-skeleton.png',
    },
    {
      link: '/perfume-skeleton.png',
    },
    {
      link: '/perfume-skeleton.png',
    },
    {
      link: '/perfume-skeleton.png',
    },
    {
      link: '/perfume-skeleton.png',
    },
  ],
}: ImageContainerMobileProps) => {
  return (
    <section className={ProductStyle.ImageContainerMobile}>
      <Link href={'/products'} className={ProductStyle.backLinkMobile}>
        <Image src={'/arrow-down.svg'} alt={'Назад'} width={24} height={24} />
      </Link>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              alt='Текущее изображение'
              src={image.link}
              width={100}
              height={100}
              layout='responsive'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
