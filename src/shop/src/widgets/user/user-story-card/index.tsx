import { Perfume, PerfumeListItem } from '@/entities';
import { BaseStyle, UserStyles, montserrat } from '@/shared';
import { WithEmpty } from '@/widgets';
import clsx from 'clsx';

interface UserStoryCardProps {
  title: string;
  payload?: Perfume[];
}
export const UserStoryCard = async ({
  title,
  payload = [],
}: UserStoryCardProps) => {
  console.log(payload);

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
          {payload.map((product) => (
            <PerfumeListItem key={product.id} perfume={product} />
          ))}
        </WithEmpty>
      </div>
    </section>
  );
};
