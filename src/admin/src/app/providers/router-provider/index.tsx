import { NotFound } from '@/pages';
import { Plug } from '@/pages/__plug';
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
        </Route>
        <Route path='/not-found' element={<Plug />} />
        <Route path='*' element={<NotFound />} />
      </>,
    ),
  );
};
