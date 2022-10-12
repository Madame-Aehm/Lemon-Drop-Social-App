import React from 'react'

function DrinkCard({drink}) {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "1em",
    width: "90%",
    border: "solid 2px #754423",
    borderRadius: "0.2em",
    backgroundColor: "rgba(251,188,51,0.3)"

  }
  return (
    <div style={cardStyle}>
      <p>Name: {drink.name}</p>
      <p>Method: {drink.method}</p>
    </div>
  )
}

export default DrinkCard