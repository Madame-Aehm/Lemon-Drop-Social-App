import React, { useEffect } from 'react'
import '../css/launchPage.css';
import { useNavigate } from "react-router-dom";
import lemonImage from "../lemon.png";

function LaunchPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const test = document.getElementById("test");
    const title = document.getElementById("shakeItUp");
    setTimeout(() => {
      test.classList.add("testStage2");
    }, 500);
    setTimeout(() => {
      title.classList.add("testStage2");
    }, 1000);
    setTimeout(() => {
      test.classList.add("testStage3");
      title.classList.add("testStage3");
    }, 3500)
    setTimeout(() => {
      navigate("/home")
    }, 4500)
  }, [])

  return (
    <div className='container'>
      <img id='test' src={lemonImage} alt="Lemon icon" className='testStage1'/>
      <h1 id='shakeItUp' className='testStage1' style={{color: "#ff9500"}}>Cheers Recipes</h1>
    </div>
  )
}

export default LaunchPage