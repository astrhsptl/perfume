'use client';

import { signIn } from '@/features/auth';
import { DefaultButton, DefaultInput, ISignIn } from '@/shared';
import { AuthLayout } from '@/widgets';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

interface SignInFormProps {}

export const SignInForm = ({}: SignInFormProps) => {
  const router = useRouter();
  const authSubmit: SubmitHandler<ISignIn> = useCallback(async (data) => {
    const { result, isError } = await signIn(data);

    if (isError) {
      toast.error(result.comment);
      return null;
    }

    toast.success(result.comment);
    return router.push('/products');
  }, []);

  return (
    <AuthLayout
      title='Вход'
      submit={authSubmit}
      anotherLink='sign-up'
      anotherLinkTitle='Нет аккунта? Зарегистрироваться'
    >
      <DefaultInput
        name='email'
        placeholder='Email'
        type='email'
        registerOptions={{
          required: {
            value: true,
            message: 'Почта обязательна',
          },
        }}
      />
      <DefaultInput
        name='password'
        placeholder='Пароль'
        type='password'
        registerOptions={{
          required: {
            value: true,
            message: 'Пароль обязателен',
          },
        }}
      />
      <DefaultButton type='submit' style={{ marginTop: '20px' }}>
        Вход
      </DefaultButton>
    </AuthLayout>
  );
};
