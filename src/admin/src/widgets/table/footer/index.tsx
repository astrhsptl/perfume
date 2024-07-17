import React from 'react';
import '../table.css';

interface Footer {}

export const Footer: React.FC<Footer> = () => {
  return (
    <>
      <section className='table-footer'>
        <p className='text-footer'>
          Показать: <a href='#'>по 20</a> / <a href='#'>по 50</a> /{' '}
          <a href='#'>по 100</a>
        </p>
        <div className='pages'>
          <div className='page-box'>1</div>
        </div>
      </section>
    </>
  );
};
