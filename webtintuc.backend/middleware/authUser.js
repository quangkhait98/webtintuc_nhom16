const jwt = require("jsonwebtoken");

function authUser(req, res, next) {
  let token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.SUPER_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "failed to authenticate token"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "no token provided"
    });
  }
}

module.exports = authUser;
