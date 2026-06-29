import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './View-trip/[trip-id]';
import Mytrip from './my-trip';
import Layout from './components/Layout';
import Login from './auth/Login';
import Signup from './auth/Signup';
import AccountSettings from './account';
import Destinations from './destinations';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/create-trip',
        element: <CreateTrip />,
      },
      {
        path: '/view-trip/:tripId',
        element: <Viewtrip />,
      },
      {
        path: '/my-trip',
        element: <Mytrip />,
      },
      {
        path: '/account',
        element: <AccountSettings />,
      },
      {
        path: '/destinations',
        element: <Destinations />,
      },
    ],
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/signup',
    element: <Signup />,
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
);
