import { Cart } from '@/entities';
import { fetchCarts } from '@/features/request';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { StatePicker } from './status-picker';
import { TableRow } from './table-row';
import TableStyles from './table.module.css';
interface Table {
  cart: Cart;
}

export const Table: React.FC<Table> = (cart) => {
  const [isHidden, setIsHidden] = useState(false);
  const payload = useQuery({
    queryKey: ['cartList'],
    queryFn: async () => await fetchCarts(),
  });
  return (
    <>
      <div className={TableStyles.table_container}>
        <section
          className={clsx(
            TableStyles.table_content,
            isHidden ? TableStyles.open : '',
          )}
        >
          <StatePicker isHidden={isHidden} setIsHidden={setIsHidden} />
          <section className={TableStyles.table_row_container}>
            <Header />
            {(payload.isLoading ? [] : payload.data.data.data).map(
              (element) => (
                <TableRow key={element.id} cart={element} />
              ),
            )}
            {/* <TableRow />
            <TableRow /> */}
          </section>
        </section>
        <Footer />
      </div>
    </>
  );
};
