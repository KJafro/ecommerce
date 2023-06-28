import React, {useState, useEffect, useContext} from 'react'
import Axios from 'axios'
import TimeAgo from 'react-timeago'
import './orders.css'
import { Context } from '../context/Context'
import { RecentOrder } from '../components/RecentOrder'

export default function RecentOrders() {
    const [orders, setOrders] = useState([])
    const { values } = useContext(Context)

const date = new Date();
date.setDate(date.getDate() + 3);

const finalDate = date.getDate()+'/'+ (date.getMonth()+1) +'/'+date.getFullYear();

useEffect(() => {
        Axios.get('http://localhost:3300/order')
        .then(res => {
            setOrders(res.data)
        })
    }, [])




  return (
    <RecentOrder orders={orders} finalDate={finalDate} TimeAgo={TimeAgo}/>
  )
}
