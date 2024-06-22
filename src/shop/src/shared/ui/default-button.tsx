import clsx, { ClassValue } from 'clsx';
import { ReactNode } from 'react';
import { BaseStyle, montserrat } from '../styles';

type DefaultButtonProps = {
  theme?: 'light' | 'dark';
  children?: ReactNode | string;
  className?: ClassValue;
  isLoading?: boolean;
} & JSX.IntrinsicElements['button'];

export function DefaultButton({
  theme,
  isLoading,
  children,
  style,
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
