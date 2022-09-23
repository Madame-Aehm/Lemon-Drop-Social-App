import React, { useEffect, useState } from 'react'

function Home() {

  const container = {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
  const card = {
    border: "solid 2px black",
    backgroundColor: "grey",
    textAlign: "center",
    color: "black"
  }
  const instructionsDiv = {
    textAlign: "left",
    padding: "0 10px"
  }

  const [allCocktails, setAllCocktails] = useState([]); 
  const [methodsList, setMethodsList] = useState([]);
  const [testState, setTestState] = useState(1);
  const [userInput, setUserInput] = useState("Step " + testState);

  const fetchTest = async () => {
    const response = await fetch("http://localhost:5000/cocktails/all")
    const data = await response.json()
    console.log(data)
    setAllCocktails(data);
    // setMethodsList(generateMethodOptions(data.allCocktails));
  }

  function generateMethodOptions(list) {
    const methods = list.map((cocktail) => {
      return cocktail.Method;
    })
    const unique = [...new Set(methods)]
    return unique
  }

  useEffect(() => {
    fetchTest();
  }, [])

  const handleChange = (e) => {
    setUserInput(e.target.value);
  }

  const handleOnClick = () => {
    const newNumber = testState + 1;
    setTestState(newNumber);
  }

  return (
    <div style={container}>
      <button onClick={handleOnClick}>set test state</button>
      {console.log(testState)}
      <form onSubmit={(e) => {
          e.preventDefault();
          console.log(userInput);
        }}>
        <input/>
        <textarea value={userInput} onChange={handleChange}/>
        <input type={"submit"} value={"Submit"} />
      </form>
      {allCocktails.map((cocktail) => {
        return (
          <div key={cocktail._id} style={card}>
            <h1>{cocktail.name}</h1>
            <h3>{cocktail.method}</h3>
            <ul style={instructionsDiv}>
              {cocktail.ingredients.map((ingredient) => {
                return <li key={ingredient._id}>{ingredient.quantity}{ingredient.measure} {ingredient.ingredient}</li>
              })}
            </ul>
            <div style={instructionsDiv}>
              <hr/>
              {cocktail.instructions.map((instruction, i) => {
                return <p key={i}>{instruction}</p>
              })}
              <hr/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home