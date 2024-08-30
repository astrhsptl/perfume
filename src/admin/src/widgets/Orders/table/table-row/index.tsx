import { Cart } from '@/entities';
import { Checkbox } from '@mui/material';
import React from 'react';
import TableRowStyles from '../table.module.css';
import { Status } from './Status';

interface TableRow {
  cart: Cart;
}

export const TableRow: React.FC<TableRow> = ({ cart }) => {
  return (
    <>
      <div className={TableRowStyles.table_container__main}>
        <div className={TableRowStyles.id_check}>
          <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
        </div>
        <p>{cart.user_id}</p>
        <p className={TableRowStyles.text_content}>User {cart.user_id}</p>
        <div className={TableRowStyles.contact_group}>
          <p className={TableRowStyles.text_content}>+7(938)592-74-12</p>
          <p className={TableRowStyles.text_content}>spme@one.ru</p>
        </div>
        <div className={TableRowStyles.date_group}>
          <p className={TableRowStyles.text_content}>01.06.2024 12:34</p>
        </div>
        <p
          className={TableRowStyles.text_content}
          style={{ justifySelf: 'center' }}
        >
          777 $
        </p>
        <Status />
      </div>
    </>
  );
};
