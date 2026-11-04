import jwt from "jsonwebtoken";

export const generateToken = async ({userId}) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};


