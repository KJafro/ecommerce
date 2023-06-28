import React from 'react'

export const Size = ({setSize, setError}) => {
  return (
    <>
        <input type="radio" onClick={() => {setSize('S'); setError(false)}} className='radio-6' id='cat-6' name="ok" value="1"/>
        <label htmlFor="cat-6" className='label-6'>Small</label>
        <input type="radio" className='radio-7' onClick={() => {setSize('M'); setError(false)}} id='cat-7' name="ok" value="2"/>
        <label htmlFor="cat-7" className='label-7'>Medium</label>
        <input type="radio" className='radio-8' onClick={() => {setSize('L'); setError(false)}} id='cat-8' name="ok" value="3"/>
        <label htmlFor="cat-8" className='label-8'>Large</label>
    </>
  )
}
