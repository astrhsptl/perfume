import Image from 'next/image';
import React from 'react';
import { BaseStyle } from '../styles';

interface InputErrorProps {
  message: string;
}

export const InputError: React.FC<InputErrorProps> = ({ message }) => {
  return (
    <div className={BaseStyle.inputError}>
      <Image
        height={12}
        width={12}
        src='/message-alert.svg'
        alt='Ошибка заполнения!'
      />
      <span className={BaseStyle.message}>{message}</span>
    </div>
  );
};
