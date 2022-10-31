import { baseURL } from "./getServerURL";
import getToken from "./getToken";

const deleteImage = async (image) => {
  const token = getToken();
  if (token) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    const imageData = JSON.stringify(image);
    const reqOptions = {
      method: "POST",
      headers: myHeaders,
      body: imageData
    };
    try {
      const response = await fetch(baseURL + "/api/users/delete-image", reqOptions);
      const result = await response.json();
      console.log(result);
    } catch(error) {
      alert("error deleting image: ", error);
    }
  }
}

const uploadImage = async (file, url) => {
  const token = getToken();
  if (token) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const formData = new FormData();
    formData.append("image", file);
    const reqOptions = {
      method: "POST",
      headers: myHeaders,
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
}

const recipeImageUpload = async (selectedFile) => {
  if (!selectedFile) {
    return {
      url: "https://res.cloudinary.com/cocktail-recipes/image/upload/v1665673309/recipe_images/yz2fbyzppludsz99ibrq.png",
      public_id: null
    }
  } else {
    try {
      const image = await uploadImage(selectedFile, baseURL + "/api/recipes/upload-image");
      return image
    } catch (error) {
      console.log(error);
    }
    
  }
}

const recipeUpdateImage = async (selectedFile, original) => {
  if (!selectedFile) {
    return original
  } else {
    try {
      const image = await uploadImage(selectedFile, baseURL + "/api/recipes/upload-image")
      return image
    } catch (error) {
      console.log(error);
    }
  }
}

const signUpImageUpload = async (selectedFile) => {
  if (!selectedFile) {
    return {
      url: "https://res.cloudinary.com/cocktail-recipes/image/upload/v1664980716/user_avatars/g7imx82ggre6lljzqb0r.png",
      public_id: null
    }
  } else {
    try {
      const image = await uploadImage(selectedFile, baseURL + "/api/users/upload-image")
      return image
    } catch (error) {
      console.log(error)
    }
  }
}

export { uploadImage, deleteImage, signUpImageUpload, recipeImageUpload, recipeUpdateImage }