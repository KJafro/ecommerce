import { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Context } from '../context/Context'
import './single.css'
import moment from 'moment';
import { BiArrowBack } from "react-icons/bi";
import ClipLoader from 'react-spinners/ClipLoader'

export default function SingleOrderPage() {
  const params = useParams()
  const { values } = useContext(Context)
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const [deliver, setDeliver] = useState(false)
  const names = ['H Burley', 'M Smith', 'T Walsh', 'P Costa', 'S Baker', 'B Wright', 'L Poole',
    'R Smith', 'O Townsend', 'H Franks', 'A Dallas', 'R Deans', 'T Graham', 'G Reed', 'S Lowe',
    'S Jacobs', 'J Trent', 'K Martin', 'S Thomas', 'H Dunn']
  const [signed, setSigned] = useState(names[Math.floor(Math.random() * names.length)])

  useEffect(() => {
    Axios.get(`https://polished-tree-8036.fly.dev/order/${params.ordersId}`)
      .then(res => {
        setOrders(res.data)
        setItems(res.data.items)
      })
  }, [params])

  useEffect(() => {
    moment().format('MM/DD/YYYY') >= moment(orders.createdAt).add(3, 'd').format('MM/DD/YYYY')
  }, [])

  return (
    <>
      {/* <Header/> */}
      <div className='singleOrderMain'>
        <div className="singleOrderzzz">
          <div className='singleOrderContainer'>
            {items.map((item, key) => {
              return (
                <div key={key}>
                  <img src={item.image} className='singleOrderImage' alt="" />
                </div>
              )
            })}
          </div>
          {orders.length == 0 ? <ClipLoader/> : <div className="singleOrderWrapper">
            {orders.discount ? (
              <h3 style={{ textDecoration: "underline" }}>£{items.reduce((a, b) => a + b.price * 90 / 100, 0).toFixed(2)}</h3>
            ) : (
              <h3 style={{ textDecoration: "underline" }}>£{items.reduce((a, b) => a + b.price * 1, 0).toFixed(2)}</h3>
            )}
            {orders.discount && (
              <p style={{ marginTop: "5px", color: "green" }}>
                {orders.fullName} saved: £{items.reduce((a, b) => a + b.price * 10 / 100, 0).toFixed(2)}
              </p>
            )}
            <div className='singleOrderDetails'>
              <p>Ordered on: {moment(orders.createdAt).format('MM/DD/YYYY')}</p>
              <p>Delivering to: {orders.fullName}</p>
              <p>{orders.address1}</p>
              <p>{orders.address2}</p>
              <p>{orders.postcode}</p>
              <p>{orders.country}</p>
              {moment().format('MM/DD/YYYY') >= moment(orders.createdAt).add(3, 'd').format('MM/DD/YYYY') && (
                <p>
                  <span style={{ color: "green" }}>DELIVERED</span>
                </p>
              )}
              {moment().format('MM/DD/YYYY') === moment(orders.createdAt).add(2, 'd').format('MM/DD/YYYY') && (
                                <div>
                                <p style={{ color: "blue" }}>OUT FOR DELIVERY</p>
                              </div>  
              )}
              {moment().format('MM/DD/YYYY') === moment(orders.createdAt).add(1, 'd').format('MM/DD/YYYY') && (
                <div>
                  <p style={{ color: "blue" }}>PACKING</p>
                </div>  
              )}
              {moment().format('MM/DD/YYYY') === moment(orders.createdAt).add(0, 'd').format('MM/DD/YYYY') && (
                <div>
                <p style={{ color: "blue" }}>PACKING</p>
              </div>
              )}
              {moment().format('MM/DD/YYYY') >= moment(orders.createdAt).add(3, 'd').format('MM/DD/YYYY') && (
                <div>
                  <p>Signed for by: {signed}</p>
              </div>
              )}
              <Link to={values.user ? '/profile' : '/orders'}>
                <BiArrowBack
                  style={{
                    margin: "auto",
                    cursor: "pointer",
                    border: "2px solid black",
                    borderRadius: "4px",
                    marginTop: "10px"
                  }}
                  size={35}
                />
              </Link>
            </div>
          </div>}
          
        </div>
      </div>
    </>
  )
}
