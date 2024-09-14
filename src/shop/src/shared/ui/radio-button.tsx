'use client';

import { RegisterOptions, useFormContext } from 'react-hook-form';
import { BaseStyle } from '../styles';

type RadioButtonProps = {
  name: string;
  text?: string;
  registerOptions?: RegisterOptions;
} & JSX.IntrinsicElements['input'];

export const RadioButton = ({
  text,
  name,
  registerOptions,
  ...inputProps
}: RadioButtonProps) => {
  const { register } = useFormContext();

  return (
    <label className={BaseStyle.radioLabel}>
      <input
        type='radio'
        className={BaseStyle.defaultRadio}
        {...{ ...inputProps, ...register(name as string, registerOptions) }}
      />
      {text ?? inputProps.value}
    </label>
  );
};
