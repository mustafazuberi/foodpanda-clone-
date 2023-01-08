import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar'

const Home = () => {
  const userData = useSelector(state => state.myAuth)
  console.log(userData)
  console.log(useSelector(state => state.myAuthLoggined))
  return (
    <>
      <Navbar />
      <div>
        <h1>Home Page</h1>
      </div></>
  )
}

export default Home
