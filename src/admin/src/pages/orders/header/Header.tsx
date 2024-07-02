import React, { useEffect, useState } from 'react';
import './header.css';
interface Header {}

export const Header: React.FC<Header> = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, []);

  const getMonthName = () => {
    const formatter = new Intl.DateTimeFormat('ru-RU', { month: 'long' });
    return formatter.format(this);
  };

  return (
    <>
      <header>
        <div className='conteiner'>
          <h1 className='title'>Заказы</h1>
          <div className='time'>
            <p>
              {currentDate.getHours().toLocaleString()}:
              {currentDate.getMinutes().toLocaleString()}
            </p>
            <p>
              {currentDate.getDate()} {getMonthName(currentDate)}
            </p>
          </div>
        </div>
      </header>
    </>
  );
};
