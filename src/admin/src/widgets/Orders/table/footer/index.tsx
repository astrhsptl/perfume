import React from 'react';
import FooterStyles from '../table.module.css';

interface Footer {}

export const Footer: React.FC<Footer> = () => {
  return (
    <>
      <section className={FooterStyles.table_footer}>
        <p className={FooterStyles.text_footer}>
          Показать: <a href='#'>по 20</a> / <a href='#'>по 50</a> /{' '}
          <a href='#'>по 100</a>
        </p>
        <div className={FooterStyles.pages}>
          <div className={FooterStyles.page_box}>1</div>
        </div>
      </section>
    </>
  );
};
