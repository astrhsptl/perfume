import React from 'react';

import '../table.css';
interface StatePicker {}

export const StatePicker: React.FC<StatePicker> = () => {
  return (
    <>
      <aside className='table-status-picker'>
        <div className='_content'>
          <div className='burger'>
            <div className='burger-line'></div>
            <div className='burger-line'></div>
            <div className='burger-line'></div>
          </div>
          <div className='rotate-text'>Статусы</div>
        </div>
      </aside>
    </>
  );
};
