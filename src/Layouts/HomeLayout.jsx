import React from 'react'
import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
    <div>
        <header></header>

        <div className="">
            <Outlet></Outlet>
        </div>

        <footer></footer>
    </div>
  )
}

export default HomeLayout