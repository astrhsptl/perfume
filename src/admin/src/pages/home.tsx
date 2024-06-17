import React from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      Admin
      <button onClick={() => toast.success('Успешно')}>Успешно</button>
      <button onClick={() => toast.error('Ошибка')}>Ошибка</button>
      <button onClick={() => toast('информация')}>Информация</button>
    </div>
  );
};
