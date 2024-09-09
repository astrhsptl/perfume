'use client';

import dynamic from 'next/dynamic';
import { SelectDarkStyle } from '../styles';

const Select = dynamic(() => import('react-select').then((mod) => mod.default));

type BaseOption = {
  value: string;
  label: string;
};
interface CustomSelectProps {
  options: BaseOption[];
  placeholder?: string;
  onChange?: (newValue: BaseOption) => void | undefined;
  value?: BaseOption;
}

export const CustomSelect = ({
  options,
  placeholder,
  onChange,
  value,
}: CustomSelectProps) => {
  return (
    <Select
      placeholder={placeholder}
      styles={SelectDarkStyle}
      options={options}
      onChange={(newValue) => onChange && onChange(newValue as BaseOption)}
      required={true}
      defaultValue={value}
    />
  );
};
