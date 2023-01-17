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
  console.log(authenticated)
  const isResturant = useSelector(state => state.myIsResturants)

  const [accType, setAccType] = useState("nothing")
  const [accHome, setAccHome] = useState('')
  useEffect(() => {
    if (isResturant == true) {
      setAccType('resturant')
      setAccHome(<ResturantProfile />)
    } else if (authenticated == true && isResturant == false) {
      setAccType('user')
      setAccHome(<Home />)
    }
  }, [])

  const router = createBrowserRouter([
    {
      path: "/home",
      element: accType === 'user' ? <Home /> : <LoginUser />,
    },
    {
      path: "/SignupResturant",
      element: accType === 'nothing' ? <SignupResturant /> : accHome,
    },
    {
      path: "/",
      element: accType === 'nothing' ? <LoginUser /> : accHome,
    },
    {
      path: "/loginWithEmail",
      element: accType === 'nothing' ? <LoginUserForm /> : accHome,
    },
    {
      path: "/signupWithEmail",
      element: accType === 'nothing' ? <SignupUserForm /> : accHome,
    },
    {
      path: "/resturantMyProfile",
      // element: <ResturantProfile />
      element: isResturant ? <ResturantProfile /> : < LoginUserForm />

    },
    {
      path: "/ResturantProfileDetails",
      // element: <ResturantProfileDetails />
      element: isResturant ? <ResturantProfileDetails /> : < LoginUserForm />
    },
    {
      path: "/ResturantDetails/:detailRestId",
      element: accType === 'user' ? <ResturantDetails /> : <LoginUserForm />
    },
    {
      path: "/userCart",
      element: accType === 'user' ? <UserCart /> : accHome,
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





// element: isResturant ? <ResturantProfile /> : < LoginUserForm />