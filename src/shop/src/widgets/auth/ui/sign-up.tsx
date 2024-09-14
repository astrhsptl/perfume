'use client';

import { signUp } from '@/features/auth';
import { DefaultButton, DefaultInput, ISignUp } from '@/shared';
import { AuthLayout } from '@/widgets';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

interface SignUpFormProps {}

export const SignUpForm = ({}: SignUpFormProps) => {
  const router = useRouter();

  const authSubmit: SubmitHandler<ISignUp> = async (data) => {
    const { result, isError } = await signUp(data);

    if (isError) {
      toast.error(result.comment);
      return null;
    }

    toast.success(result.comment);
    return router.push('/products');
  };

  return (
    <AuthLayout title='Вход' submit={authSubmit}>
      <DefaultInput
        name='username'
        placeholder='ФИО'
        type='text'
        registerOptions={{
          required: {
            value: true,
            message: 'ФИО обязательно',
          },
        }}
      />
      <DefaultInput
        name='phone'
        placeholder='Телефон'
        type='text'
        registerOptions={{
          required: {
            value: true,
            message: 'Телефон обязателен',
          },
        }}
      />
      <DefaultInput
        name='address'
        placeholder='Адрес'
        type='text'
        registerOptions={{
          required: {
            value: true,
            message: 'Адрес обязателен',
          },
        }}
      />
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
      <DefaultInput
        name='confirmPassword'
        placeholder='Подтвердите пароль'
        type='password'
        registerOptions={{
          required: {
            value: true,
            message: 'Подтвердите пароль',
          },
        }}
      />
      <DefaultButton type='submit' style={{ marginTop: '20px' }}>
        Вход
      </DefaultButton>
    </AuthLayout>
  );
};
