import React from 'react';
import TableRowStyles from '../table.module.css';
interface Status {}

export const Status: React.FC<Status> = () => {
  return (
    <>
      <div className={TableRowStyles.status}>
        <img src='/new-order.svg'></img>
        <p className={TableRowStyles.status_text}>Открыт</p>
      </div>
    </>
  );
};
