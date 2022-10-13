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

export { uploadImage, deleteImage }