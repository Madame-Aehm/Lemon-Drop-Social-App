import React, { useEffect } from 'react'

function Home() {
  const backgroundStyle = {
    backgroundColor: "black",
    textAlign: "center",
    color: "#E71D36"
  }

  const fetchfunction = async () => {
    const response = await fetch("http://localhost:5000/")
    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    fetchfunction()
  }, [])
  

  return (
    <div style={backgroundStyle}>
      <p>test</p>
    </div>
  )
}

export default Home