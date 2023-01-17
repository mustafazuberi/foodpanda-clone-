import React from 'react'
import Home from '../pages/Home'
import SignupResturant from '../pages/SignupResturant'
import LoginUser from '../pages/LoginUser'
import LoginUserForm from '../pages/LoginUserForm'
import SignupUserForm from '../pages/SignupUserForm'
import ResturantProfile from '../pages/ResturantProfile'
import ResturantProfileDetails from '../pages/ResturantProfileDetails'
import ResturantDetails from '../pages/ResturantDetails'
import UserCart from "../pages/UserCart"
import ResturantCart from "../pages/ResturantCart"


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { useSelector } from 'react-redux'

const Router = () => {


  const authenticated = useSelector(state => state.myAuthLoggined)

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
      element: <LoginUser />,
    },
    {
      path: "/loginWithEmail",
      element: <LoginUserForm />,
    },
    {
      path: "/signupWithEmail",
      element: <SignupUserForm />,
    },
    {
      path: "/resturantMyProfile",
      element: <ResturantProfile />
    },
    {
      path: "/ResturantProfileDetails",
      element: <ResturantProfileDetails />
    },
    {
      path: "/ResturantDetails/:detailRestId",
      element: <ResturantDetails />
    },
    {
      path: "/userCart",
      element: <UserCart />
    },
    {
      path: "/resturantCart",
      element: <ResturantCart />
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />

    </div>
  )
}

export default Router