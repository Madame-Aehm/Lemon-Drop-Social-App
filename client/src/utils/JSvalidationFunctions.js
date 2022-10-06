function passwordValidation (string) {
    const numbers = /[0-9]/g;
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    if (string.length > 5 && string.match(numbers).length > 0 && string.match(lowerCase).length > 0 && string.match(upperCase).length > 0) {
      return true
    } else {
      return false
    }
}

function emailValidation (string) {
  if (string.includes("@")) {
    return true
  } else {
    return false
  }
}

export { passwordValidation, emailValidation }