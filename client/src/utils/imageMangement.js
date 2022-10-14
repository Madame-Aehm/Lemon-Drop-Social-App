const deleteImage = async (image) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const imageData = JSON.stringify(image);
  const reqOptions = {
    method: "POST",
    headers: myHeaders,
    body: imageData
  };
  try {
    const response = await fetch("http://localhost:5000/users/delete-image", reqOptions);
    const result = await response.json();
    console.log(result);
  } catch(error) {
    alert("error deleting image: ", error);
  }
}

const uploadImage = async (file, url) => {
  const formData = new FormData();
  formData.append("image", file);
  const reqOptions = {
    method: "POST",
    body: formData
  };
  try {
    const response = await fetch(url, reqOptions);
    const result = await response.json();
    return result
  } catch (error) {
    alert("image upload error: ", error)
  }
}

const recipeImageUpload = async (selectedFile) => {
  if (!selectedFile) {
    return {
      url: "https://res.cloudinary.com/cocktail-recipes/image/upload/v1665673309/recipe_images/yz2fbyzppludsz99ibrq.png",
      public_id: null
    }
  } else {
    const image = await uploadImage(selectedFile, "http://localhost:5000/recipes/upload-image")
    return image
  }
}

const signUpImageUpload = async (selectedFile) => {
  if (!selectedFile) {
    return {
      url: "http://res.cloudinary.com/cocktail-recipes/image/upload/v1664980716/user_avatars/g7imx82ggre6lljzqb0r.png",
      public_id: null
    }
  } else {
    const image = await uploadImage(selectedFile, "http://localhost:5000/users/upload-image")
    return image
  }
}

export { uploadImage, deleteImage, signUpImageUpload, recipeImageUpload }