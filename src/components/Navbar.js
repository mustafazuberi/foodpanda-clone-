import React, { useEffect, useState } from 'react'
import logo from './../Foodpanda-Logo.png'
import './style.css'

import { useSelector } from 'react-redux'

const Navbar = () => {



    let [loginOptionDisplay, setLoginOptionDisplay] = useState("Cart-and-Login")



    return (

        <div className="mynavbar ">
            <div className="logoDiv"><img src={logo} className='logo-foodpanda' alt="" /></div>
            <div id="Cart-and-Login" className={loginOptionDisplay} >

                <div className="login">
                    <div className="loginBtn mx-2"><i className="fas fa-user" ></i></div>
                    <div className='loginText'>Login <i className="fas fa-caret-down mx-2"></i></div>
                </div>

                <div className="CartBtn"><i className="fas fa-shopping-basket"></i></div>
            </div>
        </div>
    )
}

export default Navbar


