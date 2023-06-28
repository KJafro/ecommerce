import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../context/Context'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import '../components/components.css'
import ClipLoader from 'react-spinners/ClipLoader'

export default function Cart() {
    const guest = Math.floor(Math.random () * 1000)
    const {values} = useContext(Context)
    const [fullName, setFullName] = useState(values.user || "Guest #" + guest)
    const [country, setCountry] = useState("UK")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [postcode, setPostCode] = useState("")
    const [zipPost, setZipPost] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [discountCode, setDiscountCode] = useState("")
    const [discount, setDiscount] = useState(false)
    const [message, setMessage] = useState("")
    const [pay, setPay] = useState(false)
    const [error, setError] = useState(false)

    const noneDiscountTotal = values.items.reduce((a, b) => a + b.price * 1, 0)
    const discountTotal = values.items.reduce((a, b) => a + b.price * 90 / 100, 0)

    const buyItems = (e) => {
        e.preventDefault()
            if (address1.length > 0 && address2.length > 0 && postcode.length > 0 && cardNumber.length >= 4) {
        Axios.post('http://localhost:3300/order', {fullName, country, address1,
        address2, postcode, cardNumber, items: values.items, discount})
        setFullName(values.user)
        setPay(true)
        setTimeout(() => {
            setError(false)
            setDiscountCode("")
            setPay(false)
            setMessage(true)
            localStorage.removeItem("cart")
        }, 2000)
        setTimeout(() => {
            {values.user ? window.location.replace("/profile") : window.location.replace("/orders")}
        }, 4000)}
        else {
            setError(true)
        }
    } 

    useEffect(() => {
        discountCode == "SAVE" ? setDiscount(true) : setDiscount(false) 
    })

    values.items.length < 8 && values.setDisable(false)

    useEffect(() => {
        country == 'UK' ? setZipPost('Postcode') : setZipPost('ZIP Code')
    }, [country])

  return (
    <div className='cartContainer'>
        <div className="cartWrapper">

            <form onSubmit={buyItems} className='formContainer'>
        {values.user ? "" : <h4>You are currently logged in as a guest!
            Sign up <Link to='/register' className='registerL'>here</Link> to receive exclusive offers!</h4>}
            <label>Name</label>
            <input type="text" readOnly={fullName} placeholder={values.user || "Guest"}/>
            <label>Country</label>
            <select name="country" id="country" defaultChecked={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="UK">UK</option>
                <option value="USA">USA</option>
            </select>
            <label>Address 1</label>
            <input type="text" onChange={(e) => setAddress1(e.target.value)}/>
            <label>Address 2</label>
            <input type="text" onChange={(e) => setAddress2(e.target.value)}/>
            <label>{zipPost}</label>
            <input type="text" onChange={(e) => setPostCode(e.target.value)}/>
            <label>Card Number</label>
            <input type="number" onChange={(e) => setCardNumber(e.target.value)} placeholder='Atleast 4 numbers'/>
            <label>Discount Code</label>
            <input type="text" onChange={(e) => setDiscountCode(e.target.value)}/>
            {pay ? <button><ClipLoader size={15} color='white'/></button> : <button disabled={values.items.length == 0} onClick={(e) => console.log(e.target.value)}>Checkout</button>}
        <p style={{color: "green", marginTop: "10px"}}>{message && "Payment Successful!"}</p>
        {discount && <p style={{color: "green"}}>10% Discount applied!</p>}
        {error && <p style={{color: "red"}}>Please complete the form!</p>}
            </form>

            </div>
            <div className='checkoutContainer'>
                <h3>Order Summary</h3>
                <p>{values.items.length == 0 ? "You have no items in the cart!" : values.items.length + " items"}</p>
                <hr />
                <div className="checkoutWrapper">
                {values.items.length == 0 ? "" : <h4>Click an item to remove</h4>}
            {/* {JSON.stringify(values.itemsCart)} */}
        {values.items.map((items, index) => {
            return <div key={index} className='checkoutItem'>
                <img src={items.image} className='checkoutImage' onClick={() => values.deleteItems(items)} alt="" />
                <p>{items.size}</p>
            </div>      
        })}</div>
        {values.items.length > 0 ? <hr /> : ""}
        <div style={{marginBottom: "20px"}}>{discount ? <><p style={{color: "red", textDecoration: "line-through"}}>£{noneDiscountTotal.toFixed(2)} </p> <p>£{discountTotal.toFixed(2)}</p> </>: <p>£{noneDiscountTotal.toFixed(2)}</p>}</div>
    </div>
    </div>
  )
}
