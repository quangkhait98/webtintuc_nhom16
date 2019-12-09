const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateAccessToken = (id, name, email) => {
  const token = jwt.sign(
    {
      id: id,
      name: name,
      email: email
    },
    process.env.SUPER_SECRET,
    { expiresIn: "2m" }
  );
  return token;
};

module.exports = generateAccessToken;
