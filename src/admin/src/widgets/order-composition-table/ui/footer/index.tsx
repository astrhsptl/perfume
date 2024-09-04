import { OrderComplectation } from '@/shared';
import React from 'react';

interface FooterProps {
  totalCost: number;
}

export const Footer: React.FC<FooterProps> = ({ totalCost }) => {
  return (
    <>
      <section className={OrderComplectation.tableFooter}>
        <div className={OrderComplectation.tableFooterLabels}>Итого: </div>
        <div>{totalCost}$</div>
      </section>
    </>
  );
};
