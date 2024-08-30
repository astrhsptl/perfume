import { NotFound } from '@/pages';
import { Plug } from '@/pages/__plug';
import { OrderPage } from '@/pages/Order';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';

export const compileRouter = (router: () => JSX.Element) => {
  const appRoutes = router();

  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='admin' element={<Outlet />}>
          {appRoutes}
          <Route path='order' element={<OrderPage />}></Route>
        </Route>
        <Route path='/not-found' element={<Plug />} />
        <Route path='*' element={<NotFound />} />
      </>,
    ),
  );
};
