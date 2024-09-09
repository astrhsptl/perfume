import { CredentialStorage } from '@/shared';
import toast from 'react-hot-toast';

export const logout = () => {
  CredentialStorage.invalidate();
  toast.success('Successful logout!');
  setTimeout(() => {
    // router.push('/sign-in');
  }, 1000);
};
