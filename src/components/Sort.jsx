import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/Context'
import './components.css'
import { HiArrowUp } from "react-icons/hi";
import { HiArrowDown } from "react-icons/hi";

export const Sort = () => {
    const { values } = useContext(Context)

  return (
    <div className='sortDiv'>
      <select name="filter" id="filter" onChange={(e) => values.setSelect(e.target.value)}>
        <option value="des">Highest Price</option>
        <option value="asc">Lowest Price</option>
        <option value="mostReviews">Most Reviews</option>
        <option value="leastReviews">Least Reviews</option>
      </select>
        {/* <input type="radio" id='asc' className='radio-asc' name='sort' onClick={() => values.setSelect('asc')}/>
        <label htmlFor="asc" className='label-asc'><HiArrowUp size={20}/></label>
        <input type="radio" id='des' className='radio-des' name='sort' onClick={() => values.setSelect('des')}/>
        <label htmlFor="des" className='label-des'><HiArrowDown size={20}/></label> */}
    </div>
  )
}
