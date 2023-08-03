import React from 'react'
import './home.css'
import { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { Header } from '../components/Header'
import { Item } from '../components/Item'
import { Image } from '../components/Image'
import { Filters } from '../components/Filters'
import { Context } from '../context/Context'
import { Sort } from '../components/Sort'
import { useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { GrPowerReset } from "react-icons/gr";

export default function Home() {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')
    const {values} = useContext(Context)
    const [store, setStore] = useState([])
    const [filtered, setFiltered] = useState(store)
    const [searchin, setSearchin] = useState("")
    const [showBtn, setShowBtn] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const ref = () => {
            Axios.get('https://polished-tree-8036.fly.dev/item')
        .then(res => {
            setStore(res.data)
            setFiltered(res.data)
            setLoading(false)
        })}
        ref()
    }, [])

    const filterCat = (cat) => {
        setFiltered(store.filter((items) => items.category == cat))
        values.setText(cat)
        setSearchin("")
    }

    const sortItems = (cat) => {
        setFiltered(filtered.sort((items) => items == cat))
    }

    const searchFilter = (searchin) => {
        setFiltered(store.filter((items) => searchin == "" ? items : items.title.toLowerCase().includes (searchin.toLowerCase())))
    }

  return (
  <>
    <Header />
  <div className='container'>
    <Image />
    <div className='filtersDiv'>
    <span className='itemsH3'>{values.text} ({filtered.length})</span>
    {showBtn && <div className='btnDiv'>
        <input type="radio" className='radio-5' id='cat-5' name="ok" value="5"/>
        <label htmlFor="cat-5" className='label-5' onClick={() => {setFiltered(store); values.setText('All Items'); setSearchin(""); setShowBtn(false)}}>
        <button className='filtersResetBtn'>Reset Filter</button></label>
        </div>}
    {!showBtn && (<input type="text" onChange={(e) => {setSearchin(e.target.value); searchFilter(e.target.value)}} placeholder='Search...'/>)}
    </div>
    <Filters store={store} filtered={filtered} setFiltered={setFiltered} filterCat={filterCat} setSearchin={setSearchin} showBtn={showBtn} setShowBtn={setShowBtn}/>
    {!values.modal && (<div className='filtering'>{filtered.length >= 1 && <Sort sortItems={sortItems}/>}</div>)}
    <div className='storeContainer'>
        <div className="loaders">
    {store.length == 0 && <ClipLoader size={50} color='grey'/>}
    <div className='matchingItems'>{filtered.length == 0 && <p style={{marginTop: "100px"}}>No items match your search!</p>}</div>
        </div>
        {filtered.sort((a, b) => values.select == "des" ? b.price - a.price
        : values.select == "asc" ? a.price - b.price 
        : values.select == "mostReviews" ? b.reviews.length - a.reviews.length
        : values.select == "leastReviews" ? a.reviews.length - b.reviews.length
        : "lol"
        )
        .map((items, index) => {
            return (
                <Item key={index} items={items}/>
            )
        })}
    </div>
    </div>
    </>
  )
}
