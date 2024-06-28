'use client';

import { ErrorMessage } from '@hookform/error-message';
import clsx, { ClassValue } from 'clsx';
import React, { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { BaseStyle, montserrat } from '../styles';
import { InputError } from './input-error';

type DefaultInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
  registerOptions: RegisterOptions;
  className?: ClassValue;
};

export const DefaultInput: React.FC<DefaultInputProps> = ({
  name,
  type,
  registerOptions,
  placeholder,
  ...props
}) => {
  const [isActiveInput, setIsActiveInput] = useState<boolean>(false);
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const currentError = errors[name];

  return (
    <div className={clsx(BaseStyle.defaultInput, montserrat.className)}>
      <input
        {...props}
        {...register(name, registerOptions)}
        name={name}
        className={clsx(
          BaseStyle.input,
          isActiveInput ? BaseStyle.active : '',
          currentError && BaseStyle.error
        )}
        onFocus={() => {
          setIsActiveInput(true);
        }}
        onBlur={(e) => {
          setIsActiveInput(false || e.target.value !== '');
        }}
      />
      <span
        className={clsx(
          BaseStyle.defaultInputPlaceholder,
          isActiveInput ? BaseStyle.active : '',
          currentError && BaseStyle.error
        )}
      >
        {placeholder ?? name}
      </span>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <InputError message={message} />}
      />
    </div>
  );
};
