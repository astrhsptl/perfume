import { StylesConfig } from 'react-select';

export const SelectDarkStyle: StylesConfig = {
  control: (provided) => ({
    ...provided,
    maxWidth: 300,
    backgroundColor: '#000',
    borderColor: '#fff',
    color: '#fff',
    boxShadow: 'none',
    fontSize: 14,
    '&:hover': {
      borderColor: '#fff',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: 14,
    maxWidth: 300,
    backgroundColor: state.isSelected
      ? '#000'
      : state.isFocused
      ? '#000'
      : '#000',
    color: '#fff',
  }),
  menu: (provided) => ({
    ...provided,
    maxWidth: 300,
    backgroundColor: '#000',
    color: '#fff',
  }),
};
