import { OrderCommonStyles } from '@/shared';
import React from 'react';

interface Footer {
  pagination: { page: number; quantity: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; quantity: number }>
  >;
}

export const Footer: React.FC<Footer> = ({ pagination, setPagination }) => {
  const pages = [2, 5, 10];

  return (
    <>
      <section className={OrderCommonStyles.table_footer}>
        <p className={OrderCommonStyles.text_footer}>
          Показать:{' '}
          {pages.map((data, index) => {
            return (
              <>
                <span
                  key={data}
                  style={{
                    color: pagination.quantity === data ? 'black' : '#63B6F2',
                  }}
                  onClick={() =>
                    setPagination({
                      ...pagination,
                      quantity: data,
                    })
                  }
                >
                  {data}
                </span>
                {index === pages.length - 1 ? ' ' : ' / '}
              </>
            );
          })}
        </p>
        <div className={OrderCommonStyles.pages}>
          <div className={OrderCommonStyles.page_box}>1</div>
        </div>
      </section>
    </>
  );
};
