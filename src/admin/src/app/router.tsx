<<<<<<< HEAD
import { OrdersPage } from '@/pages';
import { Route, Routes } from 'react-router-dom';
=======
import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { compileRouter } from './providers';
>>>>>>> e9100ae820e4398f424b65aa8beab5f3408ad67e

const Home = lazy(() =>
  import('@/pages/home').then(({ Home }) => ({ default: Home })),
);
const Admin = lazy(() =>
  import('@/pages/admin').then(({ Admin }) => ({ default: Admin })),
);

const Router = () => {
  return (
<<<<<<< HEAD
    <Routes>
      <Route path='/' element={<OrdersPage />} />
    </Routes>
=======
    <>
      <Route index element={<Home />} />
      <Route path=':id' element={<Admin />} />
    </>
>>>>>>> e9100ae820e4398f424b65aa8beab5f3408ad67e
  );
};

export const router = compileRouter(Router);
