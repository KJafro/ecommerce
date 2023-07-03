import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Context } from '../context/Context'
import './single.css'
import { Size } from '../components/Size'
import SingleItems from './../components/SingleItems';
import ClipLoader from "react-spinners/ClipLoader";

export default function SingleItemPage({items}) {
    const params = useParams()
    const [stores, setStores] = useState([])
    const [size, setSize] = useState("")
    const [error, setError] = useState(false)
    const { values } = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const [msg, setMsg] = useState("Add to Cart")

    useEffect(() => {
        Axios.get(`https://polished-tree-8036.fly.dev/item/${params.itemsId}`)
        .then(res => setStores(res.data))
        setIsLoading(false)
    }, [params])

    const selectSize = () => {
        if (size == "") {
            setError(true)
        } else {
            setMsg(<ClipLoader size={25} color='white'/>)
            setTimeout(() => {
            setMsg("Add to Cart")
            values.addToCart(stores.title, stores.price, stores.image, size)
            }, 800)
            setError(false)
        }
    }

  return (<>
        {/* <Header/> */}
        <div className='singleSpinner'>
        </div>
        {isLoading ? <div className='singleItemPageSpinner'><ClipLoader color='grey'/></div> : <SingleItems stores={stores} size={size} Size={Size} setSize={setSize} error={error} setError={setError} selectSize={selectSize} msg={msg} setMsg={setMsg}/>}
    </>
  )
}
