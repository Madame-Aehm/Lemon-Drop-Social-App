import getToken from "./getToken";

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

const verifyAndUpdatePassword = async(oldPassword, newPassword) => {
  const token = getToken();
  if (token) {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");
      const reqBody = JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword
      });
      const reqOptions = {
        method: "POST",
        headers: myHeaders,
        body: reqBody
      }
      const response = await fetch("http://localhost:5000/users/verify-password", reqOptions);
      const result = await response.json();
      return result
    } catch(error) {
      console.log(error);
    }
  }
}

export { passwordValidation, emailValidation, verifyAndUpdatePassword }