import { ButtonProps } from '@mui/material';
import clsx, { ClassValue } from 'clsx';
import { ReactNode } from 'react';
import { BaseStyle, montserrat } from '../styles';

type DefaultButtonProps = {
  theme?: 'light' | 'dark';
  children?: ReactNode | string;
  className?: ClassValue;
  isLoading?: boolean;
} & ButtonProps;

export function DefaultButton({
  theme,
  isLoading,
  children,
  className,
  ...other
}: DefaultButtonProps) {
  return (
    <button
      {...other}
      className={
        className
          ? clsx(className)
          : clsx(
              BaseStyle.baseButton,
              montserrat.className,
              theme || theme === 'dark' ? BaseStyle.dark : BaseStyle.light
            )
      }
    >
      {children}
    </button>
  );
}
