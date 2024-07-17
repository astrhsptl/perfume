import React, { Dispatch } from 'react';

import clsx from 'clsx';
import '../table.css';
interface StatePicker {
  isHidden: boolean;
  setIsHidden: Dispatch<React.SetStateAction<boolean>>;
}

export const StatePicker: React.FC<StatePicker> = ({
  isHidden,
  setIsHidden,
}) => {
  return (
    <>
      <aside
        className={clsx('table-status-picker', isHidden ? 'hidden' : '')}
        onClick={() => {
          // if (event.target === event.currentTarget) return;
          setIsHidden(() => !isHidden);
        }}
      >
        <div
          className='_content'
          onClick={() => {
            console.log(1234);
          }}
        >
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
