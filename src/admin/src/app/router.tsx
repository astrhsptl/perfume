import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { compileRouter } from './providers';

const Home = lazy(() =>
  import('@/pages/home').then(({ Home }) => ({ default: Home })),
);
const Admin = lazy(() =>
  import('@/pages/admin').then(({ Admin }) => ({ default: Admin })),
);

const Router = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route path=':id' element={<Admin />} />
    </>
  );
};

export const router = compileRouter(Router);
