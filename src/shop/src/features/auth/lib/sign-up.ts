import { AuthApiCore, ISignUp } from '@/shared';
import toast from 'react-hot-toast';
import { signIn } from './sign-in';

export const signUp = async (authData: ISignUp) => {
  const user = await AuthApiCore.signUp(authData).catch(({ message }) => {
    toast.error(message);
    return null;
  });

  if (!user) {
    return;
  }

  return await signIn({
    email: user.data.email,
    password: authData.password,
  });
};
