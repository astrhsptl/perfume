import TableRowStyles from '@/widgets/Orders/table/table.module.css';
import { Checkbox } from '@mui/material';
import React from 'react';
interface TableRow {}

export const TableRow: React.FC<TableRow> = () => {
  return (
    <>
      <div className={TableRowStyles.table_container__main}>
        <div className={TableRowStyles.id_check}>
          <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
        </div>
        <p>12345</p>
        <p className={TableRowStyles.text_content}>Aroma royal</p>
        <div className={TableRowStyles.contact_group}>
          <p className={TableRowStyles.text_content}>75 ml</p>
        </div>
        <div className={TableRowStyles.date_group}>
          <p className={TableRowStyles.text_content}>12 шт.</p>
        </div>
        <p
          className={TableRowStyles.text_content}
          style={{ justifySelf: 'center' }}
        >
          123 $
        </p>
        <p className={TableRowStyles.text_content}>дохуя</p>
      </div>
    </>
  );
};
