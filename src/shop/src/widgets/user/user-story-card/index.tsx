import { Perfume } from '@/entities';
import { BaseStyle, UserStyles, montserrat } from '@/shared';
import { WithEmpty } from '@/widgets';
import clsx from 'clsx';

interface UserStoryCardProps {
  title: string;
  payload?: Perfume[];
}
export const UserStoryCard = async ({ title, payload }: UserStoryCardProps) => {
  return (
    <section
      className={clsx(
        UserStyles.productBlock,
        BaseStyle.container,
        montserrat.className
      )}
    >
      <h2>{title}</h2>
      <div className={UserStyles.products}>
        <WithEmpty>
          {payload?.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </WithEmpty>
      </div>
    </section>
  );
};
