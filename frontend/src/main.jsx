import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import React from 'react';
import ReactDOM from "react-dom/client";
import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import HomeAdmin from './components/Admin/HomeAdmin.jsx';
import Sidebar from './components/Admin/Sidebar.jsx';
import HeaderAdmin from './components/Admin/HeaderAdmin.jsx';
import HeaderUser from './components/user/HeaderUser.jsx';
import CarouselUser from './components/user/CarouselUsel.jsx';
import HomeUser from './components/user/HomeUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/admin/sidebar",
        element: <Sidebar />,
      },
      {
        path: "/admin/homeAdmin",
        element: <HomeAdmin />,
      },
      {
        path: "/admin/homeAdmin",
        element: <HeaderAdmin />,
      },
      {
        path: "/user/headerUser",
        element: <HeaderUser />,
      },
      {
        path: "/user/carouselUser",
        element: <CarouselUser />,
      },
      {
        path: "/user/homeUser",
        element: <HomeUser />,
      },
     
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

