import React, { useEffect, useState } from 'react';
import HeaderStyles from './header.module.css';
import { formatTimeString, getMonthName } from './lib';
interface Header {}

export const Header: React.FC<Header> = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const hours = formatTimeString(currentDate.getHours().toLocaleString());
  const minutes = formatTimeString(currentDate.getMinutes().toLocaleString());

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
              {hours}:{minutes}
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
