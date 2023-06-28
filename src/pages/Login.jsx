import React, {useState, useContext} from 'react'
import './account.css'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import Axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";

export default function Login() {
  const [name, setName] = useState("")
  const { values } = useContext(Context)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState(false)
  const [password, setPassword] = useState("")
  const loggedIn = localStorage.getItem("loggedIn")

  // localStorage.setItem("user", JSON.stringify(name))

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const {data} = await Axios.post('http://localhost:3300/auth/login', {name, password})
      // values.setUser(data.name)
      setSuccess(`Connected as ${name}!`)
      setName(name)
      setError(false)
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("loggedIn", true);
      setTimeout(() => {
        window.location.replace("/")
      }, 2000)
    } catch (error) {
      setError(true)
    }
  }


  return (
    <div className='loginContainer'>
        <div className="loginLeft"></div>
        <div className="loginRight">
            <form onSubmit={loginUser}>
                <h1>LOGIN</h1>
                <p>USERNAME</p>
                <input type="text" className='loginInput' onChange={(e) => setName(e.target.value)}/>
                <p>PASSWORD</p>
                <input type="password" className='loginInput' onChange={(e) => setPassword(e.target.value)}/>
                <button>{loggedIn ? <ClipLoader size={15} color='white'/> : "Login"}</button>
              {success ? <p style={{color: "green", marginTop: "10px"}}>SUCCESS!</p> : <p className='loginSignupTxt'>Don't have an account? <Link to='/register' className='signUp'>Sign up</Link></p>}
              {error && <p style={{color: "red"}}>Incorrect username/password</p>}
            </form>
        </div>
    </div>
  )
}
