import { Footer } from '@/widgets/Orders/table/footer';
import React from 'react';
import TableStyles from '../table.module.css';
import { Header } from './header/index';
import { TableRow } from './table-row/index';
interface Table {}

export const Table: React.FC<Table> = () => {
  return (
    <>
      <div className={TableStyles.table_container}>
        <section className={TableStyles.table_content}>
          <section className={TableStyles.table_row_container}>
            <Header />
            {[2, 6, 8, 9, 0].map((element) => (
              <TableRow key={element} />
            ))}
            {/* <TableRow />
            <TableRow /> */}
          </section>
        </section>
        <Footer />
      </div>
    </>
  );
};
