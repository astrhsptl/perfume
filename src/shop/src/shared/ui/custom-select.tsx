'use client';

import Select from 'react-select';
import { SelectDarkStyle } from '../styles';

type BaseOption = {
  value: string;
  label: string;
};
interface CustomSelectProps {
  options: BaseOption[];
  placeholder?: string;
  onChange?: (newValue: BaseOption) => void | undefined;
}

export const CustomSelect = ({
  options,
  placeholder,
  onChange,
}: CustomSelectProps) => {
  return (
    <Select
      placeholder={placeholder}
      styles={SelectDarkStyle}
      options={options}
      onChange={(newValue) => onChange && onChange(newValue as BaseOption)}
    />
  );
};
