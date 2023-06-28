import React from 'react'
import '../pages/spinner.css'
import ClipLoader from 'react-spinners/ClipLoader'

export const Spinner = () => {
  return (
    <div className='spinnerContainer'>
        <ClipLoader size={50} color='grey'/>
        </div>
  )
}
