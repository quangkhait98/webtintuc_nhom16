const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateAccessToken = (name, email, accessToken) => {
  const token = jwt.sign(
    {
      name: name,
      email: email,
      socialToken: accessToken
    },
    process.env.SUPER_SECRET,
    { expiresIn: 60000 }
  );
  return token;
};

module.exports = generateAccessToken;
