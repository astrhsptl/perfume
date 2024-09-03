import { OrderCommonStyles } from '@/shared';
import React from 'react';

interface FooterProps {
  totalCost: number;
}

export const Footer: React.FC<FooterProps> = ({ totalCost }) => {
  return (
    <>
      <section className={OrderCommonStyles.table_footer}>
        Итого: {totalCost}$
      </section>
    </>
  );
};
