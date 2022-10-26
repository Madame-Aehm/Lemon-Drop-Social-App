import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import * as Icon from 'react-bootstrap-icons';

function ReturnToTop() {

  function scrollFunction() {
    const button = document.getElementById("scroll-button");
    if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }

  window.onscroll = () => scrollFunction();

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <Button variant='warning' id='scroll-button' title='Return to the top' onClick={topFunction}>
      <Icon.ArrowUp style={{ fontSize: "x-large", color: "white" }} />
    </Button>
  )
}

export default ReturnToTop