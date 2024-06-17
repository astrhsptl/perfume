import { Home } from '@/pages';
import { Some } from '@/pages/some';
import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<Some />} />
    </Routes>
  );
};
