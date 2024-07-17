import React, { useEffect, useState } from 'react';
import HeaderStyles from './header.module.css';
import { getMonthName } from './lib';
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

  return (
    <>
      <header className={HeaderStyles.header}>
        <div className={HeaderStyles.conteiner}>
          <h1 className={HeaderStyles.title}>Заказы</h1>
          <div className={HeaderStyles.time}>
            <p className={HeaderStyles.data}>
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
