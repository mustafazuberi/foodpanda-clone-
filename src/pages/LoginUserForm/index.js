import React from 'react'
import './style.css'
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword, auth, addUserToDBSignup } from './../../config/firebase'

import Swal from 'sweetalert2';

import Navbar from '../../components/Navbar';

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from "./../../state/index"


const Index = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { authData, isAuthenticatedData, sendResturantExists } = bindActionCreators(actionCreators, dispatch)

    const resturantsFromRedux = useSelector(state => state.myResturants)
    let [whereToNavigate, setWhereToNavigate] = useState("")

    const isResturantHandler = (e) => {
        // console.log(e.target.value)
        for (let item of resturantsFromRedux) {
            if (item.restEmail === e.target.value) {
                console.log("condtion completed")
                sendResturantExists(true)
                setWhereToNavigate("/resturantMyProfile")
                // console.log("isResturant inside " + isResturant)
                return
            }
            else {
                setWhereToNavigate("/home")
            }
        }
    }
    const isResturant = useSelector(state => state.myIsResturants)


    const signInWithEmail = async () => {
        try {
            const email = document.getElementById("email").value
            const password = document.getElementById("psw").value
            await signInWithEmailAndPassword(auth, email, password)
            authData(auth)
            isAuthenticatedData(true)
            Swal.fire({
                title: 'Congrats Loggined Successfully.',
                width: 600,
                padding: '3em',
                color: '#e21b70',
                backdrop: `#ffeaf2 left top no-repeat`
            })
            // getting resturants and saving it in redux 
          

            navigate(whereToNavigate)
            window.scrollTo(0, 0)
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.message,
            })
        }
    }


    return (
        <>
            <Navbar />
            <div className='loginUserForm'>

                <h1>Log in by typing your email & password.</h1>
                <TextField id="email" label="Enter Your Email" type="email" variant="outlined" className='loginFormInps' onChange={isResturantHandler} />
                <TextField id="psw" label="Enter Your Passsword" type="password" variant="outlined" className='loginFormInps loginFormInpsPsw' />

                <button className="login-Btn loginBtnLoginForm" style={{ marginTop: '100px' }} onClick={signInWithEmail}>Log in</button>

            </div>
        </>
    )
}

export default Index
