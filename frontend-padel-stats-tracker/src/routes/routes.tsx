import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { routes } from './Routes.config';
import { AppLayout } from '../layout/AppLayout';
import NotFoundPage from '../pages/404';

const Loader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
    <CircularProgress />
  </Box>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/matches" replace />} />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.Element />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
