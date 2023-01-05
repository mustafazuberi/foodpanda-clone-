import React from 'react'
import Home from '../pages/Home'
import LoginResturant from './../pages/LoginResturant'
import LoginUser from '../pages/LoginUser'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const Router = () => {
  

  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/resturantLogin",
      element: <LoginResturant />,
    },
    {
      path: "/",
      element: <LoginUser/>,
    },
  ]);
  return (
    <div>

      <RouterProvider router={router} />

    </div>
  )
}

export default Router