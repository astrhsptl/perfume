'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { BaseStyle, PerfumeModify, SelectDarkStyle } from '../styles';

const Select = dynamic(() => import('react-select').then((mod) => mod.default));

type BaseOption = {
  value: string;
  label: string;
};
interface CustomSelectProps {
  options: BaseOption[];
  placeholder?: string;
  onChange?: (newValue: BaseOption) => void | undefined;
  modifyHandler?: () => unknown;
  value?: BaseOption;
}

export const CustomSelect = ({
  options,
  placeholder,
  onChange,
  modifyHandler,
  value,
}: CustomSelectProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 30px',
        maxWidth: 300,
        gap: 5,
      }}
    >
      <Select
        placeholder={placeholder}
        styles={SelectDarkStyle}
        options={options}
        onChange={(newValue) => onChange && onChange(newValue as BaseOption)}
        required={true}
        defaultValue={value}
      />
      <button
        type='button'
        onClick={modifyHandler}
        className={clsx(BaseStyle.pointer, PerfumeModify.modifySelectButton)}
      >
        <Image src='/volume-input.svg' alt='Добавить' height={35} width={35} />
      </button>
    </div>
  );
};
