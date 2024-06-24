import { Result, User } from '@/entities';
import { AuthApiCore, ISignUp } from '@/shared';
import { signIn } from './sign-in';

export const signUp = async (authData: ISignUp) => {
  const result = await AuthApiCore.signUp(authData)
    .then(({ data }) => {
      const result = new Result<User>();
      return result.setResult(data, 'Успешно!');
    })
    .catch(({ message }) => {
      const result = new Result<User>();
      return result.setError(message);
    });

  if (result.isError) {
    return result;
  }

  return await signIn({
    email: authData.email,
    password: authData.password,
  });
};
