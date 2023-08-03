import React from 'react'
import './components.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../context/Context'
import { BsCart } from "react-icons/bs";
import LoggedAs from './LoggedAs'
import Logo from '../assets/logo.png'

export const HeaderProfile = () => {
  const { values } = useContext(Context)
  const loggedIn = localStorage.getItem("loggedIn")

  return (
    <>
    <div className='header'>
    <Link to='/'><img src={Logo} className='logoPic' alt="" /></Link>
        <li className='leftHeader'>
            <Link to='/'><ul>Products</ul></Link>
            <Link to='/orders'><ul>Recent Orders</ul></Link>
        </li>
        <li className='rightHeader'>
        {!loggedIn ? <Link to='/login'><ul>Login</ul></Link> : <LoggedAs/>}
            {!loggedIn ? <Link to='/register'><ul>Register</ul></Link> : ""}
            <Link to='/cart'><ul><BsCart size={20}/></ul></Link>
            <div>
            <Link to='/cart'><p>{values.items.length > 0 && values.items.length}</p></Link>
            </div>
        </li>
    </div>
    <hr />
    </>
  )
}
