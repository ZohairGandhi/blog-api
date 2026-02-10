import "dotenv/config";
import jwt from "jsonwebtoken";

function generateJwt(user) {
  const payload = {
    sub: user.id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env["JWT_SECRET"], {
    expiresIn: "2d",
  });
  return token;
}

export { generateJwt };
