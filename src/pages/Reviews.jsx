import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { Header } from '../components/Header';
import TimeAgo from 'react-timeago';
import { Context } from '../context/Context';
import ReactStars from 'react-stars';
import moment from 'moment';
import { BsTrophy, BsHandThumbsUp } from "react-icons/bs";
import './reviews.css';

export default function Reviews() {
  const [arrays, setArrays] = useState([]);
  const [visibleItems, setVisibleItems] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [topReviewers, setTopReviewers] = useState([])
  const { values } = useContext(Context)
  const [rating, setRating] = useState("highest")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mapName, setMapName] = useState("")
  const [bestReviews, setBestReviews] = useState([])

  useEffect(() => {
    Axios.get('https://polished-tree-8036.fly.dev/review').then((res) => {
      setArrays(res.data);
      setIsLoading(false);
    });
  }, []);
  
  useEffect(() => {
    Axios.get('https://polished-tree-8036.fly.dev/user')
    .then((res) => setTopReviewers(res.data))
  }, [])

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
  
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setBestReviews(arrays.filter((array) => array.name === mapName))
  }, [mapName])

  const reviewsMapped = arrays
  .sort((a, b) => rating === "highest" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt))
    .slice(0, visibleItems)
    .map((array, index) => {
      const ratingValue = parseFloat(array.rating);

      return (
          <Link to={`/rating/${array.itemId}`} className='reviewDiv' key={index}>
            <div className='reviewDivLeft'>
            <p>{array.name}</p>
            <img src={array.image} alt="" />
            <p>{array.itemName}</p>
              {!values.modal && <ReactStars value={ratingValue} edit={false} size={15} />}
              <TimeAgo date={array.createdAt} />
            </div>
            <div className="reviewsDesc">
              <h4>{array.review}</h4>  
              <p>{array.reviewDesc}</p>
              </div>
          </Link>
      );
    });
    
  return (
    <>
      <Header />
          {isModalOpen ? <div className='reviewsModalMainContainer'>
            <h3 style={{marginBottom: "5px"}}>{mapName}</h3>
            <h4 style={{marginBottom: "5px"}}>Top 3 Rated of {bestReviews.length} Reviews</h4>
            <h3 className='reviewsModalCloseButton' onClick={closeModal}>X</h3>
            <div className='reviewsModalContainer'>
            {arrays.filter((array) => array.name === mapName)
            .sort((a, b) => b.likes - a.likes)
            .slice(0,3)
            .map((array, key) => {
              const parsed = parseFloat(array.rating)
              const dates = moment(array.createdAt).format('MM/DD/YYYY')
              return <section key={key}>
                <div className='reviewsModalMain'>
                <Link to={`/review/${array.itemId}`}><div className='reviewsModalLeft'>
                <p className='reviewsModalItemName'>{array.itemName}</p>
                <img className='reviewsModalImage' src={array.image}/>
                {/* <TimeAgo date={array.createdAt}/> */}
                <p>{dates}</p>
                </div></Link>
                <div className='reviewsModalReviews'>
                <p className='reviewsModalItemNameHidden'>{array.itemName}</p>
                <ReactStars value={parsed}/>
                <p>{array.review}</p>
                <p>{array.reviewDesc}</p>
                <p>{array.likes} Likes</p>
                </div>
                </div>
                <hr className='reviewsModalHr'/>
                </section>
            })}
            </div></div> : <div className="reviewsContainer">
        <div className='reviewsTopDiv'>
          <h3>Top Reviewers</h3>
        <div className='topReviewersContainer'>
    {topReviewers.filter((review) => review.reviewsNum > 0)
    .sort((a, b) => b.reviewsNum - a.reviewsNum)
    .slice(0, 3)
    .map((review, key) => {
      return <div className='reviewsTop' key={key}>
        <BsTrophy size={50}/>
        <p style={{position: "relative", bottom: "55px", fontSize: "1.2em"}}>{review.reviewsNum}</p>
        <div style={{cursor: "pointer"}} onClick={() => {setMapName(`${review.name}`); openModal()}}><p style={{marginTop: "-25px"}}>{review.name}</p></div>
      </div>
    })}
    </div>
        {isLoading ? "" : <p style={{marginBottom: "10px"}}>Displaying {reviewsMapped.length} of {arrays.length}</p>}
        <div className='reviewsFilterSelect'>
        {!isLoading && <select name="filters" id="filters" onChange={(e) => setRating(e.target.value)}>
          <option value="highest">Newest Reviews</option>
          <option value="lowest">Oldest Reviews</option>
        </select>}
        </div>
        </div>
        <div className='testing'>
        {isLoading ? (
          <ClipLoader size={50} color="black" />
          ) : (
            <>
            {reviewsMapped}
          </>
        )}
        </div>
        <div className='reviewsButtonDiv'>
        {visibleItems < arrays.length && (
          <button onClick={handleLoadMore} className='reviewsButton'>Load More</button>
          )}
          </div>
        </div>}
      
    </>
  );
}
