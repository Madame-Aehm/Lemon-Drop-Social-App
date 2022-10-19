
function passwordValidation (string) {
    const numbers = /[0-9]/g;
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    if (string.length > 5 && string.match(numbers) && string.match(lowerCase) && string.match(upperCase)) {
      return true
    } else {
      return false
    }
}

function emailValidation (string) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(string)) {
    return true
  }
  return false
}

function displayNicely(string) {
  let final = "";
  let trimmed = string.trim();
  for (let i = 0; i < trimmed.length; i++) {
      if (i === 0 || trimmed.charAt(i - 1) === " ") {
          final += trimmed.charAt(i).toUpperCase();
      } else {
          final += trimmed.charAt(i);
      }
  } return final;
}

function formatImage500px (imageURL) {
  const uploadIndex = imageURL.indexOf("upload/") + 7;
  const result = imageURL.slice(0, uploadIndex) + "w_500,h_500,c_fill/" + imageURL.slice(uploadIndex);
  return result
}

export { passwordValidation, emailValidation, displayNicely, formatImage500px }