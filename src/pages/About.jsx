import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Header } from '../components/Header'

export default function About() {
    const [users, setUser] = useState([])

  return (
    <>
    <Header/>
    <div style={{display: "flex", width: "100vw", justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundColor: "#eeeeee"}}>
    <img src="https://res.cloudinary.com/dyvsjxtxa/image/upload/v1686656478/api/employee1_rjsx6n.png" style={{marginTop: "5px", marginBottom: "10px", objectFit: "cover"}} alt="" />
    <p style={{maxWidth: "600px", fontSize: "0.8em", marginBottom: "5px"}}>Alex Smith is a charismatic, results-oriented sales professional with a talent for building relationships and exceeding targets. With strong communication skills and a passion for sales, Alex consistently drives revenue growth and identifies new business opportunities. A proactive team player, he is a valuable asset to any organization seeking sales excellence.</p>
    <img src="https://res.cloudinary.com/dyvsjxtxa/image/upload/v1686657112/api/employee3_vmeihj.png" style={{marginTop: "5px", marginBottom: "10px", objectFit: "cover"}} alt="" />
    <p style={{maxWidth: "600px", fontSize: "0.8em", marginBottom: "6px"}}>Martin Phillips is a dynamic and driven sales professional who consistently exceeds targets. With exceptional communication skills and a customer-centric approach, Martin builds strong relationships and ensures client satisfaction. His proactive mindset and passion for sales make him a valuable asset, driving revenue growth and seizing new business opportunities.</p>
    <img src="https://res.cloudinary.com/dyvsjxtxa/image/upload/v1686657681/api/employeees_jhkvo2.png" style={{marginTop: "5px", marginBottom: "10px", objectFit: "cover"}} alt="" />
    <p style={{maxWidth: "600px", fontSize: "0.8em", marginBottom: "7px"}}>Charlotte Jones is a results-oriented sales professional with a customer-focused approach. With excellent communication skills and a knack for building rapport, Charlotte consistently surpasses sales targets. Her proactive attitude and passion for sales enable her to identify opportunities, drive revenue growth, and deliver exceptional customer experiences.</p>
    </div>
    </>
  )
}