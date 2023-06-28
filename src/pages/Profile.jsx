import { useState, useContext, useEffect } from 'react'
import Axios from 'axios'
import { Context } from '../context/Context'
import { Header } from '../components/Header'
import '../components/components.css'
import ClipLoader from 'react-spinners/ClipLoader'
import { Orders } from '../components/Orders'

export default function Profile() {
    const { values } = useContext(Context)
    const [fullName, setFullName] = useState("")
    const [profilePic, setProfilePic] = useState("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const theData = [fullName, profilePic]
    const loggedIn = localStorage.getItem("loggedIn")
    const [orders, setOrders] = useState([])

    const logOut = () => {
        localStorage.removeItem("loggedIn")
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        window.location.replace("/");
      }

      useEffect(() => {
        Axios.get('http://localhost:3300/order')
        .then(res => setOrders(res.data))
      }, [])

  return (
      <>
      <Header />
      <div className="profileFormWrapper">
      {orders.length == 0 ? <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}><ClipLoader size={60} color='grey'/></div> : <form className='profileForm'>
        <h2 style={{marginBottom: "5px"}}>Hi {values.user || "Guest"}</h2>
        {values.user && <hr />}
        {values.user && <h3 style={{marginTop: "5px"}}>Your Recent Orders</h3>}
        <Orders orders={orders}/>
            {loggedIn ? <button className='logoutBtn' style={{width: "250px", marginBottom: "50px"}} onClick={logOut}>Logout</button> : ""}
        </form>}

        </div>
    </>
  )
}
