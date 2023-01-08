import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const userData = useSelector(state => state.myAuth)
  console.log(userData)
  console.log(useSelector(state => state.myAuthLoggined))
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default Home
