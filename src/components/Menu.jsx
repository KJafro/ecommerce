import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import './components.css'
import { BsCart } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { Context } from '../context/Context';

export const Menu = () => {
    // const [modal, setModal] = useState(false);
    const loggedIn = localStorage.getItem("loggedIn")
    const { values } = useContext(Context)

    const toggleModal = () => {
        values.setModal(!values.modal)
    }

    if (values.modal) { 
        document.body.classList.add('active')
    } else {

    }document.body.classList.remove('active')

    return (
        <>
          <div onClick={toggleModal} className="btn-modal">
          <BiMenu size={30}/></div>
          
    
          {values.modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h1 style={{textAlign: "center"}}>MENU</h1>
                <hr className='hrModal'/>
                <Link to='/'><h2>PRODUCTS</h2></Link>
                <Link to='/orders'><h2>ORDERS</h2></Link>
                <Link to='/reviews'><h2>REVIEWS</h2></Link>
                <Link to='/about'><h2>ABOUT</h2></Link>
                <hr className='hrModal'/>
                {loggedIn ? <Link to='/profile'><h2>ACCOUNT</h2></Link> : <Link to='/register'><div><h2>REGISTER</h2><h2>LOGIN</h2></div></Link>}
                <Link to='/cart'><ul className='hamburgerMenuCart'><BsCart size={40}/></ul></Link>
                <Link to='/cart'><p className='hamburgerMenuItems'>{values.items.length > 0 && values.items.length}</p></Link>
                <button className="close-modal" onClick={toggleModal}>
                  X
                </button>
              </div>
            </div>
          )}
        </>
      );
    }