import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function HomeLayout() {
  return (
    <div>
        <header>
          <Navbar></Navbar>
        </header>
        <div className="mt-5">
            <Outlet></Outlet>
        </div>

        <footer>
          <Footer></Footer>
        </footer>
    </div>
  )
}

export default HomeLayout