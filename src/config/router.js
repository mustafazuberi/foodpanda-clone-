import React from 'react'
import Home from '../pages/Home'
import SignupResturant from '../pages/SignupResturant'
import LoginUser from '../pages/LoginUser'
import LoginUserForm from '../pages/LoginUserForm'
import SignupUserForm from '../pages/SignupUserForm'


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
      path: "/SignupResturant",
      element: <SignupResturant />,
    },
    {
      path: "/",
      element: <LoginUser/>,
    },
    {
      path: "/loginWithEmail",
      element: <LoginUserForm/>,
    },
    {
      path: "/signupWithEmail",
      element: <SignupUserForm/>,
    },
  ]);
  return (
    <div>

      <RouterProvider router={router} />

    </div>
  )
}

export default Router