import HeaderStyles from '@/widgets/Orders/header/header.module.css';
import { formatTimeString, getMonthName } from '@/widgets/Orders/header/lib';
import React, { useEffect, useState } from 'react';
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
          <h1 className={HeaderStyles.title}>Заказ 123</h1>
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
