import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import '../pages/orders.css'
import moment from 'moment';

export const Orders = ({orders}) => {
    const { values } = useContext(Context)
    
  return (
    <div className='mainOrders'>
    {orders.filter((order) => order.fullName == values.user)
        .map((order, index) => (
          <Link to={`/orders/${order._id}`} key={order._id}><div className='orderCards'>
        <p className='estDeliveryDate'>Est Delivery Date: {(moment(order.createdAt).add(3, 'd').format('DD/MM/YYYY'))}</p>
        {order.discount ? <p className='totalOrdersPrice'>Total: £{order.items.reduce((a, b) => a + b.price * 90 / 100, 0).toFixed(2)}</p> : <p className='totalOrdersPrice'>Total: £{order.items.reduce((a, b) => a + b.price * 1, 0).toFixed(2)}</p>}
        <hr style={{marginTop: "10px", marginBottom: "10px", border: "1px solid black", width: "100%"}}/>
        <div className='orderContainer'> 
        {order.items.map((items, key) => 
        <div className='orderWrapper' key={key}>
        <img className='orderImage' src={items.image} alt="" />
        {/* {order.discount ? <p>£{Number(items.price * 90 / 100).toFixed(2)}</p> : <p>£{Number(items.price).toFixed(2)}</p>} */}
        </div>
        )}</div>
        </div></Link>)
        )}
        </div>
        
  )
}
