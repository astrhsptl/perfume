'use client';

import { FormBaseLayout } from '@/features';
import { BaseStyle } from '@/shared';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AuthLayoutProps {
  title: string;
  description: ReactNode;
  children: ReactNode;
  submit: SubmitHandler<any>;
}

export const AuthLayout = ({
  children,
  submit,
  title,
  description,
}: AuthLayoutProps) => {
  const methods = useForm();

  return (
    <section>
      <h1>{title}</h1>
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
