import { OrdersPage } from '@/pages';
import { Route } from 'react-router-dom';
import { compileRouter } from './providers';

const Router = () => {
  return (
    <>
      <Route path='/' element={<OrdersPage />} />
    </>
  );
};

export const router = compileRouter(Router);
