import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import './components.css'
import ClipLoader from 'react-spinners/ClipLoader'
import { Header } from './Header'
import dayjs from 'dayjs'
import moment from 'moment';

export const RecentOrder = ({orders, finalDate, TimeAgo}) => {
    const [pageNumber, setPageNumber] = useState(0)    
    const usersPerPage = 5
    const pagesVisited = pageNumber * usersPerPage

    const displayUsers = orders.slice(pagesVisited, pagesVisited + usersPerPage)
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((order, index) => {
        return (
        <Link to={`/orders/${order._id}`} key={index} ><div className='ordersOrder'>
        <div className='ordersOrderWrapper'>
        <p style={{fontWeight: "bold"}}>{order.fullName}</p>
        <hr style={{width: "50%", margin: "auto"}}/>
        <p>Card Number:</p>
        <p>************{order.cardNumber.slice(-4)}</p>
        <p>Est Delivery:</p>
        <p>{(moment(order.createdAt).add(3, 'd').format('DD/MM/YYYY'))}</p>
        <p>Total:</p>
        {order.discount ? <p>£{order.items.reduce((a, b) => a + b.price * 90 / 100, 0).toFixed(2)}</p> : <p>£{order.items.reduce((a, b) => a + b.price * 1, 0).toFixed(2)}</p>}
        </div>
        <div className="ok">
        {order.items.map((item, index) => {
            return <div key={index} className='orders2Order'>
                <img src={item.image} className='orderImage' alt="" />
            </div>
            
        })}
        </div>
        <div className='timeContainer'>
        <p className='timeP'><TimeAgo date={order.createdAt} /></p>
        </div>
        </div></Link>
        )
    })
    const pageCount = Math.ceil(orders.length / usersPerPage)
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

  return (
    <>
        <Header/>
      <div className='ordersContainer'>
        <h2>TOTAL ORDERS: {orders.length}</h2>
    {orders.length == 0 ? <ClipLoader size={50} color='black'/> : displayUsers}
    <ReactPaginate
    previousLabel={"Previous"}
    nextLabel={"Next"}
    pageCount={pageCount}
    onPageChange={changePage}
    containerClassName={"paginationBttns"}
    previousLinkClassName={"previousBttn"}
    nextLinkClassName={"nextBttn"}
    disabledClassName={"paginationDisabled"}
    activeClassName={"paginationActive"}
    />
</div>
</>
  )
}

