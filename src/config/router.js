import React, { useEffect, useState } from 'react'
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
  const isResturant = useSelector(state => state.myIsResturants)

  const [accHome, setAccHome] = useState('')
  useEffect(() => {
    if (isResturant) {
      setAccHome(<ResturantProfile />)
    } else {
      setAccHome(<Home />)
    }

  }, [])

  const router = createBrowserRouter([
    {
      path: "/home",
      element: authenticated ? <Home /> : <LoginUser />,
    },
    {
      path: "/SignupResturant",
      element: !isResturant && !authenticated ? <SignupResturant /> : accHome,
    },
    {
      path: "/",
      element: !isResturant && !authenticated ? <LoginUser /> : accHome,
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
      element: isResturant ? <ResturantProfile /> : < LoginUserForm />

    },
    {
      path: "/ResturantProfileDetails",
      element: isResturant ? <ResturantProfileDetails /> : < LoginUserForm />
    },
    {
      path: "/ResturantDetails/:detailRestId",
      element: authenticated && !isResturant ? <ResturantDetails /> : <LoginUserForm />
    },
    {
      path: "/userCart",
      element: authenticated && !isResturant ? <UserCart /> : accHome,
    },
    {
      path: "/resturantCart",
      element: isResturant ? <ResturantCart /> : < LoginUserForm />
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />

    </div>
  )
}

export default Router





