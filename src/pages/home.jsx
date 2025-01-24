import React from 'react'
import NavBar from '../components/NavBar'
import RoutesBar from '../components/RoutesBar'
import { Outlet } from 'react-router-dom'


const Home = () => {
  return (
    <>
    <NavBar />
    <RoutesBar/>
    <Outlet />
    </>
  )
}

export default Home