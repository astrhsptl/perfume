import { CartStyle, DefaultButton } from '@/shared';
import React from 'react';

interface PaymentSectionProps {
  quantity: number;
  cost: number | string;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  cost,
  quantity,
}) => {
  return (
    <section className={CartStyle.paymentSection}>
      <div className={CartStyle.paymentInfo}>
        <span>Итого: ({quantity} шт.)</span>
        <span>{cost}$</span>
      </div>
      <DefaultButton
        style={{ maxWidth: '100%' }}
        onClick={() => {
          alert('поздравляем, вашу бабку разобрали нахуй на органы!');
        }}
      >
        Оплатить
      </DefaultButton>
    </section>
  );
};
