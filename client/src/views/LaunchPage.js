import React, { useEffect } from 'react'
import '../css/launchPage.css';
import { useNavigate } from "react-router-dom";
import lemonImage from "../lemon.png";

function LaunchPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const test = document.getElementById("lemon");
    const title = document.getElementById("title");
    setTimeout(() => {
      test.classList.add("stage2");
    }, 500);
    setTimeout(() => {
      title.classList.add("stage2");
    }, 1000);
    setTimeout(() => {
      test.classList.add("stage3");
      title.classList.add("stage3");
    }, 3500)
    setTimeout(() => {
      navigate("/home")
    }, 4500)
  }, [])

  return (
    <div className='set-page'>
      <div className='container'>
        <img id='lemon' src={lemonImage} alt="Lemon icon" className='stage1'/>
        <h1 id='title' className='stage1' style={{color: "#ff9500"}}>Cheers Recipes</h1>
      </div>
    </div>
    
  )
}

export default LaunchPage