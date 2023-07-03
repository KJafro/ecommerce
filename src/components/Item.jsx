import React, { useContext } from 'react'
import { Context } from '../context/Context'
import './components.css'
import { Link, useParams } from 'react-router-dom'
import ReactStars from 'react-stars'

export const Item = ({items}) => {
  const { values } = useContext(Context)
  const params = useParams()

  // const nums = items.map((item) => Number((item)))
  // console.log(nums)
  // const sum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // const average = sum / nums.length;

  const rating = parseFloat(items.rating).toFixed(1)
  return (
          <div key={items.id} className='storeItem'>
          <Link to={`/items/${items._id}`} className='itemImageLink'> <img src={items.image} className='itemImage' alt="" />
          <p className='itemTitle'>{items.title}</p>
          <p>£{items?.price}</p>
          <p style={{fontSize: "0.65em"}}>{items.reviews.length} {items.reviews.length == 1 ? "Review" : "Reviews"}</p>
          </Link>
          </div>
  )
}
