import React from "react";
import './Home.css'
import {useNavigate } from "react-router-dom";
const Home=()=>{
    const Navigate=useNavigate()
    return(
    <div className="homecontent">
        <h1>Kindly Click here to search the movies</h1>
        <button onClick={()=>{Navigate("/movies")}}className="homebtn">Click !</button>
    </div>
    );

}
export default Home;