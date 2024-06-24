'use client';

import { ErrorMessage } from '@hookform/error-message';
import clsx, { ClassValue } from 'clsx';
import React, { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { BaseStyle, montserrat } from '../styles';
import { InputError } from './input-error';

type PhoneInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
  registerOptions: RegisterOptions;
  placeholder?: string;
  className?: ClassValue;
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  type,
  registerOptions,
  placeholder,
  ...props
}) => {
  const [isActiveInput, setIsActiveInput] = useState<boolean>(false);
  // const [opts, _] = useState({
  //   mask: '+{7}(000)000-00-00',
  // });
  // const { ref } = useIMask<HTMLInputElement>(opts);
  const {
    formState: { errors },
    register,
  } = useFormContext();

  const registeredComponent = register('asdf');

  return (
    <div className={clsx(BaseStyle.defaultInput, montserrat.className)}>
      <input
        {...register(name, registerOptions)}
        ref={registeredComponent.ref}
        className={clsx(
          BaseStyle.input,
          isActiveInput ? BaseStyle.active : '',
          Object.keys(errors).length > 0 && errors[name] ? BaseStyle.error : ''
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
          Object.keys(errors).length > 0 && errors[name] ? BaseStyle.error : ''
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
