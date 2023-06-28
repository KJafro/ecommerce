import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { Context } from '../context/Context'
import './components.css'
import Lady from '../../src/assets/lady.png'
import Man from '../../src/assets/man.png'

export const Filters = ({filterCat, setFiltered, store, setSearchin, showBtn, setShowBtn}) => {
    const {values} = useContext(Context)
    const [check, setCheck] = useState(null)

    useEffect(() => {
      {!showBtn ? setCheck(true) : ""}
    }, [showBtn])

  return (<>
    {!values.modal && (<div className='btnDiv'>
        <input type="radio" className='radio-1' id='cat-1' name="ok" value="1" checked={check}/>
        <label htmlFor="cat-1" className='label-1' onClick={() => {filterCat('electronics'); setShowBtn(true)}}>
        <img className='catePic' src="https://res.cloudinary.com/dyvsjxtxa/image/upload/v1686650420/api/pc_kqh8tn.png" alt="" />
        Electronics
        </label>
        <input type="radio" className='radio-2' id='cat-2' name="ok" value="2" checked={check}/>
        <label htmlFor="cat-2" className='label-2' onClick={() => {filterCat('jewelery'); setShowBtn(true)}}>
        <img className='catePic' src="https://res.cloudinary.com/dyvsjxtxa/image/upload/v1686650666/api/rings_r0aod9.png" alt="" />
        Jewellery
        </label>
        <input type="radio" className='radio-3' id='cat-3' name="ok" value="3" checked={check}/>
        <label htmlFor="cat-3" className='label-3' onClick={() => {filterCat("men's clothing"); setShowBtn(true)}}>
        <img src={Man} className='catePic' alt="" />
        Men's Clothing
        </label>
        <input type="radio" className='radio-4' id='cat-4' name="ok" value="4" checked={check}/>
        <label htmlFor="cat-4" className='label-4' onClick={() => {filterCat("women's clothing"); setShowBtn(true)}}>
        <img src={Lady} className='catePic' alt="" />    
        Women's Clothing</label>
        <input type="radio" className='radio-16' id='cat-16' name="ok" value="16" checked={check}/>
        </div>)}
        </>
  )
}
