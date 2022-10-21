import getToken from "./getToken";

const addFavourite = async(recipe) => {
  const token = getToken();
  if (token) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const reqOptions = {
      method: "POST",
      headers: myHeaders,
    }
    try {
      const response = await fetch("http://localhost:5000/recipes/add-favourite/" + recipe._id, reqOptions);
      const result= await response.json();
      console.log(result);
    } catch(error) {
      alert("Problem adding favourite: " + error)
    }
  }
}

const removeFavourite = async(recipe) => {
  const token = getToken();
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const reqOptions = {
    method: "PATCH",
    headers: myHeaders
  }
  try {
    const response = await fetch("http://localhost:5000/recipes/delete-favourite/" + recipe._id, reqOptions);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    alert("Problem deleting favourite: " + error);
  }
}

export { addFavourite, removeFavourite }