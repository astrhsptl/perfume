import { OrdersPage } from '@/pages';
import { OrderPage } from '@/pages/Order';
import { Route } from 'react-router-dom';
import { compileRouter } from './providers';

const Router = () => {
  return (
    <>
      <Route index element={<OrdersPage />} />
      <Route index element={<OrderPage />} />
    </>
  );
};

export const router = compileRouter(Router);
