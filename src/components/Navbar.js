import React, { useEffect, useState } from 'react'
import logo from './../Foodpanda-Logo.png'
import './style.css'

import { auth } from "../config/firebase"

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from "./../state/index"


const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { authData, isAuthenticatedData, sendResturantExists } = bindActionCreators(actionCreators, dispatch)

    const userData = useSelector(state => state.myAuth)
    // console.log(userData)
    const authenticated = useSelector(state => state.myAuthLoggined)

    // console.log(authenticated)

    const logout = async () => {
        auth.signOut();
        const user = auth.currentUser;
        authData(user)
        isAuthenticatedData(false)
        sendResturantExists(false)
        // setLoginOptionDisplay("Cart-and-Login d-none")
        Swal.fire({
            title: 'Congrats! Logged Out Successfully.',
            width: 600,
            padding: '3em',
            color: '#e21b70',
            backdrop: `#ffeaf2 left top no-repeat`
        })
        navigate("/")
    }



    // let [loginOptionDisplay, setLoginOptionDisplay] = useState("Cart-and-Login")








    return (
        <div className="mynavbar">
            <div className="logoDiv"><img src={logo} className='logo-foodpanda' alt="" /></div>
            <div id="Cart-and-Login" className={authenticated === false ? "Cart-and-Login d-none" : "Cart-and-Login"} >

                <div className="login dropdown " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                    <div className="loginBtn mx-2" ><i className="fas fa-user" ></i></div>
                    <div className='loginText'>{authenticated === false ? " " : userData.currentUser.email.split(" ")[0] + "..." || userData.currentUser.email.split(" ")[0] + "..."} <i className="fas fa-caret-down mx-2" ></i></div>
                    {/* authData.currentUser.displayName || authData.currentUser.displayName */}
                    <div className="dropdown-menu profieDropdownopt" aria-labelledby="dropdownMenuLink">

                        <a className="dropdown-item py-2 px-5 ">Settings</a   >
                        <a className="dropdown-item py-2 px-5 " onClick={logout} >Logout</a>
                    </div>
                </div>

                <div className="CartBtn"><i className="fas fa-shopping-basket"></i></div>
            </div>
        </div>
    )
}

export default Navbar


