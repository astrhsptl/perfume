import { Checkbox } from '@mui/material';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { StatePicker } from './status-picker';
import './table.css';
interface Table {}

export const Table: React.FC<Table> = () => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div className='table-container'>
        <section className={clsx('table-content', isHidden ? 'open' : '')}>
          <StatePicker isHidden={isHidden} setIsHidden={setIsHidden} />
          <section className='table-row-container'>
            <Header />
            <div className='row-container_content table-container--main'>
              <div className='id_check'>
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
              </div>
              <p>12345</p>
              <p className='text-content'>User #123</p>
              <div className='contack-group'>
                <p className='text-content'>+7(938)592-74-12</p>
                <p className='text-content'>spme@one.ru</p>
              </div>
              <div className='date-group'>
                <p className='text-content'>01.06.2024 12:34</p>
              </div>
              <p className='text-content' style={{ justifySelf: 'center' }}>
                777 $
              </p>
              <div className='status'>
                <img src='/new-order.svg'></img>
                <p className='status-text'>Открыт</p>
              </div>
            </div>
          </section>
        </section>

        <Footer />
      </div>
    </>
  );
};
