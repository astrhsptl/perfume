import { ProductStyle } from '@/shared';
import Image from 'next/image';

interface BackLinkProps {}

export const BackLink = async ({}: BackLinkProps) => {
  return (
    <article className={ProductStyle.sectionBack}>
      <Image src={'/arrow-down.svg'} alt={'Назад'} width={24} height={24} />
      <span>назад</span>
    </article>
  );
};
