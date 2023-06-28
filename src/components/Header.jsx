import React from 'react'
import './components.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../context/Context'
import { BsCart } from "react-icons/bs";
import LoggedAs from './LoggedAs'
import Logo from '../assets/logo.png'
import { Menu } from './Menu'
import { BiMenu } from "react-icons/bi";


export const Header = () => {
  const { values } = useContext(Context)
  const loggedIn = localStorage.getItem("loggedIn")


  return (
    <>
    <div className='header'>
    <Link to='/'><img src={Logo} className='logoPic' alt="" /></Link>
        <Menu />
        <div className='leftHeader'>
            <Link to='/'><p>Products</p></Link>
            <Link to='/orders'><p>Orders</p></Link>
            <Link to='/reviews'><p>Reviews</p></Link>
            <Link to='/about'><p>About</p></Link>
        </div>
        <div className='rightHeader'>
          {/* <input type="text" value={values.users} /> */}
            {!loggedIn ? <Link to='/login'>Login</Link> : <Link to='/profile'><LoggedAs/></Link>}
            {!loggedIn ? <Link to='/register'>Register</Link> : ""}
            <Link to='/cart'><ul><BsCart size={20}/></ul></Link>
            <div>
            <Link to='/cart'><p>{values.items.length > 0 && values.items.length}</p></Link>
            </div>
        </div>
    </div>
    </>
  )
}
