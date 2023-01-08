import React from 'react'
import './style.css'
import Swal from 'sweetalert2';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  swal,
  auth,
  addUserToDB,
  FacebookAuthProvider
} from "../../config/firebase";



import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from 'redux'
import actionCreators from "./../../state/index"
// import { useLocation } from 'react-router-dom'




const LoginUser = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { authData, isAuthenticatedData } = bindActionCreators(actionCreators, dispatch)


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
      navigate('/home')
    } catch (e) {
      console.log(e.message);
    }
  };



  return (
    <div>
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
