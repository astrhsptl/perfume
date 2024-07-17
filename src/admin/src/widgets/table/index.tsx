import { Checkbox } from '@mui/material';
import React from 'react';
import { Footer } from './footer';
import { Header } from './header';
import { StatePicker } from './status-picker';
import './table.css';
interface Table {}

export const Table: React.FC<Table> = () => {
  return (
    <>
      <div className='table-container'>
        <section className='table-content'>
          <StatePicker />
          <section className='table-row-container'>
            <Header />
            <div className='row-container'>
              <div className='row-container_content'>
                <div className='id_check'>
                  <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
                  12345
                </div>
                <p className='text-content'>User #123</p>
                <div className='contack-group'>
                  <p className='text-content'>+7(938)592-74-12</p>
                  <p className='text-content'>spme@one.ru</p>
                </div>
                <div className='date-group'>
                  <p className='text-content'>01.06.2024 12:34</p>
                </div>
                <p className='text-content'>777 $</p>
                <div className='status'>
                  <img src='../../../../public/New.svg'></img>
                  <p className='status-text'>Открыт</p>
                </div>
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </div>
    </>
  );
};
