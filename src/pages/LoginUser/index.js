import React from 'react'
import './style.css'
import Swal from 'sweetalert2';
import { useState, useEffect, useLayoutEffect } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  swal,
  auth,
  addUserToDB,
  FacebookAuthProvider,
  db,
  collection,
  getDocs
} from "../../config/firebase";

import Navbar from '../../components/Navbar';

import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from 'redux'
import actionCreators from "./../../state/index"
// import { useLocation } from 'react-router-dom'




const LoginUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { authData, isAuthenticatedData, sendResturantData } = bindActionCreators(actionCreators, dispatch)
  const [resturantsData, setResturantsData] = useState([])



  const signInGoogle = async () => {
    try {
      var provider = new GoogleAuthProvider();
      const result = await auth;
      await signInWithPopup(auth, provider);
      await addUserToDB();
      authData(auth)
      isAuthenticatedData(true)

      Swal.fire({
        title: 'Congrats Loggined Successfully.',
        width: 600,
        padding: '3em',
        color: '#e21b70',
        backdrop: `
        #ffeaf2
        left top
        no-repeat
        `
      })
      // localStorage.setItem("auth", JSON.stringify(auth))
      // resturantsData.forEach((item) => {
      //   if (item.restEmail === auth.currentUser.Email) {
      //     navigate("/resturantMyProfile")
      //   } else {
      //     navigate('/home')
      //   }
      // })

    } catch (e) {
      console.log(e.message);
    }
  };

  // getting resturants and saving it in redux 
  useLayoutEffect(() => {

    (async () => {
      const querySnapshot = await getDocs(collection(db, "Resturants"))
      const resturants = []
      querySnapshot.forEach((doc) => {
        resturants.push({ id: doc.id, ...doc.data() })
      })
      console.log(resturants)
      sendResturantData(resturants)

    })();
  }, [])








  return (
    <div>
      <Navbar />

      <div className="loginOptionsDiv">
        <h2 className='welcomeHeading'>Welcome!</h2>
        <h3 className='welcomDesc'>Sign up or log in to continue</h3>
        <button onClick={signInGoogle} className="contWithGoogleBtn mt-5" >
          <div className="loginIcon">
            <i className="fab fa-google"></i>
          </div>
          <div className="continueHead" >
            Continue with Google
          </div>
        </button>
        <button className="contWithFbBtn">
          <div className="loginIcon">
            <i className="fab fa-facebook"></i>
          </div>
          <div className="continueHead" >
            Continue with Facebook
          </div>
        </button>
        <button className="login-Btn" onClick={() => navigate('/loginWithEmail')}>Log in</button>
        <button className="signupBtn" onClick={() => navigate('/signupWithEmail')}>Sign up</button>
        <h3 className='orLoginHead'>OR</h3>
        <button className="signupAsRest" onClick={() => navigate('/SignupResturant')}>Sign up as Resturant</button>
        <p className="loginNote">By signing up, you agree to our <span className="pink">Terms and Conditions</span> and <span className="pink">Privacy Policy.</span></p>
      </div>
    </div>
  )
}

export default LoginUser
