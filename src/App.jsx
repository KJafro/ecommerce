import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import SingleItemPage from './pages/SingleItemPage'
import SingleOrderPage from './pages/SingleOrderPage'
import Profile from './pages/Profile'
import RecentOrders from './pages/RecentOrders'
import Rating from './pages/Rating'
import Reviews from './pages/Reviews'
import Review from './pages/Review'
import { Contexter } from './context/Context'

function App() {
  const loggedIn = localStorage.getItem("loggedIn")

  return (
    <Contexter>
    <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={loggedIn ? <Home/> : <Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/profile" element={loggedIn ? <Profile/> : <Login/>} />
    <Route path="/orders" element={<RecentOrders />} />
    <Route path="/reviews" element={<Reviews />} />
    <Route path="/rating/:itemsId" element={<Rating />} />
    <Route path="/review/:itemsId" element={<Review />} />
    <Route path="/items/:itemsId" element={<SingleItemPage />} />
    <Route path="/orders/:ordersId" element={<SingleOrderPage />} />
    </Routes>
    </Router>
    </Contexter>
  )
}

export default App
