import React, { useState, useRef } from 'react'
import './account.css'
import { Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import Axios from 'axios'

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const pass1Ref = useRef(null)
  const pass2Ref = useRef(null)
  const [message, setMessage] = useState(false)
  const [error, setError] = useState(false)
  const [error2, setError2] = useState(false)
  const [reviewsNum, setReviewsNum] = useState(0)

  const registerUser = async (e) => {
    e.preventDefault()
    try {
      if (pass1Ref.current.value == pass2Ref.current.value) {
        await Axios.post('http://localhost:3300/auth/register', {name, email, password: pass1Ref.current.value, reviewsNum})
        setTimeout(() => {
          window.location.replace("/login")
        }, 2000)
        setError(false)
        setError2(false)
        setMessage(true)
      } else (
        setError(true)
      )
    } catch (error) {
      setError(false)
      setError2(true)
    }
  }

  return (
    <div className='registerContainer'>
        <div className="registerLeft"></div>
        <div className="registerRight">
            <form onSubmit={registerUser}>
                <h1>REGISTER</h1>
                <p>USERNAME</p>
                <input type="text" className='registerInput' onChange={(e) => setName(e.target.value)}/>
                <p>EMAIL</p>
                <input type="email" className='registerInput' onChange={(e) => setEmail(e.target.value)}/>
                <p>PASSWORD</p>
                <input type="password" className='registerInput' ref={pass1Ref}/>
                <p>CONFIRM PASSWORD</p>
                <input type="password" className='registerInput' ref={pass2Ref}/>
                <button>{message ? "Redirecting..." : "Register"}</button>
                {message ? <p style={{color: "green", marginTop: "10px"}}>Success!</p> : <p className='registerSignupTxt'>Already have an account? <Link to='/login' className='signUp'>Log in</Link></p>}
                {error && <p style={{color: "red"}}>Passwords must match!</p>}
                {error2 && <p style={{color: "red"}}>User/Email already exists!</p>}
            </form>
        </div>
    </div>
  )
}
