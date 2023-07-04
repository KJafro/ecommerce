import React from 'react'
import './reviews.css'
import Axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { Header } from '../components/Header';
import { BsHandThumbsUp } from "react-icons/bs";
import { Context } from '../context/Context'
import { MappedSort } from '../components/MappedSort'
import { Spinner } from '../components/Spinner'

export default function Review() {
    const params = useParams()
    const { values } = useContext(Context)
    const [reviews, setReviews] = useState([])
    const [filter, setFilter] = useState(reviews)
    const [item, setItem] = useState([])
    const [rating, setRating] = useState("helpful")
    const [time, setTime] = useState("old")
    const [ratings, setRatings] = useState([])
    const [searchReview, setSearchReview] = useState("")
    const [likesError, setLikesError] = useState(false)
    const [error, setError] = useState(false)
    const [liked, setLiked] = useState("")
    const [likes, setLikes] = useState("")
    const [modal, setModal] = useState(false)
    const [isIconVisible, setIsIconVisible] = useState(false);

    useEffect(() => {
      setIsIconVisible(true);
    }, []);

useEffect(() => {
    Axios.get('https://polished-tree-8036.fly.dev/review')
    .then(res => {
        setReviews(res.data)
        setFilter(res.data)
    })
}, [])

useEffect(() => {
    Axios.get(`https://polished-tree-8036.fly.dev/item/${params.itemsId}`)
    .then(res => {
        setItem(res.data)
        setRatings(res.data.rating)
    })
}, [])

// const existingRatings = response.data.rating;
// const existingReviews = response.data.reviews;
// const existingReviewsDesc = response.data.reviewDesc;

// Concatenate the existing ratings with the new ratings
// const updatedRatings = existingRatings.concat(rating);
// const updatedReviews = existingReviews.concat(reviews);
// const updatedReviewDesc = existingReviewsDesc.concat(reviewDesc);

const addLike = async (like, currentLikes) => {
    const response = await Axios.get(`https://polished-tree-8036.fly.dev/review/${like}`)
    if(!values.user) {
        setError(true)
        handleScrollToTop()
        setTimeout(() => {
            setError(false)
        }, 3000)
    }
    else if (values.user == response.data.likesName) { 
        setLikesError(true)
        handleScrollToTop()
        setTimeout(() => {
            setLikesError(false)
        }, 3000)
    }
    else if (values.user) {
        try {
            const updatedLikes = currentLikes + 1
            Axios.put(`https://polished-tree-8036.fly.dev/review/${like}`, {likes: updatedLikes, likesName: values.user})
            setModal(true)
            setLiked(like)
            setTimeout(() => {
                setModal(false)
                window.location.reload();
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }
}

const updatedArray = filter.map((review) => ({
    ...review,
    createdAt: new Date(review.createdAt)
}))

    const handleScrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

      const filteredReviews = (searchReview) => {
        setFilter(reviews.filter((review) => review.reviewDesc.toLowerCase().includes (searchReview.toLowerCase())))
    }

    const nums = ratings.map((item) => Number((item)))
    console.log(nums)
    const sum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average = sum / nums.length;
    console.log(average)

  return (
    <>
    {modal ? <div className='modalReviewContainer'>
        <div className='modalReviewWrapper'>
            {reviews.filter((review) => review._id == liked)
            .map((review) => {
                return <div style={{textAlign: "center"}}>
                    {isIconVisible && (<BsHandThumbsUp className='modalThumbsUp' size={60} value={22}/>)}
                    <p style={{color: "black", position: "relative", bottom: "35px"}}>{review.likes + 1}</p>
                    <h3 className='modalReviewTitle'>Thank you for liking {review.name}'s review!</h3>
                    <div className='modalReviewThumbsUpDiv'>
                        {/* <button className='modalReviewButton'>Return</button> */}
                    </div>
                </div>
            })}
        </div>
    </div> : 
        item.length == 0 ? <Spinner/> : <><Header/>
        <div className='individualReviewContainer'>
        <div className='individualReviewDiv'>
        <h3>{item.title}</h3>
        <Link to={`/items/${params.itemsId}`}><img src={item.image} alt="" /></Link>
        <p>£{item.price}</p>
        <p className='individualReviewP'>{item.description}</p>
        {!values.modal && <ReactStars value={average} edit={false}/>} {!values.modal && <p className='individualReactStars'>{filter.length == 0 ? "(0)" : (average.toFixed(1))}</p>}
        <p className='individualReviewLength'>{item.reviews?.length} Reviews</p>
        {error && <p style={{marginTop: "10px", color: "red"}}>You need to be logged in to like a review!</p>}
        {likesError && <p style={{marginTop: "10px", color: "red"}}>You have recently liked this review!</p>}
        </div>
            <div className='individualReviewBottom'>
                <div className='individualFilters'>
                    <input type="text" placeholder='Search...' onChange={(e) => {setSearchReview(e.target.value); filteredReviews(e.target.value)}}/>
        <select name="filters" id="filters" onChange={(e) => setRating(e.target.value)}>
            <option value="helpful">Most Helpful</option>
            <option value="high">Highest Rated</option>
            <option value="low">Lowest Rated</option>
            <option value="old">Newest Reviews</option>
            <option value="new">Oldest Reviews</option>
        </select>
        </div>
        {filter.length == 0 && <div className='individualReviewNoMatchSearch'>No reviews match your search!</div>}

        <MappedSort filter={filter} setFilter={setFilter} params={params} time={time} rating={rating} likes={likes} addLike={addLike} setSearchReview={setSearchReview} searchReview={searchReview}/>
    </div>
    </div>
    </>}
    </>
  )
}
