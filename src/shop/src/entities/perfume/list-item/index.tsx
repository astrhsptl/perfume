import { Perfume } from '@/entities/model';
import { ProductListStyle } from '@/shared';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface PerfumeListItemProps {
  perfume: Perfume;
}

export const PerfumeListItem = ({
  perfume: { id, name, description, file, perfume_volume },
}: PerfumeListItemProps) => {
  const imagePreview = file[0];
  const volume = perfume_volume[0];

  return (
    <Link href={`/products/${id}`} className={ProductListStyle.productItem}>
      <Image
        src={imagePreview ? imagePreview.url : '/perfume.png'}
        alt={name}
        fill={true}
      />
      <p className={clsx(ProductListStyle.productText, ProductListStyle.title)}>
        {name}
      </p>
      <p
        className={clsx(
          ProductListStyle.productText,
          ProductListStyle.description
        )}
      >
        {description}
      </p>
      <p className={clsx(ProductListStyle.productText, ProductListStyle.cost)}>
        {volume ? volume.cost : ''} $
      </p>
    </Link>
  );
};
