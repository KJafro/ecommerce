import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import ReactStars from 'react-stars'
import { BsHandThumbsUp } from "react-icons/bs";
import moment from 'moment';
import '../pages/reviews.css'
import Axios from 'axios'

export const MappedSort = ({filter, params, time, rating, likes, addLike, searchReview, setFilter}) => {
    const { values } = useContext(Context)

  return (
      <>
        {filter.filter((review) => review.itemId === params.itemsId)
        .sort((a, b) => rating === "helpful" ? b.likes - a.likes :
        rating === "low" ? a.rating - b.rating :
        rating === "high" ? b.rating - a.rating :
        rating === "old" ? new Date(b.createdAt) - new Date(a.createdAt) :
        rating === "new" ? new Date(a.createdAt) - new Date(b.createdAt) :
        "")
        .map((review) => {
            return <div className='mappedReviewContainer'>
                <div className='mappedReviewWrapper'>
                <p>{review.name}</p>
                {!values.modal && <ReactStars value={review.rating} edit={false} size={15} />}
                <p>{review.review.slice(0, 9)}...</p>
                <div className='mappedReviewLikes'>
                <BsHandThumbsUp className='thumbsUp' size={15} onClick={() => addLike(review._id, review.likes)}/><p className='reviewLikes'>{review.likes}</p>
                </div>
                <p>{(moment(review.createdAt).format('DD/MM/YYYY'))}</p>
                <p>{(moment(review.createdAt).format('HH:mm'))}</p>
                </div>
                <div className='mappedReviewDescription'>
                <p>{review.reviewDesc}</p>
                </div>
                <div className='mappedReviewBigThumb'>
                <BsHandThumbsUp className='thumbsUp' onClick={() => addLike(review._id, review.likes)}/><p className='reviewBigLikes'>{review.likes}</p>
                    </div>
            </div>
        })}
    </>
  )
}
