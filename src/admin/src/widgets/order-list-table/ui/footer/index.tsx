import { OrderCommonStyles } from '@/shared';
import clsx from 'clsx';
import React from 'react';

interface Footer {
  nextPage?: string | null;
  previousPage?: string | null;
  pagination: { page: number; quantity: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; quantity: number }>
  >;
}

export const Footer: React.FC<Footer> = ({
  pagination,
  setPagination,
  nextPage,
  previousPage,
}) => {
  const pages = [2, 5, 10];

  return (
    <>
      <section className={OrderCommonStyles.table_footer}>
        <div className={OrderCommonStyles.text_footer}>
          Показать:{' '}
          {pages.map((data, index) => {
            return (
              <span key={data.toString()}>
                <span
                  style={{
                    color: pagination.quantity === data ? 'black' : '#63B6F2',
                    cursor: 'pointer',
                    userSelect: 'none',
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
              </span>
            );
          })}
        </div>
        <div className={OrderCommonStyles.pages}>
          <button
            className={clsx(
              OrderCommonStyles.page_box,
              !previousPage && OrderCommonStyles.disabled,
            )}
            onClick={() =>
              setPagination({
                ...pagination,
                page: pagination.page - 1,
              })
            }
            disabled={!previousPage}
          >
            {'<'}
          </button>
          <div>{pagination.page}</div>
          <button
            className={clsx(
              OrderCommonStyles.page_box,
              !nextPage && OrderCommonStyles.disabled,
            )}
            onClick={() =>
              setPagination({
                ...pagination,
                page: pagination.page + 1,
              })
            }
            disabled={!nextPage}
          >
            {'>'}
          </button>
        </div>
      </section>
    </>
  );
};
