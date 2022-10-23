import React, { useEffect } from 'react'
import '../css/launch&nav.css';
import { useNavigate } from "react-router-dom";

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
        <img id='lemon' src="https://res.cloudinary.com/cocktail-recipes/image/upload/v1666457159/assets/lemon_wnjxh9.png" 
          alt='Lemon Drop'
          title='Lemon Drop' 
          className='stage1'/>
        <h1 id='title' className='stage1 header-title'>lemon drop recipes</h1>
      </div>
    </div>
    
  )
}

export default LaunchPage