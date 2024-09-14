import { ProductStyle } from '@/shared';
import Image from 'next/image';
import Link from 'next/link';

interface BackLinkProps {}

export const BackLink = async ({}: BackLinkProps) => {
  return (
    <Link href={'/products'} className={ProductStyle.sectionBack}>
      <Image src={'/arrow-down.svg'} alt={'Назад'} width={24} height={24} />
      <span>назад</span>
    </Link>
  );
};
