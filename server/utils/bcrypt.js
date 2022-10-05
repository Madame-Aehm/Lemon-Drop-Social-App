import bcrypt from "bcrypt";

const encryptPassword = async(password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword
  } catch(error) {
    console.log("Error: ", error);
  }
}

const verifyPassword = async (password, hashedPassord) => {
  const verified = bcrypt.compare(password, hashedPassord);
  return verified;
};


export { encryptPassword, verifyPassword }