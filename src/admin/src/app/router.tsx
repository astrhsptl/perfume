import { Admin, Home } from '@/pages';
import { Route } from 'react-router-dom';
import { compileRouter } from './providers';

const Router = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route path=':id' element={<Admin />} />
    </>
  );
};

export const router = compileRouter(Router);
