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
import FieldList from './components/Admin/FieldList.jsx';
import SewaList from './components/admin/SewaList.jsx';
import SewaUser from './components/user/SewaUser.jsx';
import DataMember from './components/admin/DataMember.jsx';
import DataAdmin from './components/admin/DataAdmin.jsx';
import Pembayaran from './components/user/Pembayaran.jsx';
import Jadwal from './components/user/Jadwal.jsx';
import SalesChart from './components/admin/SalesChart.jsx';
import DataPembayaran from './components/admin/DataPembayaran.jsx';
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
      {
        path: "/admin/fieldList",
        element: <FieldList />,
      },
      {
        path: "/admin/sewaList",
        element: <SewaList />,
      },

      {
        path: "/user/pembayaran",
        element: <Pembayaran />,
      },
      { path: "/use/sewauser", element: <SewaUser /> },

      { path: "/admin/dataMember", element: <DataMember /> },
      { path: "/admin/dataAdmin", element: <DataAdmin /> },
      { path: "/user/jadwal", element: <Jadwal /> },
      { path: "/admin/salesChart", element: <SalesChart /> },
      { path: "/admin/dataPembayaran", element: <DataPembayaran /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

