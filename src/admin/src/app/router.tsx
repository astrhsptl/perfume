import { OrderByIdPage, OrdersPage } from '@/pages';

import { Route } from 'react-router-dom';
import { compileRouter } from './providers';

const Router = () => {
  return (
    <>
      <Route index element={<OrdersPage />} />
      <Route path=':id' element={<OrderByIdPage />} />
    </>
  );
};

export const router = compileRouter(Router);
