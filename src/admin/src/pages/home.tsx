import React from 'react';
import toast from 'react-hot-toast';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      Admin
      <button onClick={() => toast.success('Успешно')}>Успешно</button>
      <button onClick={() => toast.error('Ошибка')}>Ошибка</button>
      <button onClick={() => toast('информация')}>Информация</button>
    </div>
  );
};
