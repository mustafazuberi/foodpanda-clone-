import React from 'react'
import './style.css'

import { useState, useEffect } from 'react';

import Navbar from '../../components/Navbar';

import { useNavigate } from "react-router-dom";

import { TextField } from '@mui/material';

import { createUserWithEmailAndPassword, auth, addUserToDBSignup } from './../../config/firebase'

import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from "./../../state/index"


const Index = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { authData, isAuthenticatedData } = bindActionCreators(actionCreators, dispatch)




    const signupFirebase = async () => {
        try {
            const userName = document.getElementById("userName").value
            const email = document.getElementById("email").value
            const password = document.getElementById("psw").value
            if (userName.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'username required',
                })
                return
            }
            await createUserWithEmailAndPassword(auth, email, password)
            await addUserToDBSignup(userName)
            authData(auth)
            isAuthenticatedData(true)
            Swal.fire({
                title: 'Congrats! Account Created Successfully.',
                width: 600,
                padding: '3em',
                color: '#e21b70',
                backdrop: `#ffeaf2 left top no-repeat`
            })
            navigate('/loginWithEmail')
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
                <h1>Sign up Here</h1>
                <TextField id="userName" label="Enter Your username" type="email" variant="outlined" className='signupFormInps ' />
                <TextField id="email" label="Enter Your Email" type="email" variant="outlined" className='signupFormInps mt-4 ' />
                <TextField id="psw" label="Enter Your Passsword" type="password" variant="outlined" className='signupFormInps mt-4 ' />
                <button className="login-Btn loginBtnLoginForm" style={{ marginTop: "80px" }} onClick={signupFirebase}>Sign up</button>

            </div>
        </>
    )
}

export default Index
