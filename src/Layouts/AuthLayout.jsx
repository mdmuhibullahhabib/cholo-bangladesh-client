import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
    return (
        <div>
            <header></header>

            <div className="">
                <Outlet></Outlet>
            </div>

            <footer></footer>
        </div>)
}

export default AuthLayout