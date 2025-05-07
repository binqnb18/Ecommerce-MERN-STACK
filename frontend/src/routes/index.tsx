// src/routes/index.tsx
import { AppLayout } from '@/components/layout/AppLayout';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Inbox from '@/pages/Inbox';
import Calendar from '@/pages/Calendar';
import Search from '@/pages/Search';
import Settings from '@/pages/Settings';
import Account from '@/pages/Account';
import Logout from '@/pages/Logout';
import NotFound from '@/pages/NotFound';

export const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/inbox', element: <Inbox /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/search', element: <Search /> },
      { path: '/settings', element: <Settings /> },
      { path: '/account', element: <Account /> },
      { path: '/logout', element: <Logout /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];