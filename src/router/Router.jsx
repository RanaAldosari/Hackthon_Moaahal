import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router";

import Welcome from '../pages/welcome';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import About from '../pages/About';
import Analysis from '../pages/Analysis';
import Result from '../pages/Result';
import AllProducts from '../pages/AllProducts';
import AiTech from '../pages/AiTech';
import Footer from '../pages/Footer';
import Navbar from '../pages/Navbar';
function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: "signin-page",
        element: <Signin />
      },
      {
        path: "signup-page",
        element: <Signup />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path:"home-analysis",
        element:<Analysis />
      },
      {
        path:"result",
        element:<Result />
      },
      {
        path:"all-products",
        element:<AllProducts />
      },
      {
        path:"nsapp-ai-tech",
        element:<AiTech />
      },
      {
        path: "navbar",
        element: <Navbar />
      }

    ]
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
