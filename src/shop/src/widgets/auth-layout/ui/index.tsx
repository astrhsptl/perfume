'use client';

import { FormBaseLayout } from '@/features';
import { AuthStyle, BaseStyle, montserrat } from '@/shared';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  submit: SubmitHandler<any>;
}

export const AuthLayout = ({ children, submit, title }: AuthLayoutProps) => {
  const methods = useForm();

  return (
    <section className={clsx(AuthStyle.authLayout, montserrat.className)}>
      <h1 className={clsx(montserrat.className)}>{title}</h1>
      <FormBaseLayout
        onSub={submit}
        methods={methods}
        className={BaseStyle.baseForm}
      >
        {children}
      </FormBaseLayout>
    </section>
  );
};
