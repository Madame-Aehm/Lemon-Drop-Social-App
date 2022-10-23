import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function PageLoader() {
  const setPage = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,225,225,0.6)",
    zIndex: 2
  }
  
  const container = {
    position: "fixed",
    left: "50%",
    top: "50%"
  }
  return (
    <div style={setPage}>
      <div style={container} className='fine'>
        <Spinner animation="border" role="status" variant="warning">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>

  )
}

export default PageLoader