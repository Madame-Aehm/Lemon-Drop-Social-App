function checkIf (ID, array) {
  let result = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i].toString() === ID) {
      result = true;
    }
  }
  return result;
}

export { checkIf }