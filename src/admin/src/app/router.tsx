import { OrdersPage } from '@/pages';
import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<OrdersPage />} />
    </Routes>
  );
};
