import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const issueToken = (id, username, pp) => {
  const payload = {
    id: id,
    username: username,
    profile_picture: pp
  };
  const options = {
    expiresIn: "7d",
  };
  const jwt = jsonwebtoken.sign(payload, process.env.JWT_SECRET, options);
  return jwt;
};

export { issueToken };