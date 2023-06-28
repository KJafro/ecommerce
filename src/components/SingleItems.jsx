import React, { useEffect } from 'react'
import { Header } from './Header'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import './components.css'
import Axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'

export default function SingleItems({stores, size, Size, setSize, error, setError, selectSize, setMsg, msg}) {
    const { values } = useContext(Context)
    const params = useParams()
    const [items, setItems] = useState([])
    const [actualRating, setActualRating] = useState([])
    const [reviews, setReviews] = useState([])

    const nums = actualRating.map((item) => Number((item)))
    console.log(nums)
    const sum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average = sum / nums.length;

    const addToTheCart = () => {
      setMsg(<ClipLoader size={25} color='white'/>)
      setTimeout(() => {
      setMsg("Add to Cart")
      values.addToCart(stores.title, stores.price, stores.image)
      }, 800)
    }

    useEffect(() => {
      Axios.get(`http://localhost:3300/item/${params.itemsId}`)
      .then(res => {
          console.log(res.data.rating)
          setActualRating(res.data.rating)
          console.log(res.data.reviews)
          setReviews(res.data.reviews)
      })
  }, [params])

    useEffect(() => {
      Axios.get('http://localhost:3300/order')
      .then(res => {
        console.log(res.data)
        setItems(res.data)
      })
    }, [])


  const filteredItems = items.flatMap((item) => item.items.filter((item) => item.title === stores.title));
  const filteredItemCount = filteredItems.length;


  return (
<>
      <Header/>
    <div className='singleDiv'>
    <div className='singleWrapper'>
    <img src={stores.image} className='singleImgPic' alt="" />

    <div className='singleInfo'>
    <h3 className='singleH3'>{stores.title}</h3>
      {filteredItemCount > 0 && <p style={{fontSize: "0.8em"}}>This item has been purchased: {filteredItemCount} times</p>}
    <h4>£{stores.price}</h4>
    <hr style={{width: "80px", marginBottom: "0px"}}/>
    {!values.modal && <Link to={`/rating/${params.itemsId}`}><ReactStars value={average} edit={true} size={20} /><p style={{position: "relative", bottom: "22px", left: "105px"}}>({average.toFixed(1)})</p></Link>}
    <p className='singleDesc'>{stores.description}</p>
    <div className='sizeDiv'>
    {stores.category !== "electronics" && stores.category !== "jewelery" ? <Size setSize={setSize} setError={setError}/> : ""}
    </div>
    {error && <p className='errorP'>Please select a size</p>}
    {stores.category !== "electronics" && stores.category !== "jewelery" ? <button className='singleBtnClick' disabled={values.disable} onClick={selectSize}>  {values.disable ? "Maximum 10 items" : msg}</button> : ""}
    {stores.category == "electronics" || stores.category == "jewelery" ? <button className='singleBtnClick' disabled={values.disable} onClick={addToTheCart}>{values.disable ? "Maximum 8 items" : msg}</button> : ""}
    {values.alert && <p style={{color: "red", marginTop: "5px"}}>Too many items in cart!</p>}
</div></div>
    </div>
    </>
  )
}
