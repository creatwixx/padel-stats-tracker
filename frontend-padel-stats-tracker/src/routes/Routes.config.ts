import React from 'react';
import type { NavRoute } from '../types/routes';

const Matches = React.lazy(() => import('../pages/MatchesPage'));
const StatsPage = React.lazy(() => import('../pages/StatsPage'));
const NotFoundPage = React.lazy(() => import('../pages/404'));

export const MatchesRoute: NavRoute = {
  Element: Matches,
  path: '/matches',
  to: '/matches',
  label: 'Matches',
};

export const StatsRoute: NavRoute = {
  Element: StatsPage,
  path: '/stats',
  to: '/stats',
  label: 'Stats',
};

export const routes: NavRoute[] = [MatchesRoute, StatsRoute];

export const NotFoundRoute = NotFoundPage;
