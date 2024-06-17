import { NotFound } from '@/pages';
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
        <Route path='*' element={<NotFound />} />
      </>,
    ),
  );
};
