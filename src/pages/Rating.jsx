import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../context/Context'
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import ReactStars from 'react-stars'
import './rating.css'
import { Spinner } from '../components/Spinner'

export default function Rating() {
    const params = useParams()
    const [rating, setRating] = useState(null)
    const [reviews, setReviews] = useState("")
    const [details, setDetails] = useState([])
    const [actualRating, setActualRating] = useState([])
    const [showReviews, setShowReviews] = useState([])
    const [reviewsNum, setReviewsNum] = useState(1)
    const [reviewDesc, setReviewDesc] = useState("")
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [error, setError] = useState(false)
    const [errorLength, setErrorLength] = useState(false)
    const [success, setSuccess] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewsId, setReviewsId] = useState(null)

    const [name, setName] = useState("")
    const [newRating, setNewRating] = useState("")
    const [review, setReview] = useState("")

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const { values } = useContext(Context)
    const nums = actualRating.map((item) => Number((item)))
    const numz = showReviews.map((item) => Number((item)))

    const slicedRating = actualRating.slice().reverse().slice(0, 5)
    const slicedRatings = actualRating.slice().reverse().slice(10, 20)
    const slicedReview = showReviews.slice().reverse().slice(0, 5)
    const sum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average = sum / nums.length;

    useEffect(() => {
        Axios.get(`http://localhost:3300/item/${params.itemsId}`)
        .then(res => {
          setDetails(res.data)
          console.log(res.data)
          setShowReviews(res.data.reviews)
          setActualRating(res.data.rating)
          console.log(res.data.rating)
        })
    }, [params])

    useEffect(() => {
      Axios.get(`http://localhost:3300/user/${values.id}`)
      .then(res => setReviewsId(res.data.reviewsNum))
    })

    // useEffect(() => {
    //   Axios.get(`http://localhost:3300/review/${params._id}`)
    //   .then (res => console.log(res.data))
    // })
    
    const dta = async (e) => {
      e.preventDefault();
      
      try {
        // Retrieve the existing ratings from the server
        const response = await Axios.get(`http://localhost:3300/item/${params.itemsId}`);
        const existingRatings = response.data.rating;
        const existingReviews = response.data.reviews;
        const existingReviewsDesc = response.data.reviewDesc;
        
        // Concatenate the existing ratings with the new ratings
        const updatedRatings = existingRatings.concat(rating);
        const updatedReviews = existingReviews.concat(reviews);
        const updatedReviewDesc = existingReviewsDesc.concat(reviewDesc);
        
        if (rating === null || reviews.length === 0) {
          setError(true)
        } else if (reviewDesc.length < 100 || reviewDesc.length > 300 || reviews.length < 3 || reviews.length > 30) {
          setErrorLength(true)
            setError(false)
           } else {
             setSuccess(true)
             setError(false)
             setErrorLength(false)
             await Axios.put(`http://localhost:3300/item/${params.itemsId}`, { rating: updatedRatings, reviews: updatedReviews, reviewDesc: updatedReviewDesc});
             Axios.put(`http://localhost:3300/user/${values.id}`, {reviewsNum: reviewsId + 1})
             Axios.post('http://localhost:3300/review', {name: values.user, itemName: details.title, rating, review: reviews, image: details.image, itemId: params.itemsId, reviewDesc, likes, dislikes})
             setTimeout(() => {
               window.location.replace(`/rating/${params.itemsId}`)
              }, 2000)
            }
          } catch (error) {
            console.error('Error adding ratings to the array:', error);
          }
        };
        
        console.log(details.title)
        
        const handleRatingChange = (event) => {
        setRating(event.target.value);
      };

      const handleReviewChange = (event) => {
        const words = event.target.value.split(' ');
        const maxLength = 15
        const filteredWords = words.filter((word) => word.length <= maxLength);
        setReviews(filteredWords.join(' '));
      }

      const handleReviewDescChange = (event) => {
        const words = event.target.value.split(' ');
        const maxLength = 15
        const filteredWords = words.filter((word) => word.length <= maxLength);
        setReviewDesc(filteredWords.join(' '));
      }


      const toggleVisibility = () => {
        setIsVisible(!isVisible);
      };

      console.log(params.itemsId)

  return (
    <>
    {details.length == 0 ? <Spinner/> : <div className='ratingsContainer'>
    <Header/>
      <div className="ratingsTop">

      <h3 style={{marginBottom: "10px"}}>{details.title}</h3>
      <img src={details.image} className='ratingsImage' alt="" />
      {/* <p>£{details.price}</p> */}
      {values.modal && <ReactStars value={average} edit={false} size={20} />}
        {actualRating == 0 ? "" : <div><p className='reviewsNumberRating'>Reviews: {actualRating.length}</p>
        <p>Average Rating: {average.toFixed(1)}</p></div>}
      {values.user ? <button onClick={openModal} className='buttonReview'>Write a Review</button> : <p style={{color: "red", marginTop: "20px"}}>You need to be logged in to write a review!</p>}
      {actualRating == 0 ? "" : <p style={{marginTop: "15px"}}>Displaying latest 5 reviews:</p>}
      {isModalOpen && (
        <div className="modal">
          <div className="reviewModal-content" style={{transition: "1s ease"}}>
            <span className="close" onClick={closeModal}>
              <p className='modalClose'>X</p>
            </span>
            <h2 style={{marginTop: "-20px"}}>{details.title}</h2>
            <h4 style={{marginBottom: "10px"}}>Average: {actualRating == 0 ? "N/A" : average.toFixed(1)} ⭐</h4>
            <form onSubmit={dta} className='ratingForm'>
        <select name="rating" id="rating" onChange={handleRatingChange} >
        <option value="" selected disabled hidden>Rating</option>
          <option value="5">5 ⭐⭐⭐⭐⭐</option>
          <option value="4">4 ⭐⭐⭐⭐</option>
          <option value="3">3 ⭐⭐⭐</option>
          <option value="2">2 ⭐⭐</option>
          <option value="1">1 ⭐</option>
        </select>
        <input type="text" onChange={handleReviewChange} placeholder='Title'/>
        <textarea name="" id="" cols="30" rows="4" onChange={handleReviewDescChange} placeholder='Description'></textarea>
        <button className='buttonSubmit'>Submit</button>
        <div className='validationDiv'>
        {reviewDesc.length > 1 ? reviewDesc && reviewDesc.length == 0 || reviewDesc.length < 100 || reviewDesc.length > 300 ? <p style={{color: "red"}}>{reviewDesc.length}/300</p> : <p style={{color: "green"}}>{reviewDesc.length}/300</p> : ""}
        {error && <p style={{color: "red"}}>You need to add a Review and Rating!</p>}
        {errorLength && <div><p style={{color: "red"}}>Title needs to be between 3 and 30 characters</p><p style={{color: "red"}}>Description needs to be between 100 & 300 characters</p><p style={{color: "red"}}>Each word that is 15 characters or longer will be deleted</p></div>}
        {success && <p style={{color: "green"}}>Successfully added Review!</p>}
        </div>
        </form>
          </div>
        </div>
      )}
      </div>
        <div className='ratingsResults'>
          <div>
            {!isModalOpen && 
    slicedRating.map((rate, index) => {
      const ratingValue = Number(rate);

      return <section className='ratingStars' key={index}>
        <div className='starsRateDiv'>
        {/* {`/orders/${order._id}`} */}
        {!values.modal && <div><p className='rateText'>{rate}</p>
        <ReactStars value={ratingValue} edit={false} size={15}/></div>}
        <hr />
        </div>
      </section>
    })}
    </div>
    <div className='reviewTextDiv'>
    {!isModalOpen && 
    slicedReview.map((review, index) => <p key={index} className='reviewText'>{review}</p>)}
    </div>
        </div>
      <div className='reviewsDiv' >
      {actualRating == 0 ? "This item currently has no reviews!" : <Link to={`/review/${params.itemsId}`}><button>Display all Reviews</button></Link>}
      </div>
    </div>}
    
    </>
  )
}
